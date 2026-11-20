import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';
import { GoogleGenAI } from '@google/genai';

/**
 * DriveItCars - Gemini AI SEO Optimizer & Neon PostgreSQL Tracker
 *
 * Pipeline:
 * 1. Reads filtered opportunities from reports/gsc-audit-report.json.
 * 2. Connects to Neon PostgreSQL and ensures tracking tables exist.
 * 3. Inspects current page source files for live title/meta/H1 context.
 * 4. Calls Gemini to generate tactical SEO enhancements:
 *    - High-CTR <title> (<= 60 chars, includes DriveItCars)
 *    - Compelling meta description (<= 160 chars)
 *    - 2 user-intent FAQ Q&As to capture Google snippet real estate
 *    - Content gap & internal linking recommendations
 * 5. Saves recommendations to Neon database & checks performance deltas vs historical baseline.
 * 6. Generates a clean Markdown action guide in reports/gsc-gemini-recommendations.md.
 */

// ============================================================
// CONFIGURATION & CLIENT INITIALIZATION
// ============================================================

const REPORTS_DIR = path.resolve(process.cwd(), 'reports');
const JSON_INPUT_PATH = path.join(REPORTS_DIR, 'gsc-audit-report.json');
const MD_OUTPUT_PATH = path.join(REPORTS_DIR, 'gsc-gemini-recommendations.md');

// Load .env.local if present
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...values] = trimmed.split('=');
    if (key && !process.env[key.trim()]) {
      const val = values.join('=').trim().replace(/^['"](.*)['"]$/, '$1');
      process.env[key.trim()] = val;
    }
  }
}

const DATABASE_URL = process.env.DATABASE_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ============================================================
// DATABASE HELPER (NEON POSTGRESQL)
// ============================================================

async function initDatabase() {
  if (!DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not found. Running in local-only mode (skipping Neon PostgreSQL persistence).');
    return null;
  }

  try {
    const sql = neon(DATABASE_URL);
    console.log('🐘 Connected to Neon PostgreSQL.');

    // Table 1: Daily GSC snapshots for performance tracking over time
    await sql`
      CREATE TABLE IF NOT EXISTS gsc_snapshots (
        id SERIAL PRIMARY KEY,
        snapshot_date DATE NOT NULL,
        query TEXT NOT NULL,
        page TEXT NOT NULL,
        clicks INT NOT NULL DEFAULT 0,
        impressions INT NOT NULL DEFAULT 0,
        ctr NUMERIC(6, 4) NOT NULL DEFAULT 0,
        position NUMERIC(6, 2) NOT NULL DEFAULT 0,
        opportunity_type VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // Table 2: AI SEO Recommendations & baseline lift tracking
    await sql`
      CREATE TABLE IF NOT EXISTS seo_recommendations (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        query TEXT NOT NULL,
        page TEXT NOT NULL,
        baseline_position NUMERIC(6, 2) NOT NULL,
        baseline_clicks INT NOT NULL DEFAULT 0,
        baseline_impressions INT NOT NULL DEFAULT 0,
        recommended_title TEXT NOT NULL,
        recommended_meta TEXT NOT NULL,
        intent_diagnosis TEXT,
        suggested_faqs JSONB,
        status VARCHAR(20) DEFAULT 'pending',
        latest_position NUMERIC(6, 2),
        position_delta NUMERIC(6, 2),
        last_checked_at TIMESTAMP WITH TIME ZONE
      );
    `;

    console.log('✅ Neon PostgreSQL tables verified (gsc_snapshots, seo_recommendations).');
    return sql;
  } catch (err) {
    console.warn(`⚠️ Could not initialize Neon database: ${err.message}`);
    return null;
  }
}

// ============================================================
// PAGE CONTEXT EXTRACTOR
// ============================================================

function getLocalPageContext(pageUrl) {
  try {
    const urlObj = new URL(pageUrl);
    let route = urlObj.pathname.replace(/^\/|\/$/g, '');
    if (!route) route = '';

    const candidates = [
      path.resolve(process.cwd(), `src/app/${route}/page.jsx`),
      path.resolve(process.cwd(), `src/app/${route}/page.js`),
      path.resolve(process.cwd(), `src/app/page.jsx`),
    ];

    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
        const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
        return {
          filePath,
          currentTitle: titleMatch ? titleMatch[1] : 'Unknown Title',
          currentDescription: descMatch ? descMatch[1] : 'Unknown Description',
        };
      }
    }
  } catch {
    // URL parsing or file read error fallback
  }

  return {
    filePath: null,
    currentTitle: 'Self Drive Car Rentals in Hyderabad | DriveItCars',
    currentDescription: 'Premium self-drive car rental across Hyderabad.',
  };
}

// ============================================================
// GEMINI RECOMMENDATION GENERATOR
// ============================================================

async function generateRecommendationsWithGemini(ai, opportunities) {
  console.log(`\n🤖 [Gemini] Analyzing ${opportunities.length} priority opportunities...`);

  const recommendations = [];

  for (let i = 0; i < opportunities.length; i++) {
    const opp = opportunities[i];
    const { currentTitle, currentDescription } = getLocalPageContext(opp.page);

    console.log(`   [${i + 1}/${opportunities.length}] Generating copy for "${opp.query}" (${opp.page.replace('https://www.driveitcars.in', '')})`);

    const prompt = `You are a world-class Programmatic SEO Specialist for "DriveItCars" (website: https://www.driveitcars.in), Hyderabad's top self-drive and luxury car rental service.

We have identified an organic search opportunity from Google Search Console:
- Target Search Query: "${opp.query}"
- Landing Page URL: ${opp.page}
- Current Search Position: #${Number(opp.position).toFixed(1)}
- Impressions (past 28 days): ${opp.impressions}
- Clicks: ${opp.clicks}
- CTR: ${(opp.ctr * 100).toFixed(1)}%
- Opportunity Type: ${opp.opportunityType}
- Current Page Title: "${currentTitle}"
- Current Meta Description: "${currentDescription}"

Requirements:
1. "recommendedTitle": Write a click-magnet, search-optimized page title.
   - MUST be strictly between 45 and 60 characters (never exceed 60 characters).
   - MUST include the primary keyword naturally.
   - MUST end with "| DriveItCars".
2. "recommendedMeta": Write an action-oriented meta description.
   - MUST be strictly between 130 and 160 characters.
   - Highlight USPs: Refundable Deposit, 24/7 Doorstep Delivery, Unlimited Km, or verified rates (NEVER claim zero deposit or 100% refundable; deposit is mandatory and subject to inspection).
   - Clear call to action (e.g., "Book online or WhatsApp now").
3. "intentDiagnosis": 1-2 concise sentences diagnosing why this page is currently stuck at position #${Number(opp.position).toFixed(1)} and what search intent is missing.
4. "suggestedFaqs": An array of exactly 2 FAQ objects, each with "question" and "answer" (answer should be 2-3 sentences), directly answering user search intent for this specific query to target Google's People Also Ask rich snippets.
5. "internalLinkingSuggestion": Suggest 1-2 relevant internal pages on DriveItCars (e.g. /hyderabad-airport-car-rental, /suv7, /monthly-self-drive-cars-hyderabad) to link to this page.

Return ONLY a valid JSON object matching this schema without markdown fences:
{
  "recommendedTitle": "...",
  "recommendedMeta": "...",
  "intentDiagnosis": "...",
  "suggestedFaqs": [
    { "question": "...", "answer": "..." },
    { "question": "...", "answer": "..." }
  ],
  "internalLinkingSuggestion": "..."
}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text?.trim() || '{}';
      const parsed = JSON.parse(responseText);

      recommendations.push({
        ...opp,
        ...parsed,
        currentTitle,
        currentDescription,
      });
    } catch (err) {
      console.warn(`   ⚠️ Gemini failed for query "${opp.query}": ${err.message}`);
    }
  }

  return recommendations;
}

// ============================================================
// MAIN PIPELINE
// ============================================================

async function main() {
  console.log('='.repeat(65));
  console.log('🚀 DRIVEITCARS - GEMINI AI SEO OPTIMIZER & NEON TRACKER');
  console.log('='.repeat(65));

  if (!fs.existsSync(JSON_INPUT_PATH)) {
    console.error(`\n❌ Input report not found at: ${JSON_INPUT_PATH}`);
    console.error(`Please run "npm run gsc:audit" first to generate the Search Console dataset.\n`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(JSON_INPUT_PATH, 'utf8'));
  const reportDate = rawData.metadata?.reportDate || new Date().toISOString().split('T')[0];

  // Extract top 15 Striking Distance + top 15 Low CTR opportunities
  const striking = (rawData.opportunities?.strikingDistance || []).slice(0, 15).map(r => ({
    query: r.keys[0],
    page: r.keys[1],
    position: r.position,
    impressions: r.impressions,
    clicks: r.clicks,
    ctr: r.ctr,
    opportunityType: 'Striking Distance (Rank 8-20)',
  }));

  const lowCtr = (rawData.opportunities?.lowCtr || []).slice(0, 15).map(r => ({
    query: r.keys[0],
    page: r.keys[1],
    position: r.position,
    impressions: r.impressions,
    clicks: r.clicks,
    ctr: r.ctr,
    opportunityType: 'High Impression / Low CTR',
  }));

  // Deduplicate by query + page
  const oppMap = new Map();
  for (const item of [...striking, ...lowCtr]) {
    const key = `${item.query}__${item.page}`;
    if (!oppMap.has(key)) {
      oppMap.set(key, item);
    }
  }

  const targetOpportunities = Array.from(oppMap.values()).slice(0, 25);
  console.log(`\n📋 Loaded ${targetOpportunities.length} high-leverage SEO opportunities from GSC audit.`);

  // 1. Initialize Database
  const sql = await initDatabase();

  // 2. Save Daily GSC Snapshot into Neon
  if (sql && targetOpportunities.length > 0) {
    console.log(`\n💾 Storing ${targetOpportunities.length} GSC snapshot records in Neon...`);
    for (const opp of targetOpportunities) {
      try {
        await sql`
          INSERT INTO gsc_snapshots (snapshot_date, query, page, clicks, impressions, ctr, position, opportunity_type)
          VALUES (${reportDate}, ${opp.query}, ${opp.page}, ${opp.clicks}, ${opp.impressions}, ${opp.ctr}, ${opp.position}, ${opp.opportunityType});
        `;
      } catch (err) {
        console.warn(`Snapshot insert note: ${err.message}`);
      }
    }
  }

  // 3. Check for previous baseline tracking deltas
  let trackedDeltas = [];
  if (sql) {
    try {
      console.log('📈 Comparing against previous recommendation baselines...');
      const previousRecs = await sql`
        SELECT id, query, page, baseline_position, baseline_clicks, recommended_title, created_at
        FROM seo_recommendations
        ORDER BY created_at DESC
        LIMIT 50;
      `;

      for (const prev of previousRecs) {
        const currentMatch = targetOpportunities.find(t => t.query === prev.query && t.page === prev.page);
        if (currentMatch) {
          const delta = Number(prev.baseline_position) - Number(currentMatch.position);
          await sql`
            UPDATE seo_recommendations
            SET latest_position = ${currentMatch.position},
                position_delta = ${delta},
                last_checked_at = NOW(),
                status = ${delta > 0.5 ? 'improved' : 'pending'}
            WHERE id = ${prev.id};
          `;
          trackedDeltas.push({
            query: prev.query,
            page: prev.page,
            baseline: Number(prev.baseline_position).toFixed(1),
            current: Number(currentMatch.position).toFixed(1),
            delta: (delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)),
            status: delta > 0.5 ? '🏆 Climbed' : 'Pending',
          });
        }
      }
      console.log(`   Found ${trackedDeltas.length} tracked baseline comparisons.`);
    } catch (err) {
      console.warn(`Delta comparison note: ${err.message}`);
    }
  }

  // 4. Generate AI Recommendations with Gemini
  let aiRecommendations = [];
  if (!GEMINI_API_KEY) {
    console.warn('\n⚠️ GEMINI_API_KEY not found in environment.');
    console.warn('Set GEMINI_API_KEY in .env.local to enable automated AI copy generation.');
  } else {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    aiRecommendations = await generateRecommendationsWithGemini(ai, targetOpportunities);

    // Save newly generated recommendations to Neon DB
    if (sql && aiRecommendations.length > 0) {
      console.log(`\n💾 Persisting ${aiRecommendations.length} recommendations into Neon PostgreSQL...`);
      for (const rec of aiRecommendations) {
        try {
          await sql`
            INSERT INTO seo_recommendations (
              query, page, baseline_position, baseline_clicks, baseline_impressions,
              recommended_title, recommended_meta, intent_diagnosis, suggested_faqs, status
            ) VALUES (
              ${rec.query}, ${rec.page}, ${rec.position}, ${rec.clicks}, ${rec.impressions},
              ${rec.recommendedTitle}, ${rec.recommendedMeta}, ${rec.intentDiagnosis},
              ${JSON.stringify(rec.suggestedFaqs)}, 'pending'
            );
          `;
        } catch (err) {
          console.warn(`Recommendation insert note: ${err.message}`);
        }
      }
    }
  }

  // 5. Generate Markdown Report
  console.log('\n📝 Generating Gemini SEO Recommendations Report...');
  const mdReport = `# DriveItCars - Gemini AI SEO Action Guide
**Date:** ${reportDate}  
**Database:** ${DATABASE_URL ? 'Neon PostgreSQL (Connected)' : 'Local File Only'}  
**Opportunities Analyzed:** ${targetOpportunities.length}  

---

## 📈 Performance Tracking vs Baseline (Neon PostgreSQL)
${
  trackedDeltas.length > 0
    ? `| Query | Page | Baseline Pos | Current Pos | Delta | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
${trackedDeltas.map(d => `| **${d.query}** | \`${d.page.replace('https://www.driveitcars.in', '')}\` | #${d.baseline} | **#${d.current}** | ${d.delta} | ${d.status} |`).join('\n')}`
    : `*No previous baselines recorded yet. Today's audit forms the starting baseline in Neon PostgreSQL.*`
}

---

## 🎯 Top Tactical AI Recommendations by Gemini

${
  aiRecommendations.length > 0
    ? aiRecommendations.map((rec, idx) => `
### ${idx + 1}. Query: "${rec.query}"
- **Page:** [\`${rec.page.replace('https://www.driveitcars.in', '')}\`](${rec.page})
- **Current Position:** **#${Number(rec.position).toFixed(1)}** | **Impressions:** ${rec.impressions} | **Clicks:** ${rec.clicks}
- **Type:** \`${rec.opportunityType}\`
- **Diagnosis:** *${rec.intentDiagnosis || 'Needs title & search intent alignment.'}*

#### 🏷️ Recommended Title (${rec.recommendedTitle?.length || 0} chars)
\`\`\`text
${rec.recommendedTitle || 'N/A'}
\`\`\`

#### 📄 Recommended Meta Description (${rec.recommendedMeta?.length || 0} chars)
\`\`\`text
${rec.recommendedMeta || 'N/A'}
\`\`\`

#### ❓ Suggested Rich-Snippet FAQs
${(rec.suggestedFaqs || []).map(f => `1. **${f.question}**  \n   *${f.answer}*`).join('\n\n')}

#### 🔗 Internal Link Opportunity
*${rec.internalLinkingSuggestion || 'Link from relevant fleet category and locality delivery hubs.'}*

---`).join('\n')
    : `*Gemini API key was not configured during this run. Add GEMINI_API_KEY to .env.local to generate automated title, meta, and FAQ recommendations.*`
}
`;

  fs.writeFileSync(MD_OUTPUT_PATH, mdReport, 'utf8');
  console.log(`\n✅ Actionable recommendations saved to: ${MD_OUTPUT_PATH}`);
  console.log('='.repeat(65));
  console.log('🎉 PIPELINE COMPLETED SUCCESSFULLY');
  console.log('='.repeat(65) + '\n');
}

main().catch(err => {
  console.error('\n❌ Error in Gemini SEO Optimizer:', err);
  process.exit(1);
});
