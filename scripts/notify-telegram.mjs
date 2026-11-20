import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

/**
 * DriveItCars - Telegram Notification Dispatcher
 * Sends a daily GSC performance digest and striking distance alert to Telegram.
 * 
 * Required in .env.local:
 * - TELEGRAM_BOT_TOKEN: Bot token from @BotFather
 * - TELEGRAM_CHAT_ID: Your personal or group chat ID
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

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const REPORT_JSON_PATH = path.resolve(process.cwd(), 'reports/gsc-audit-report.json');

export async function sendTelegramMessage(text, parseMode = 'HTML') {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log('ℹ️ Telegram notifications skipped (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in .env.local).');
    return;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();
    if (data.ok) {
      console.log('📱 Telegram alert sent successfully!');
    } else {
      console.warn('⚠️ Telegram API returned error:', data.description);
    }
  } catch (err) {
    console.warn('⚠️ Failed to send Telegram alert:', err.message);
  }
}

async function main() {
  if (!fs.existsSync(REPORT_JSON_PATH)) {
    console.log('No GSC report found to send.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(REPORT_JSON_PATH, 'utf8'));
  const reportDate = data.metadata?.reportDate || new Date().toISOString().split('T')[0];
  const totalRows = data.metadata?.totalRows || 0;
  const sitemapStatus = data.sitemap?.status || 'Unknown';

  const topQueries = (data.topPerformers?.queries || []).slice(0, 3);
  const striking = (data.opportunities?.strikingDistance || []).slice(0, 5);

  let message = `🚗 <b>DriveItCars - Daily GSC SEO Digest</b>\n`;
  message += `📅 <b>Date:</b> ${reportDate}\n`;
  message += `📡 <b>Sitemap:</b> ${sitemapStatus === 'registered' ? '✅ 0 Errors' : sitemapStatus}\n`;
  message += `📊 <b>Queries Analyzed:</b> ${totalRows}\n\n`;

  message += `⭐ <b>Top Performing Queries:</b>\n`;
  topQueries.forEach((q, i) => {
    message += `${i + 1}. <b>${q.keys[0]}</b>\n   ↳ Pos: #${q.position.toFixed(1)} | Impr: ${q.impressions} | Clicks: ${q.clicks}\n`;
  });

  message += `\n🎯 <b>Top "Striking Distance" Opportunities (Page 2):</b>\n`;
  striking.forEach((s, i) => {
    message += `${i + 1}. <b>${s.keys[0]}</b>\n   ↳ Pos: <b>#${s.position.toFixed(1)}</b> | Impr: ${s.impressions} | Clicks: ${s.clicks}\n`;
  });

  message += `\n🐘 <b>Neon PostgreSQL:</b> Snapshots & baselines synchronized.`;

  await sendTelegramMessage(message);
}

if (process.argv[1]?.endsWith('notify-telegram.mjs')) {
  main().catch(err => console.error('Telegram notifier error:', err));
}
