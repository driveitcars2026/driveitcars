import 'dotenv/config';
import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';

/**
 * DriveItCars - Google Business Profile OAuth 2.0 Handshake Helper
 * 
 * 1. Spins up local listener at http://localhost:3000/oauth2callback
 * 2. Generates authorization URL for business.manage scope
 * 3. Captures authorization code and exchanges for refresh_token
 * 4. Discovers DriveItCars Google Business Profile Location ID
 * 5. Saves GBP_REFRESH_TOKEN and GBP_LOCATION_ID into .env.local
 */

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

const CLIENT_ID = process.env.GBP_CLIENT_ID;
const CLIENT_SECRET = process.env.GBP_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n❌ Missing GBP_CLIENT_ID or GBP_CLIENT_SECRET in .env.local!');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
});

console.log('='.repeat(65));
console.log('🔑 GOOGLE BUSINESS PROFILE OAUTH 2.0 AUTHORIZATION');
console.log('='.repeat(65));
console.log('\n👉 Open the following URL in your web browser:\n');
console.log(authUrl);
console.log('\n⏳ Waiting for authorization on http://localhost:3000/oauth2callback ...\n');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/oauth2callback') {
    const code = parsedUrl.query.code;
    const error = parsedUrl.query.error;

    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`<h1>❌ Authorization Failed: ${error}</h1>`);
      console.error(`Authorization rejected: ${error}`);
      server.close();
      process.exit(1);
      return;
    }

    if (code) {
      try {
        console.log('📥 Authorization code received! Exchanging for tokens...');
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        console.log('✅ Tokens successfully obtained!');
        const refreshToken = tokens.refresh_token;

        if (!refreshToken) {
          console.warn('⚠️ Warning: No refresh token returned. (If you already authorized previously, prompt=consent ensures one is issued).');
        } else {
          console.log('🔑 Refresh token secured.');
        }

        // Try to discover accounts & locations
        let discoveredLocationName = null;
        try {
          const mybusinessaccountmanagement = google.mybusinessaccountmanagement({
            version: 'v1',
            auth: oauth2Client,
          });

          const accountsRes = await mybusinessaccountmanagement.accounts.list();
          const accounts = accountsRes.data.accounts || [];
          console.log(`🏢 Found ${accounts.length} Google Business Profile account(s).`);

          if (accounts.length > 0) {
            const mybusinessbusinessinformation = google.mybusinessbusinessinformation({
              version: 'v1',
              auth: oauth2Client,
            });

            for (const acc of accounts) {
              try {
                const locsRes = await mybusinessbusinessinformation.accounts.locations.list({
                  parent: acc.name,
                  readMask: 'name,title,storefrontAddress',
                });
                const locs = locsRes.data.locations || [];
                for (const l of locs) {
                  console.log(`   📍 Location: ${l.title} (${l.name})`);
                  if (l.title?.toLowerCase().includes('driveit') || l.title?.toLowerCase().includes('drive')) {
                    discoveredLocationName = l.name;
                  }
                }
                if (!discoveredLocationName && locs.length > 0) {
                  discoveredLocationName = locs[0].name;
                }
              } catch (locErr) {
                console.warn(`   Note retrieving locations: ${locErr.message}`);
              }
            }
          }
        } catch (apiErr) {
          console.warn(`Note during location discovery: ${apiErr.message}`);
        }

        // Append or update .env.local
        let envContent = fs.readFileSync(envLocalPath, 'utf8');

        if (refreshToken) {
          if (envContent.includes('GBP_REFRESH_TOKEN=')) {
            envContent = envContent.replace(/GBP_REFRESH_TOKEN=.*/, `GBP_REFRESH_TOKEN="${refreshToken}"`);
          } else {
            envContent += `\nGBP_REFRESH_TOKEN="${refreshToken}"`;
          }
        }

        if (discoveredLocationName) {
          if (envContent.includes('GBP_LOCATION_NAME=')) {
            envContent = envContent.replace(/GBP_LOCATION_NAME=.*/, `GBP_LOCATION_NAME="${discoveredLocationName}"`);
          } else {
            envContent += `\nGBP_LOCATION_NAME="${discoveredLocationName}"`;
          }
        }

        fs.writeFileSync(envLocalPath, envContent, 'utf8');
        console.log('💾 Updated .env.local with GBP credentials!');

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #16a34a;">✅ DriveItCars GBP Connected!</h1>
            <p style="font-size: 18px; color: #374151;">Google Business Profile authorization succeeded.</p>
            <p style="color: #6b7280;">You can safely close this browser window and return to Antigravity.</p>
          </div>
        `);

        setTimeout(() => {
          server.close();
          console.log('\n🎉 Handshake finished successfully. Ready for daily auto-posting!\n');
          process.exit(0);
        }, 1500);

      } catch (tokenErr) {
        console.error('Error exchanging token:', tokenErr);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>❌ Error: ${tokenErr.message}</h1>`);
        server.close();
        process.exit(1);
      }
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('🚀 Local OAuth listener running on port 3000.');
});
