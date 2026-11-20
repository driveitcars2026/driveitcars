import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';
import { neon } from '@neondatabase/serverless';
import { BRAND_CONFIG } from '../config/brand-config.mjs';
import { generateDailyCampaign } from '../services/gemini-content-generator.mjs';
import { generatePoster } from './generate-gbp-poster.mjs';

/**
 * DriveItCars - Daily Google Business Profile (GBP) SEO & Publishing Engine
 * 
 * Marketing Workflow:
 * 1. Timezone: Strictly uses Asia/Kolkata.
 * 2. Dynamic Campaign Engine: Generates high-converting daily campaign with Gemini or curated rotation.
 * 3. Two-Stage Super Poster: Sourcing authentic automotive photography + programmatic composition (1200x900).
 * 4. Image Quality Validator: Verifies dimensions, solid JPEG, sRGB, safe margins, and contact integrity.
 * 5. Database Persistence (Neon): Tracks statuses ('generated', 'pending_approval', 'approved', 'publishing', 'published', 'failed').
 * 6. GBP API Publisher: Attempts direct API publication if location is configured.
 * 7. Telegram Dispatcher: Sends poster image & formatted post copy to Telegram.
 */

// Load .env.local
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

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const DATABASE_URL = process.env.DATABASE_URL;
const CLIENT_ID = process.env.GBP_CLIENT_ID;
const CLIENT_SECRET = process.env.GBP_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GBP_REFRESH_TOKEN;
const ACCOUNT_ID = process.env.GBP_ACCOUNT_ID;
const LOCATION_NAME = process.env.GBP_LOCATION_NAME || (process.env.GBP_PROFILE_ID ? `locations/${process.env.GBP_PROFILE_ID}` : null);

// ============================================================
// DATABASE HELPER (NEON POSTGRESQL)
// ============================================================

async function initDatabase() {
  if (!DATABASE_URL) return null;
  try {
    const sql = neon(DATABASE_URL);
    await sql`
      CREATE TABLE IF NOT EXISTS gbp_posts (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        published_at TIMESTAMP WITH TIME ZONE,
        day_of_week VARCHAR(20) NOT NULL,
        template_type VARCHAR(50),
        visual_system VARCHAR(50),
        title TEXT NOT NULL,
        theme TEXT NOT NULL,
        headline TEXT,
        post_text TEXT,
        cta_type VARCHAR(20),
        cta_url TEXT,
        faq_question TEXT,
        faq_answer TEXT,
        poster_path TEXT,
        google_post_resource TEXT,
        publishing_error TEXT,
        status VARCHAR(30) DEFAULT 'generated'
      );
    `;

    // Ensure columns exist on legacy tables
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS template_type VARCHAR(50);`;
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS visual_system VARCHAR(50);`;
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS headline TEXT;`;
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS post_text TEXT;`;
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS cta_type VARCHAR(20);`;
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS poster_path TEXT;`;
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS google_post_resource TEXT;`;
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS publishing_error TEXT;`;
    await sql`ALTER TABLE gbp_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;`;

    return sql;
  } catch (err) {
    console.warn('⚠️ Neon database initialization note:', err.message);
    return null;
  }
}

async function recordCampaignInDb(sql, campaign, posterResult) {
  if (!sql) return null;
  try {
    const postTitle = campaign.title || `${campaign.headline || campaign.theme} | DriveItCars`;
    const result = await sql`
      INSERT INTO gbp_posts (
        day_of_week, template_type, visual_system, title, theme, headline, post_text,
        cta_type, cta_url, faq_question, faq_answer, poster_path, status
      ) VALUES (
        ${campaign.day}, ${campaign.templateType || 'showcase'}, ${posterResult.visualSystem || 'editorial'}, ${postTitle},
        ${campaign.theme}, ${campaign.headline || postTitle}, ${campaign.postText},
        ${campaign.ctaType || 'BOOK'}, ${campaign.ctaUrl || BRAND_CONFIG.website},
        ${campaign.faq?.question}, ${campaign.faq?.answer}, ${posterResult.filePath},
        'generated'
      )
      RETURNING id;
    `;
    return result[0]?.id || null;
  } catch (err) {
    console.warn('⚠️ Could not insert campaign record in Neon:', err.message);
    return null;
  }
}

async function updateCampaignStatus(sql, id, updates = {}) {
  if (!sql || !id) return;
  try {
    const { status, googlePostResource = null, publishingError = null } = updates;
    if (status === 'published') {
      await sql`
        UPDATE gbp_posts
        SET status = ${status},
            google_post_resource = ${googlePostResource},
            published_at = NOW()
        WHERE id = ${id};
      `;
    } else {
      await sql`
        UPDATE gbp_posts
        SET status = ${status},
            publishing_error = ${publishingError}
        WHERE id = ${id};
      `;
    }
  } catch (err) {
    console.warn(`⚠️ Failed to update campaign ${id} status:`, err.message);
  }
}

// ============================================================
// GOOGLE BUSINESS PROFILE API PUBLISHING
// ============================================================

async function publishToGoogleBusinessProfile(campaign, posterPath) {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return {
      success: false,
      status: 'pending_approval',
      message: 'Google OAuth credentials incomplete. Ready for review and manual publish.',
    };
  }

  if (!LOCATION_NAME) {
    return {
      success: false,
      status: 'pending_approval',
      message: 'GBP Location Name pending in .env.local. Post approved for Telegram dispatch & review.',
    };
  }

  try {
    const locPath = LOCATION_NAME.startsWith('locations/') ? LOCATION_NAME : `locations/${LOCATION_NAME}`;
    console.log(`📡 [Publishing] Sending post to Google Business Profile (${locPath})...`);
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Official GBP v4 Local Posts Endpoint (accounts/{accountId}/locations/{locationId}/localPosts)
    const endpoint = ACCOUNT_ID
      ? `https://mybusiness.googleapis.com/v4/accounts/${ACCOUNT_ID}/${locPath}/localPosts`
      : `https://mybusiness.googleapis.com/v4/${locPath}/localPosts`;
    const actionType = campaign.ctaType === 'CALL' ? 'CALL' : 'BOOK';

    const payload = {
      languageCode: 'en-US',
      summary: campaign.postText,
      topicType: 'STANDARD',
      callToAction: {
        actionType: actionType,
        url: campaign.ctaUrl || BRAND_CONFIG.website,
      },
    };

    const res = await oauth2Client.request({
      url: endpoint,
      method: 'POST',
      data: payload,
    });

    if (res.data?.name) {
      console.log(`✅ Google Business Profile Post published live! Resource: ${res.data.name}`);
      return {
        success: true,
        status: 'published',
        googlePostResource: res.data.name,
      };
    }

    return {
      success: false,
      status: 'pending_approval',
      message: 'Google API responded without a resource name. Dispatched to Telegram for review.',
    };
  } catch (err) {
    const errMsg = err.response?.data?.error?.message || err.message;
    console.warn(`⚠️ GBP direct API publishing note: ${errMsg}`);
    return {
      success: false,
      status: 'pending_approval',
      message: `GBP direct API: ${errMsg}. Poster & post copy dispatched to Telegram for approval.`,
    };
  }
}

// ============================================================
// TELEGRAM NOTIFICATION DISPATCHER
// ============================================================

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function dispatchTelegramNotification(posterPath, campaign, publishingResult, posterResult) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log('ℹ️ Telegram skipped (no bot credentials).');
    return;
  }

  const isPublishedLive = publishingResult.status === 'published';
  const statusBadge = isPublishedLive
    ? '✅ <b>AUTO-PUBLISHED TO GOOGLE MAPS</b>'
    : '📋 <b>READY FOR GOOGLE MAPS (1-TAP COPY BELOW)</b>';

  const photoCaption = `🚗 <b>DriveItCars — Daily Google Business Profile Asset</b>
📅 <b>Theme:</b> ${campaign.theme} (${campaign.day})
🎨 <b>Design System:</b> ${posterResult.visualSystem?.toUpperCase() || 'EDITORIAL'} (1200x900)
${statusBadge}

👉 <i>Post copy ready in the message below!</i>`;

  const postCopyMessage = `📋 <b>GOOGLE BUSINESS PROFILE POST (TAP TEXT TO COPY):</b>

<code>${escapeHtml(campaign.postText)}</code>

🔘 <b>Recommended CTA Button:</b> <b>${campaign.ctaType || 'Book'}</b>
🌐 <b>Landing URL:</b> ${campaign.ctaUrl || BRAND_CONFIG.website}

---
❓ <b>STRATEGIC LOCAL SEO FAQ (GOOGLE MAPS Q&amp;A):</b>
<b>Question:</b>
<code>${escapeHtml(campaign.faq?.question || '')}</code>

<b>Answer:</b>
<code>${escapeHtml(campaign.faq?.answer || '')}</code>

📍 <b>Today's Target Delivery Hubs:</b>
${(campaign.targetLocations || BRAND_CONFIG.hubs.slice(0, 4)).join(' • ')}

👉 <b>Open Google Profile to Post:</b> <a href="https://business.google.com/">https://business.google.com/</a>
🐘 <i>Post snapshot and metadata archived in Neon DB.</i>`;

  try {
    // 1. Send the visual poster
    if (fs.existsSync(posterPath)) {
      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      formData.append('caption', photoCaption);
      formData.append('parse_mode', 'HTML');
      formData.append('photo', new Blob([fs.readFileSync(posterPath)]), 'gbp-poster.jpg');

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: formData,
      });
      console.log('📱 Promotional Super Poster sent to Telegram.');
    }

    // 2. Send the full post text & FAQ
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: postCopyMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    console.log('📱 Google Post copy and FAQ sent to Telegram.');
  } catch (err) {
    console.warn('⚠️ Telegram dispatch warning:', err.message);
  }
}

// ============================================================
// MAIN PIPELINE EXECUTION
// ============================================================

async function main() {
  console.log('='.repeat(65));
  console.log('🚗 DRIVEITCARS - GOOGLE BUSINESS PROFILE MARKETING ENGINE');
  console.log('='.repeat(65));

  // 1. Synthesize Campaign (Asia/Kolkata timezone enforced)
  console.log('\n[1/5] Synthesizing today\'s marketing campaign...');
  const campaign = await generateDailyCampaign();
  console.log(`      Theme: ${campaign.theme} | Vehicle: ${campaign.vehicle || 'Executive Fleet'}`);

  // 2. Generate Brand-Consistent Super Poster via Two-Stage Pipeline
  console.log('\n[2/5] Generating professional promotional poster (1200x900)...');
  let posterResult;
  try {
    posterResult = await generatePoster({
      campaign,
      brand: BRAND_CONFIG,
      outputFormat: 'jpg',
      width: 1200,
      height: 900,
    });
  } catch (posterErr) {
    console.error(`❌ Poster generation failed: ${posterErr.message}`);
    console.error('Publishing pipeline halted due to asset failure.');
    process.exit(1);
  }

  // 3. Connect to Neon PostgreSQL & Record Campaign
  console.log('\n[3/5] Connecting to Neon PostgreSQL...');
  const sql = await initDatabase();
  const campaignRecordId = await recordCampaignInDb(sql, campaign, posterResult);
  if (campaignRecordId) {
    console.log(`      Recorded campaign #${campaignRecordId} in Neon database.`);
  }

  // 4. Publish to Google Business Profile (Controlled Policy)
  console.log('\n[4/5] Executing Google Business Profile publishing policy...');
  let publishingResult = await publishToGoogleBusinessProfile(campaign, posterResult.filePath);
  console.log(`      Publishing Status: ${publishingResult.status}`);
  if (publishingResult.message) {
    console.log(`      Details: ${publishingResult.message}`);
  }

  // Update status in Neon
  if (campaignRecordId) {
    await updateCampaignStatus(sql, campaignRecordId, {
      status: publishingResult.status,
      googlePostResource: publishingResult.googlePostResource,
      publishingError: publishingResult.message,
    });
  }

  // 5. Dispatch to Telegram
  console.log('\n[5/5] Dispatching poster and content to Telegram...');
  await dispatchTelegramNotification(posterResult.filePath, campaign, publishingResult, posterResult);

  console.log('\n' + '='.repeat(65));
  console.log('🎉 DAILY GBP MARKETING ENGINE COMPLETED');
  console.log('='.repeat(65) + '\n');
}

main().catch(err => {
  console.error('❌ Unhandled error in GBP engine:', err);
  process.exit(1);
});
