
import { google } from 'googleapis';
import fs from 'node:fs';
import path from 'node:path';

/**
 * DriveItCars - Google Search Console Automated SEO Audit
 *
 * Features:
 * 1. Google service account authentication.
 * 2. Sitemap status verification.
 * 3. 28-day Search Analytics reporting.
 * 4. Top-performing query-page combinations.
 * 5. Striking-distance keywords (positions 8-20).
 * 6. High-impression / low-CTR opportunities.
 * 7. Historical Markdown reports.
 * 8. Machine-readable JSON reports for Gemini.
 *
 * This script DOES NOT automatically modify website content
 * or submit sitemaps every day.
 */

// ============================================================
// CONFIGURATION
// ============================================================

const SITE_URL =
  process.env.GSC_SITE_URL || 'https://www.driveitcars.in/';

const SITEMAP_URL =
  process.env.GSC_SITEMAP_URL || 'https://www.driveitcars.in/sitemap.xml';

const REPORTS_DIR = path.resolve(process.cwd(), 'reports');

const PAGE_SIZE = 25000;
const MAX_ROWS = 50000;

// Search Console reporting is delayed.
// Analyze 28 completed days, ending 3 days ago.
const REPORTING_DELAY_DAYS = 3;
const REPORTING_PERIOD_DAYS = 28;

// Opportunity thresholds
const MIN_STRIKING_IMPRESSIONS = 20;
const MIN_CTR_IMPRESSIONS = 50;
const LOW_CTR_THRESHOLD = 0.02;

// ============================================================
// DATE HELPERS
// Google Search Console uses Pacific Time.
// ============================================================

function getDateDaysAgo(days) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(part => [part.type, part.value])
  );

  const date = new Date(Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day) - days
  ));

  return date.toISOString().slice(0, 10);
}

function getReportingPeriod() {
  const endDate = getDateDaysAgo(REPORTING_DELAY_DAYS);

  const startDate = getDateDaysAgo(
    REPORTING_DELAY_DAYS + REPORTING_PERIOD_DAYS - 1
  );

  return { startDate, endDate };
}

function getReportDate() {
  return getDateDaysAgo(0);
}

// ============================================================
// FILE HELPERS
// ============================================================

function ensureReportsDirectory() {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

function escapeMarkdown(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/[\r\n]+/g, ' ')
    .replace(/`/g, '\\`');
}

function writeJsonReport(filePath, data) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2),
    'utf8'
  );
}

// ============================================================
// GOOGLE AUTHENTICATION
// Supports:
// 1. GSC_SERVICE_ACCOUNT_JSON environment variable
// 2. GOOGLE_APPLICATION_CREDENTIALS file path
// 3. Local .private/service-account.json
// 4. service-account.json
// 5. credentials.json
// ============================================================

function getGoogleAuth() {
  const credentialsJson = process.env.GSC_SERVICE_ACCOUNT_JSON;

  if (credentialsJson) {
    let credentials;

    try {
      credentials = JSON.parse(credentialsJson);
    } catch {
      throw new Error(
        'GSC_SERVICE_ACCOUNT_JSON contains invalid JSON.'
      );
    }

    return new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/webmasters.readonly',
      ],
    });
  }

  const candidates = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.resolve(process.cwd(), '.private/service-account.json'),
    path.resolve(process.cwd(), '.private/driveitcars-c263ac3527d2.json'),
    path.resolve(process.cwd(), 'service-account.json'),
    path.resolve(process.cwd(), 'credentials.json'),
    path.resolve(process.cwd(), 'gsc-credentials.json'),
  ].filter(Boolean);

  // Auto-scan .private directory for any service account key file
  const privateDir = path.resolve(process.cwd(), '.private');
  if (fs.existsSync(privateDir)) {
    try {
      const pFiles = fs.readdirSync(privateDir);
      for (const pf of pFiles) {
        if (pf.endsWith('.json') && !pf.includes('before') && !pf.includes('config') && !pf.includes('settings')) {
          candidates.push(path.join(privateDir, pf));
        }
      }
    } catch {}
  }

  const credentialPath = candidates.find(file =>
    fs.existsSync(file)
  );

  if (!credentialPath) {
    throw new Error(
      'Google service account credentials not found.\n' +
      'Set GSC_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.'
    );
  }

  console.log(`🔑 Credentials found: ${credentialPath}`);

  return new google.auth.GoogleAuth({
    keyFile: credentialPath,
    scopes: [
      'https://www.googleapis.com/auth/webmasters.readonly',
    ],
  });
}

// ============================================================
// SEARCH CONSOLE CLIENT
// ============================================================

async function createSearchConsoleClient() {
  const auth = getGoogleAuth();

  return google.searchconsole({
    version: 'v1',
    auth,
  });
}

// ============================================================
// 1. VERIFY SITEMAP STATUS
// Read-only operation. Does not resubmit the sitemap.
// ============================================================

async function checkSitemap(searchconsole) {
  console.log('\n📡 [1/5] Checking sitemap status...');

  try {
    const response = await searchconsole.sitemaps.list({
      siteUrl: SITE_URL,
    });

    const sitemaps = response.data.sitemap || [];

    const targetSitemap = sitemaps.find(
      sitemap => sitemap.path === SITEMAP_URL
    );

    if (!targetSitemap) {
      console.warn(
        `⚠️ Sitemap not found in registered sitemaps: ${SITEMAP_URL}`
      );

      return {
        status: 'not_registered',
        target: SITEMAP_URL,
        registeredCount: sitemaps.length,
        sitemaps,
      };
    }

    console.log('✅ Sitemap found in Search Console.');

    console.log(`   URL: ${targetSitemap.path}`);
    console.log(`   Errors: ${targetSitemap.errors || 0}`);
    console.log(`   Warnings: ${targetSitemap.warnings || 0}`);
    console.log(`   Pending: ${targetSitemap.isPending ?? 'Unknown'}`);

    return {
      status:
        (targetSitemap.errors || 0) > 0
          ? 'has_errors'
          : 'registered',
      target: SITEMAP_URL,
      registeredCount: sitemaps.length,
      sitemap: targetSitemap,
      sitemaps,
    };

  } catch (error) {
    console.warn(`⚠️ Sitemap check failed: ${error.message}`);

    return {
      status: 'check_failed',
      error: error.message,
    };
  }
}

// ============================================================
// 2. FETCH SEARCH ANALYTICS WITH PAGINATION
// ============================================================

async function fetchSearchAnalytics(
  searchconsole,
  startDate,
  endDate
) {
  console.log('\n📊 [2/5] Fetching Search Analytics...');

  const allRows = [];
  let startRow = 0;

  while (startRow < MAX_ROWS) {
    const currentLimit = Math.min(
      PAGE_SIZE,
      MAX_ROWS - startRow
    );

    console.log(
      `   Fetching rows ${startRow + 1} to ${startRow + currentLimit}...`
    );

    const response = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,

      requestBody: {
        startDate,
        endDate,

        dimensions: ['query', 'page'],

        type: 'web',

        // Automatic aggregation is appropriate when grouping
        // by query and page. Do not force byProperty.
        rowLimit: currentLimit,
        startRow,
      },
    });

    const batch = response.data.rows || [];

    allRows.push(...batch);

    if (batch.length < currentLimit) {
      break;
    }

    startRow += batch.length;
  }

  console.log(
    `✅ Retrieved ${allRows.length} query-page records.`
  );

  if (allRows.length >= MAX_ROWS) {
    console.warn(
      '⚠️ Reached the configured retrieval cap. Additional rows may exist.'
    );
  }

  return allRows;
}

// ============================================================
// 3. ANALYZE SEARCH PERFORMANCE
// ============================================================

function analyzePerformance(rows) {
  console.log('\n🔍 [3/5] Analyzing SEO opportunities...');

  // Top-performing query-page combinations
  const topClicks = [...rows]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 20);

  // Striking-distance keywords
  const strikingDistance = rows
    .filter(row =>
      row.position >= 8 &&
      row.position <= 20 &&
      row.impressions >= MIN_STRIKING_IMPRESSIONS
    )
    .sort((a, b) =>
      b.impressions - a.impressions
    )
    .slice(0, 30);

  // High impressions with low CTR
  const lowCtr = rows
    .filter(row =>
      row.impressions >= MIN_CTR_IMPRESSIONS &&
      row.ctr < LOW_CTR_THRESHOLD &&
      row.position <= 20
    )
    .sort((a, b) =>
      b.impressions - a.impressions
    )
    .slice(0, 30);

  // Queries ranking in the top 10
  const topTen = rows
    .filter(row =>
      row.position <= 10 &&
      row.impressions >= MIN_STRIKING_IMPRESSIONS
    )
    .sort((a, b) =>
      b.impressions - a.impressions
    )
    .slice(0, 30);

  // Pages with the most clicks
  const pageMap = new Map();

  for (const row of rows) {
    const page = row.keys[1];

    if (!pageMap.has(page)) {
      pageMap.set(page, {
        page,
        clicks: 0,
        impressions: 0,
      });
    }

    const entry = pageMap.get(page);

    entry.clicks += row.clicks;
    entry.impressions += row.impressions;
  }

  const topPages = [...pageMap.values()]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 20);

  console.log(`   ⭐ Top combinations: ${topClicks.length}`);
  console.log(`   🎯 Striking distance: ${strikingDistance.length}`);
  console.log(`   ⚡ Low CTR: ${lowCtr.length}`);
  console.log(`   🏆 Top 10 opportunities: ${topTen.length}`);
  console.log(`   📄 Landing pages: ${topPages.length}`);

  return {
    topClicks,
    strikingDistance,
    lowCtr,
    topTen,
    topPages,
  };
}

// ============================================================
// 4. GENERATE MARKDOWN REPORT
// ============================================================

function generateMarkdownReport({
  reportDate,
  startDate,
  endDate,
  sitemap,
  analysis,
  totalRows,
}) {
  const {
    topClicks,
    strikingDistance,
    lowCtr,
    topTen,
    topPages,
  } = analysis;

  const topClicksTable = topClicks.map(row =>
    `| ${escapeMarkdown(row.keys[0])} | ` +
    `${escapeMarkdown(row.keys[1])} | ` +
    `${row.clicks} | ${row.impressions} | ` +
    `${(row.ctr * 100).toFixed(2)}% | ` +
    `${row.position.toFixed(1)} |`
  ).join('\n');

  const strikingTable = strikingDistance.map(row =>
    `| ${escapeMarkdown(row.keys[0])} | ` +
    `${escapeMarkdown(row.keys[1])} | ` +
    `${row.position.toFixed(1)} | ` +
    `${row.impressions} | ${row.clicks} | ` +
    `${(row.ctr * 100).toFixed(2)}% |`
  ).join('\n');

  const lowCtrTable = lowCtr.map(row =>
    `| ${escapeMarkdown(row.keys[0])} | ` +
    `${escapeMarkdown(row.keys[1])} | ` +
    `${row.impressions} | ${row.clicks} | ` +
    `${(row.ctr * 100).toFixed(2)}% | ` +
    `${row.position.toFixed(1)} |`
  ).join('\n');

  const topTenTable = topTen.map(row =>
    `| ${escapeMarkdown(row.keys[0])} | ` +
    `${escapeMarkdown(row.keys[1])} | ` +
    `${row.position.toFixed(1)} | ` +
    `${row.impressions} | ${row.clicks} |`
  ).join('\n');

  const pagesTable = topPages.map(page =>
    `| ${escapeMarkdown(page.page)} | ` +
    `${page.clicks} | ${page.impressions} |`
  ).join('\n');

  return `# DriveItCars - Google Search Console SEO Audit

**Report date:** ${reportDate}

**Website:** ${SITE_URL}

**Reporting period:** ${startDate} to ${endDate}

**Search type:** Web

**Records retrieved:** ${totalRows}

---

## 1. Sitemap Health

- Sitemap: ${SITEMAP_URL}
- Status: ${sitemap.status}
- Registered sitemaps: ${sitemap.registeredCount ?? 'Unknown'}
- Errors: ${sitemap.sitemap?.errors ?? 'Unknown'}
- Warnings: ${sitemap.sitemap?.warnings ?? 'Unknown'}
- Last submitted: ${sitemap.sitemap?.lastSubmitted ?? 'Unknown'}
- Last downloaded: ${sitemap.sitemap?.lastDownloaded ?? 'Unknown'}

---

## 2. Top Performing Search Queries

These are query-page combinations with the highest click counts.

| Search Query | Landing Page | Clicks | Impressions | CTR | Position |
|---|---|---:|---:|---:|---:|
${topClicksTable || '| No data | - | 0 | 0 | 0% | - |'}

---

## 3. Striking Distance Keywords (Positions 8-20)

Prioritize relevant commercial keywords and pages that have realistic potential to improve rankings.

Do not assume that changing a title, heading, or adding FAQs guarantees a ranking improvement.

| Search Query | Landing Page | Position | Impressions | Clicks | CTR |
|---|---|---:|---:|---:|---:|
${strikingTable || '| No opportunities found | - | - | - | - | - |'}

Recommended analysis:
- Check search intent alignment.
- Review content quality and topical coverage.
- Identify internal linking opportunities.
- Review title tags and headings.
- Compare competing pages.
- Prioritize business-relevant keywords.

---

## 4. High Impression / Low CTR Opportunities

These query-page combinations have at least ${MIN_CTR_IMPRESSIONS} impressions and CTR below ${(LOW_CTR_THRESHOLD * 100).toFixed(1)}%.

| Search Query | Landing Page | Impressions | Clicks | CTR | Position |
|---|---|---:|---:|---:|---:|
${lowCtrTable || '| No opportunities found | - | - | - | - | - |'}

Recommended actions:
- Compare CTR against similar-ranking queries.
- Review title tags and meta descriptions.
- Ensure titles accurately match search intent.
- Highlight genuine business differentiators.
- Do not promise unsupported offers or benefits.

---

## 5. Keywords Already Ranking in Top 10

| Search Query | Landing Page | Position | Impressions | Clicks |
|---|---|---:|---:|---:|
${topTenTable || '| No data | - | - | - | - |'}

Look for opportunities to improve rankings towards the top 3.

---

## 6. Top Landing Pages

| Landing Page | Clicks | Impressions |
|---|---:|---:|
${pagesTable || '| No data | 0 | 0 |'}

---

## 7. Recommended SEO Priorities

1. Improve commercially relevant keywords ranking between positions 8-20.
2. Investigate pages with high impressions and comparatively low CTR.
3. Improve content and internal linking on pages with ranking potential.
4. Protect pages already generating organic clicks.
5. Investigate significant performance declines using historical comparisons.
6. Identify content gaps based on relevant search queries.

---

## 8. Data Limitations

- Search Console query/page reporting may omit some anonymized or low-volume queries.
- Results are limited by Google's data availability and API row limits.
- Average position is an aggregate metric, not a fixed ranking.
- CTR opportunities should be evaluated against ranking position and search intent.
- This report does not establish causation between SEO changes and ranking changes.

---

*Automatically generated by DriveItCars GSC SEO Audit.*
`;
}

// ============================================================
// 5. SAVE REPORTS
// ============================================================

function saveReports({
  reportDate,
  markdownReport,
  reportData,
}) {
  console.log('\n💾 [4/5] Saving SEO reports...');

  ensureReportsDirectory();

  // Historical reports are preserved.
  const datedMarkdownPath = path.join(
    REPORTS_DIR,
    `gsc-audit-${reportDate}.md`
  );

  const latestMarkdownPath = path.join(
    REPORTS_DIR,
    'gsc-audit-report.md'
  );

  const datedJsonPath = path.join(
    REPORTS_DIR,
    `gsc-audit-${reportDate}.json`
  );

  const latestJsonPath = path.join(
    REPORTS_DIR,
    'gsc-audit-report.json'
  );

  fs.writeFileSync(
    datedMarkdownPath,
    markdownReport,
    'utf8'
  );

  fs.writeFileSync(
    latestMarkdownPath,
    markdownReport,
    'utf8'
  );

  writeJsonReport(datedJsonPath, reportData);
  writeJsonReport(latestJsonPath, reportData);

  console.log('✅ Reports saved:');
  console.log(`   ${datedMarkdownPath}`);
  console.log(`   ${latestMarkdownPath}`);
  console.log(`   ${datedJsonPath}`);
  console.log(`   ${latestJsonPath}`);

  return {
    datedMarkdownPath,
    latestMarkdownPath,
    datedJsonPath,
    latestJsonPath,
  };
}

// ============================================================
// MAIN EXECUTION
// ============================================================

async function main() {
  console.log('\n' + '='.repeat(65));
  console.log('🚗 DRIVEITCARS - GOOGLE SEARCH CONSOLE SEO AUDIT');
  console.log('='.repeat(65));

  console.log(`\n🌐 Property: ${SITE_URL}`);

  const { startDate, endDate } = getReportingPeriod();
  const reportDate = getReportDate();

  console.log(`📅 Report date: ${reportDate}`);
  console.log(`📊 Period: ${startDate} to ${endDate}`);

  if (!SITE_URL) {
    throw new Error('GSC_SITE_URL is not configured.');
  }

  // Authentication
  console.log('\n🔐 Initializing Google authentication...');

  const searchconsole = await createSearchConsoleClient();

  console.log('✅ Google Search Console client initialized.');

  // 1. Sitemap
  const sitemap = await checkSitemap(searchconsole);

  // 2. Analytics
  const rows = await fetchSearchAnalytics(
    searchconsole,
    startDate,
    endDate
  );

  // 3. Analysis
  const analysis = analyzePerformance(rows);

  // 4. Report
  console.log('\n📝 [4/5] Generating Markdown report...');

  const markdownReport = generateMarkdownReport({
    reportDate,
    startDate,
    endDate,
    sitemap,
    analysis,
    totalRows: rows.length,
  });

  // Machine-readable data for Gemini
  const reportData = {
    metadata: {
      site: SITE_URL,
      sitemap: SITEMAP_URL,
      reportDate,
      startDate,
      endDate,
      searchType: 'web',
      generatedAt: new Date().toISOString(),
      totalRows: rows.length,
    },

    sitemap,

    summary: {
      topQueries: analysis.topClicks.length,
      strikingDistance: analysis.strikingDistance.length,
      lowCtrOpportunities: analysis.lowCtr.length,
      topTenKeywords: analysis.topTen.length,
      landingPages: analysis.topPages.length,
    },

    opportunities: {
      strikingDistance: analysis.strikingDistance,
      lowCtr: analysis.lowCtr,
      topTen: analysis.topTen,
    },

    topPerformers: {
      queries: analysis.topClicks,
      pages: analysis.topPages,
    },
  };

  const files = saveReports({
    reportDate,
    markdownReport,
    reportData,
  });

  console.log('\n[5/5] Audit completed.');

  console.log('\n' + '='.repeat(65));
  console.log('🎉 GSC SEO AUDIT COMPLETED SUCCESSFULLY');
  console.log('='.repeat(65));

  console.log(`\n🎯 Striking distance: ${analysis.strikingDistance.length}`);
  console.log(`⚡ Low CTR opportunities: ${analysis.lowCtr.length}`);
  console.log(`🏆 Top 10 keywords: ${analysis.topTen.length}`);

  console.log('\n📂 Latest Gemini input:');
  console.log(files.latestJsonPath);

  console.log('\n');
}

// ============================================================
// ERROR HANDLING
// ============================================================

main().catch(error => {
  console.error('\n❌ GSC AUDIT FAILED');
  console.error(error.message || error);

  if (error.response?.data) {
    console.error(
      'Google API response:',
      JSON.stringify(error.response.data, null, 2)
    );
  }

  if (
    error.code === 403 ||
    error.message?.includes('403') ||
    error.message?.includes('permission')
  ) {
    console.error('\nPermission troubleshooting:');
    console.error('1. Open Google Search Console.');
    console.error('2. Navigate to Settings > Users and permissions.');
    console.error('3. Verify the service account email is added.');
    console.error('4. Ensure it has sufficient access.');
    console.error('5. Verify GSC_SITE_URL exactly matches the property.');
  }

  process.exitCode = 1;
});
