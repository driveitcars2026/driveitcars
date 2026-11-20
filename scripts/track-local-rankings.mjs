import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';
import { neon } from '@neondatabase/serverless';
import { sendTelegramMessage } from './notify-telegram.mjs';

/**
 * DriveItCars - Daily Rank Tracker & Keyword Expansion Engine
 * 
 * 1. Tracks ranking positions across all GSC queries and 31 Hyderabad localities.
 * 2. Compares against Neon DB historical snapshots to detect Climbers (▲) and Fallers (▼).
 * 3. Discovers new high-impression keywords to expand rankings.
 * 4. Generates daily markdown & JSON scoreboards.
 * 5. Dispatches an executive ranking report to Telegram.
 */

// Load .env.local if present
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...values] = trimmed.split('=');
    if (key && !process.env[key.trim()]) {
      process.env[key.trim()] = values.join('=').trim().replace(/^['"](.*)['"]$/, '$1');
    }
  }
}

const SITE_URL = process.env.GSC_SITE_URL || 'https://www.driveitcars.in/';
const REPORTS_DIR = path.resolve(process.cwd(), 'reports');
const DATABASE_URL = process.env.DATABASE_URL;

// All 31 Target Hyderabad Localities with slug and search aliases
const TARGET_LOCALITIES = [
  { name: 'Shamshabad', slug: 'shamshabad', aliases: ['shamshabad', 'shamsabad'] },
  { name: 'Aram Ghar', slug: 'aram-ghar', aliases: ['aram ghar', 'aramghar'] },
  { name: 'Rajendra Nagar', slug: 'rajendra-nagar', aliases: ['rajendra nagar', 'rajendranagar'] },
  { name: 'Kismatpur', slug: 'kismatpur', aliases: ['kismatpur'] },
  { name: 'Budwel', slug: 'budwel', aliases: ['budwel'] },
  { name: 'Attapur', slug: 'attapur', aliases: ['attapur'] },
  { name: 'Shankerpally', slug: 'shankerpally', aliases: ['shankerpally', 'shankarpally'] },
  { name: 'Bandlaguda Jagir', slug: 'bandlaguda-jagir', aliases: ['bandlaguda jagir', 'bandlaguda'] },
  { name: 'Suncity', slug: 'sun-city', aliases: ['suncity', 'sun city', 'bandlaguda'] },
  { name: 'Rajiv Gandhi Airport', slug: 'rajiv-gandhi-airport', aliases: ['rajiv gandhi airport', 'rgia', 'hyderabad airport', 'shamshabad airport'] },
  { name: 'Mehdipatnam', slug: 'mehdipatnam', aliases: ['mehdipatnam', 'mehedipatnam'] },
  { name: 'Tolichowki', slug: 'tolichowki', aliases: ['tolichowki', 'toli chowki'] },
  { name: 'Shaikpet', slug: 'sheikpet', aliases: ['shaikpet', 'sheikpet'] },
  { name: 'Gachibowli', slug: 'gachibowli', aliases: ['gachibowli'] },
  { name: 'Khajaguda', slug: 'khajaguda', aliases: ['khajaguda'] },
  { name: 'Manikonda', slug: 'manikonda', aliases: ['manikonda'] },
  { name: 'Financial District', slug: 'financial-district', aliases: ['financial district', 'financial dist'] },
  { name: 'Nanakramguda', slug: 'nanakramguda', aliases: ['nanakramguda', 'nanakram guda'] },
  { name: 'Narsingi', slug: 'narsingi', aliases: ['narsingi'] },
  { name: 'Mokila', slug: 'mokila', aliases: ['mokila'] },
  { name: 'Kokapet', slug: 'kokapet', aliases: ['kokapet'] },
  { name: 'Neopolis', slug: 'neopolis', aliases: ['neopolis'] },
  { name: 'Puppalguda', slug: 'puppalguda', aliases: ['puppalguda'] },
  { name: 'Gandipet', slug: 'gandipet', aliases: ['gandipet', 'osman sagar'] },
  { name: 'Banjara Hills', slug: 'banjara-hills', aliases: ['banjara hills', 'banjarahills'] },
  { name: 'Jubilee Hills', slug: 'jubilee-hills', aliases: ['jubilee hills', 'jubileehills'] },
  { name: 'Film Nagar', slug: 'film-nagar', aliases: ['film nagar', 'filmnagar'] },
  { name: 'Madhapur', slug: 'madhapur', aliases: ['madhapur', 'hitec city', 'cyber towers'] },
  { name: 'Kondapur', slug: 'kondapur', aliases: ['kondapur'] },
  { name: 'Nallagandla', slug: 'nallagandla', aliases: ['nallagandla', 'nalagandla'] },
  { name: 'Tellapur', slug: 'tellapur', aliases: ['tellapur'] },
];

function getGoogleAuth() {
  const credentialsJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (credentialsJson) {
    try {
      const credentials = JSON.parse(credentialsJson);
      return new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    } catch {}
  }

  const candidates = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.resolve(process.cwd(), '.private/service-account.json'),
    path.resolve(process.cwd(), '.private/driveitcars-c263ac3527d2.json'),
    path.resolve(process.cwd(), 'service-account.json'),
  ].filter(Boolean);

  const privateDir = path.resolve(process.cwd(), '.private');
  if (fs.existsSync(privateDir)) {
    try {
      const pFiles = fs.readdirSync(privateDir);
      for (const pf of pFiles) {
        if (pf.endsWith('.json') && !pf.includes('before') && !pf.includes('config')) {
          candidates.push(path.join(privateDir, pf));
        }
      }
    } catch {}
  }

  const keyPath = candidates.find(f => fs.existsSync(f));
  if (!keyPath) throw new Error('Google Search Console service account key file not found.');

  return new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
}

function getDateRange(daysAgoEnd = 3, daysDuration = 28) {
  const now = new Date();
  const endDateObj = new Date(now.getTime() - daysAgoEnd * 86400000);
  const startDateObj = new Date(endDateObj.getTime() - daysDuration * 86400000);

  const fmt = d => d.toISOString().split('T')[0];
  return { startDate: fmt(startDateObj), endDate: fmt(endDateObj) };
}

/**
 * Fetch previous keyword positions from Neon DB to calculate rank deltas
 */
async function getPreviousRankings() {
  if (!DATABASE_URL) return new Map();
  try {
    const sql = neon(DATABASE_URL);
    const rows = await sql`
      SELECT query, position, impressions, clicks, snapshot_date
      FROM gsc_snapshots
      WHERE snapshot_date = (
        SELECT MAX(snapshot_date) FROM gsc_snapshots
      )
      LIMIT 2000;
    `;
    const map = new Map();
    for (const r of rows) {
      if (!map.has(r.query)) {
        map.set(r.query, {
          position: Number(r.position),
          impressions: r.impressions,
          clicks: r.clicks,
        });
      }
    }
    return map;
  } catch (err) {
    console.warn(`⚠️ Could not query historical rankings from DB: ${err.message}`);
    return new Map();
  }
}

export async function runLocalRankAudit() {
  console.log('='.repeat(65));
  console.log('📍 DRIVEITCARS - DAILY RANK TRACKER & KEYWORD EXPANSION');
  console.log('='.repeat(65));

  const auth = getGoogleAuth();
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const { startDate, endDate } = getDateRange(3, 28);

  console.log(`📊 Analyzing Search Console: ${startDate} to ${endDate} (${SITE_URL})`);

  let allRows = [];
  let startRow = 0;
  const rowLimit = 25000;

  while (true) {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit,
        startRow,
      },
    });

    const rows = res.data.rows || [];
    allRows.push(...rows);
    if (rows.length < rowLimit || allRows.length >= 50000) break;
    startRow += rowLimit;
  }

  console.log(`✅ Loaded ${allRows.length} query-page combinations from Search Console.`);

  // 1. Fetch historical rankings for delta comparison
  const previousRankings = await getPreviousRankings();
  console.log(`📈 Loaded ${previousRankings.size} historical query baselines for comparison.`);

  // 2. Aggregate global query data
  const queryAgg = new Map();
  for (const r of allRows) {
    const q = r.keys[0];
    const page = r.keys[1];
    if (!queryAgg.has(q)) {
      queryAgg.set(q, {
        query: q,
        bestPage: page,
        clicks: 0,
        impressions: 0,
        positionWeightedSum: 0,
      });
    }
    const item = queryAgg.get(q);
    item.clicks += r.clicks || 0;
    item.impressions += r.impressions || 0;
    item.positionWeightedSum += (r.position || 0) * (r.impressions || 1);
  }

  const processedQueries = Array.from(queryAgg.values()).map(q => {
    const avgPos = q.impressions > 0 ? q.positionWeightedSum / q.impressions : 0;
    const prev = previousRankings.get(q.query);
    let delta = null;
    let badge = '✨ NEW';

    if (prev) {
      // Lower position number = better rank.
      // So prev.position - avgPos > 0 means ranking improved!
      const diff = Number((prev.position - avgPos).toFixed(1));
      delta = diff;
      if (diff > 0.4) badge = `▲ +${diff.toFixed(1)}`;
      else if (diff < -0.4) badge = `▼ ${diff.toFixed(1)}`;
      else badge = `◆ 0.0`;
    }

    return {
      query: q.query,
      bestPage: q.bestPage,
      clicks: q.clicks,
      impressions: q.impressions,
      position: Number(avgPos.toFixed(1)),
      ctr: q.impressions > 0 ? Number(((q.clicks / q.impressions) * 100).toFixed(2)) : 0,
      badge,
      delta,
      prevPosition: prev ? prev.position : null,
    };
  });

  // Top Page 1 Performers (Pos <= 10)
  const page1Queries = processedQueries
    .filter(q => q.position <= 10 && q.impressions >= 15)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  // Striking Distance Keywords (Pos 10.1 - 20) with high impressions
  const strikingKeywords = processedQueries
    .filter(q => q.position > 10 && q.position <= 20 && q.impressions >= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  // Emerging & Keyword Expansion Targets (To Rank More Keywords)
  const expansionOpportunities = processedQueries
    .filter(q => q.position > 12 && q.position <= 35 && q.impressions >= 15)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  // 3. Audit each of the 31 localities
  const localityResults = TARGET_LOCALITIES.map(loc => {
    const matchedRows = allRows.filter(r => {
      const query = (r.keys[0] || '').toLowerCase();
      const page = (r.keys[1] || '').toLowerCase();
      const isPageMatch = page.includes(`/${loc.slug}`) || page.includes(`/${loc.slug}/`);
      const isQueryMatch = loc.aliases.some(alias => query.includes(alias));
      return isPageMatch || isQueryMatch;
    });

    const totalClicks = matchedRows.reduce((sum, r) => sum + (r.clicks || 0), 0);
    const totalImpressions = matchedRows.reduce((sum, r) => sum + (r.impressions || 0), 0);
    const avgCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    
    let avgPosition = 0;
    if (totalImpressions > 0) {
      const weightedSum = matchedRows.reduce((sum, r) => sum + ((r.position || 0) * (r.impressions || 1)), 0);
      avgPosition = weightedSum / totalImpressions;
    }

    const topQueries = [...matchedRows]
      .sort((a, b) => (b.impressions || 0) - (a.impressions || 0))
      .slice(0, 3)
      .map(r => ({
        query: r.keys[0],
        page: r.keys[1],
        clicks: r.clicks,
        impressions: r.impressions,
        position: Number(r.position.toFixed(1)),
      }));

    let status = 'emerging';
    if (totalImpressions > 20 && avgPosition <= 10) status = 'top_10';
    else if (totalImpressions > 10 && avgPosition <= 25) status = 'striking_distance';

    return {
      name: loc.name,
      slug: loc.slug,
      status,
      totalClicks,
      totalImpressions,
      avgPosition: Number(avgPosition.toFixed(1)),
      avgCtr: Number(avgCtr.toFixed(2)),
      matchedRowsCount: matchedRows.length,
      topQueries,
    };
  });

  const top10Localities = localityResults.filter(r => r.status === 'top_10');
  const strikingLocalities = localityResults.filter(r => r.status === 'striking_distance');
  const emergingLocalities = localityResults.filter(r => r.status === 'emerging');

  console.log(`\n🏆 KEYWORD & RANK SUMMARY:`);
  console.log(`   🟢 Page 1 High-Volume Keywords: ${page1Queries.length}`);
  console.log(`   🟡 Striking Distance Page 2 Keywords: ${strikingKeywords.length}`);
  console.log(`   🚀 New Keyword Expansion Targets: ${expansionOpportunities.length}`);
  console.log(`   📍 Top 10 Ranked Localities: ${top10Localities.length}`);
  console.log(`   📍 Striking Distance Localities: ${strikingLocalities.length}`);

  // 4. Save Detailed Markdown Report
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const reportPath = path.join(REPORTS_DIR, 'daily-rank-tracker-report.md');
  const jsonPath = path.join(REPORTS_DIR, 'daily-rank-tracker-report.json');

  let md = `# DriveItCars - Daily Search Console Rank Tracker & Keyword Expansion\n\n`;
  md += `**Audit Window:** ${startDate} to ${endDate} (28 Days) | **Generated:** ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST\n\n`;

  md += `## 🏆 1. Top Page 1 Ranked Keywords (Positions 1–10)\n\n`;
  md += `| Keyword | Position | Move | Impressions | Clicks | CTR | Landing Page |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: | :---: | :--- |\n`;
  page1Queries.forEach(q => {
    md += `| **${q.query}** | #${q.position} | ${q.badge} | ${q.impressions} | ${q.clicks} | ${q.ctr}% | \`${q.bestPage}\` |\n`;
  });

  md += `\n## 🎯 2. Striking Distance Opportunities (Page 2 -> Page 1 Push)\n\n`;
  md += `These keywords receive high search volume and are closest to ranking in Top 5:\n\n`;
  md += `| Keyword | Position | Impressions | Clicks | Target Page | Action to Improve |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: | :--- |\n`;
  strikingKeywords.forEach(q => {
    md += `| **${q.query}** | #${q.position} | ${q.impressions} | ${q.clicks} | \`${q.bestPage}\` | Add to page H2 / FAQ / anchor link |\n`;
  });

  md += `\n## 🚀 3. New Keyword Expansion Targets (Rank More Keywords)\n\n`;
  md += `Google has started presenting DriveItCars for these emerging commercial terms. Optimize to capture top rankings:\n\n`;
  md += `| Emerging Keyword | Impressions | Current Pos | Recommended Target |\n`;
  md += `| :--- | :---: | :---: | :--- |\n`;
  expansionOpportunities.forEach(q => {
    md += `| **${q.query}** | ${q.impressions} | #${q.position} | Integrate into relevant fleet / locality page |\n`;
  });

  md += `\n## 📍 4. 31 Hyderabad Localities Local SEO Status\n\n`;
  md += `- **Page 1 Hubs:** ${top10Localities.length} / 31\n`;
  md += `- **Striking Distance Hubs:** ${strikingLocalities.length} / 31\n`;
  md += `- **Indexing / Emerging Hubs:** ${emergingLocalities.length} / 31\n\n`;

  fs.writeFileSync(reportPath, md, 'utf8');
  fs.writeFileSync(jsonPath, JSON.stringify({
    metadata: { startDate, endDate, generatedAt: new Date().toISOString() },
    page1Queries,
    strikingKeywords,
    expansionOpportunities,
    localityResults,
  }, null, 2), 'utf8');

  console.log(`\n💾 Reports saved:\n   - ${reportPath}\n   - ${jsonPath}`);

  // 5. Send Rich Telegram Digest
  try {
    let tg = `📊 <b>DriveItCars Daily Rank Tracker & Keyword Discovery</b>\n`;
    tg += `🗓 <b>Period:</b> ${startDate} to ${endDate} (28d window)\n\n`;

    if (page1Queries.length > 0) {
      tg += `⭐ <b>Top Page 1 Ranked Keywords:</b>\n`;
      page1Queries.slice(0, 5).forEach(q => {
        tg += `• <b>${q.query}</b>: Pos <b>#${q.position}</b> (${q.badge}) | ${q.impressions} imp | ${q.clicks} clicks\n`;
      });
      tg += `\n`;
    }

    if (strikingKeywords.length > 0) {
      tg += `🎯 <b>Striking Distance (Push to Page 1):</b>\n`;
      strikingKeywords.slice(0, 4).forEach(q => {
        tg += `• <b>${q.query}</b>: Pos #${q.position} (${q.impressions} imp)\n`;
      });
      tg += `\n`;
    }

    if (expansionOpportunities.length > 0) {
      tg += `🚀 <b>New Keywords to Rank & Expand:</b>\n`;
      expansionOpportunities.slice(0, 4).forEach(q => {
        tg += `• <b>${q.query}</b>: ${q.impressions} imp (Pos #${q.position})\n`;
      });
      tg += `\n`;
    }

    tg += `📍 <b>31 Localities:</b> ${top10Localities.length} in Top 10 | ${strikingLocalities.length} Striking Distance | ${emergingLocalities.length} Indexing\n`;
    tg += `\n📁 Detailed report in: <code>reports/daily-rank-tracker-report.md</code>`;

    await sendTelegramMessage(tg, 'HTML');
    console.log('📱 Telegram daily rank tracker alert sent successfully.');
  } catch (err) {
    console.warn(`⚠️ Telegram dispatch notice: ${err.message}`);
  }

  return { page1Queries, strikingKeywords, expansionOpportunities, localityResults };
}

if (process.argv[1]?.endsWith('track-local-rankings.mjs')) {
  runLocalRankAudit()
    .catch(err => {
      console.error('❌ Audit failed:', err);
      process.exit(1);
    });
}
