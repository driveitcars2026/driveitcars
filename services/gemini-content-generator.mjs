import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { neon } from '@neondatabase/serverless';
import { BRAND_CONFIG } from '../config/brand-config.mjs';

/**
 * DriveItCars - Dynamic Marketing Campaign & Content Engine
 * 
 * Generates dynamic, high-converting Google Business Profile (GBP) posts,
 * localized FAQs, and poster visual directions using Gemini AI or algorithmic rotation.
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

const DATABASE_URL = process.env.DATABASE_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const VERIFIED_FLEET = [
  { id: 'virtus', name: 'Volkswagen Virtus GT', category: 'Executive Sedan', imageFile: 'virtus.webp', price: '₹1,999/day' },
  { id: 'slavia', name: 'Skoda Slavia 1.5 TSI', category: 'Executive Sedan', imageFile: 'slavia.webp', price: '₹1,999/day' },
  { id: 'hycross', name: 'Toyota Innova Hycross Hybrid', category: '7-Seater Luxury MPV', imageFile: 'hycross.webp', price: '₹2,999/day' },
  { id: 'fortuner', name: 'Toyota Fortuner 4x4', category: '7-Seater Luxury SUV', imageFile: '7-Fortuner.webp', price: '₹3,999/day' },
  { id: 'crysta', name: 'Toyota Innova Crysta', category: '7-Seater Premium MPV', imageFile: '7-Innova Crysta.webp', price: '₹2,499/day' },
  { id: 'thar', name: 'Mahindra Thar 4x4', category: 'Off-Road SUV', imageFile: '5-Thar.webp', price: '₹2,499/day' },
  { id: 'xl6', name: 'Maruti Suzuki XL6', category: '6-Seater Captain MPV', imageFile: 'xl6.webp', price: '₹1,799/day' },
  { id: 'baleno', name: 'Maruti Baleno Automatic', category: 'Hatchback', imageFile: 'Baleno.webp', price: '₹1,299/day' },
  { id: 'swift', name: 'Maruti Swift ZXi', category: 'Hatchback', imageFile: 'Swift.webp', price: '₹1,199/day' },
  { id: 'verna', name: 'Hyundai Verna Turbo', category: 'Sedan', imageFile: 'seden-Verna.webp', price: '₹1,899/day' },
  { id: 'city', name: 'Honda City i-VTEC', category: 'Sedan', imageFile: 'seden-City.webp', price: '₹1,899/day' },
];

export const TEMPLATE_TYPES = [
  'showcase',     // Template 1: Premium Vehicle Showcase
  'airport',      // Template 2: Airport Pickup & Drop
  'self_drive',   // Template 3: Self-Drive Car Rental
  'weekend',      // Template 4: Weekend Road Trips & 4x4
  'corporate',    // Template 5: Corporate & Executive Car Rentals
  'family',       // Template 6: Family & 7-Seater Rentals
];

// Fallback high-converting templates if Gemini API key is not present
const FALLBACK_CAMPAIGNS = [
  {
    templateType: 'self_drive',
    theme: 'City Commute & IT Corridor Automatics',
    badge: '★ HYDERABAD IT CORRIDOR COMMUTE ★',
    headline: 'EFFORTLESS AUTOMATICS',
    subheadline: 'Beat Bumper-to-Bumper Traffic in HITEC City and Gachibowli',
    priceHook: 'Self-Drive from ₹1,299 / Day',
    carName: 'Volkswagen Virtus & Maruti Baleno',
    carImageFile: 'virtus.webp',
    features: ['Refundable Security Deposit', 'Doorstep Delivery in 30 Min', 'Pristine & Sanitized'],
    ctaType: 'BOOK',
    ctaUrl: 'https://www.driveitcars.in/self-drive-car',
    postText: `Tired of clutching through bumper-to-bumper peak traffic in HITEC City, Gachibowli, and Financial District? 🚗💨

Experience effortless driving with DriveItCars' fleet of pristine automatic hatchbacks and sedans (Volkswagen Virtus, Maruti Baleno, Swift, Hyundai Verna).

✅ Refundable Security Deposit
✅ 30-Minute Doorstep Delivery across Hyderabad
✅ Sanitized, fully insured & FASTag equipped
✅ Daily, Weekly & Monthly corporate subscription plans

Book your self-drive ride today or call our concierge for instant delivery!

📞 Call / WhatsApp: +91 63000 41186
🌐 Book Online: https://www.driveitcars.in/self-drive-car`,
    faq: {
      question: 'Can I rent a self-drive automatic car in HITEC City or Gachibowli with quick delivery?',
      answer: 'Yes! DriveItCars provides automatic hatchbacks and sedans across HITEC City, Gachibowli, and Madhapur with refundable security deposit and 30-minute doorstep delivery. Call +91 63000 41186 to book.',
    },
    targetLocations: ['HITEC City', 'Gachibowli', 'Madhapur', 'Financial District'],
  },
  {
    templateType: 'airport',
    theme: 'RGIA Airport 24/7 Self-Drive Handover',
    badge: '★ RGIA HYDERABAD AIRPORT EXPRESS ★',
    headline: 'AIRPORT SELF-DRIVE',
    subheadline: 'Handover Right at RGIA Airport Car Park within 10 Mins of Landing',
    priceHook: 'No Airport Surge. Fixed Transparent Rates.',
    carName: 'Toyota Innova Hycross Hybrid',
    carImageFile: 'hycross.webp',
    features: ['Flight Tracking Meet & Greet', 'Spacious Boot for International Bags', '24/7 Handover at Airport'],
    ctaType: 'BOOK',
    ctaUrl: 'https://www.driveitcars.in/hyderabad-airport-car-rental',
    postText: `Landing late night or early morning at RGIA Hyderabad Airport? ✈️ Skip the taxi queues and surge pricing!

DriveItCars delivers your chosen self-drive car right to the RGIA Airport Car Park within 10 minutes of landing. Complete flexibility to drive across Hyderabad or take interstate highways with no restrictions.

⭐ Flight arrival tracking meet-and-greet
⭐ Spacious boot space for international luggage
⭐ Toyota Innova Hycross, Crysta, Fortuner & Sedans ready
⭐ Refundable security deposit & transparent billing

Reserve your airport ride ahead of landing!

📞 24/7 Airport Desk: +91 63000 41186
🌐 Reserve: https://www.driveitcars.in/hyderabad-airport-car-rental`,
    faq: {
      question: 'How do I pick up a self-drive car at Hyderabad RGIA Airport?',
      answer: 'Our representative tracks your incoming flight and meets you directly at RGIA car park with keys and vehicle documentation within 10 minutes of landing. Return is at the same airport spot. Contact +91 63000 41186.',
    },
    targetLocations: ['RGIA Airport', 'Shamshabad', 'Gachibowli', 'Banjara Hills'],
  },
  {
    templateType: 'family',
    theme: '7-Seater Family Tourers: Innova Hycross & Crysta',
    badge: '★ PREMIUM 7-SEATER LUXURY FLEET ★',
    headline: 'FAMILY ROAD TOURS',
    subheadline: 'Travel in Supreme Comfort Across Telangana & Interstate Highways',
    priceHook: 'Captain Seats • Dual AC • Cruise Control',
    carName: 'Toyota Fortuner & Innova Crysta',
    carImageFile: '7-Fortuner.webp',
    features: ['7 Full Adult Comfort', 'Large Luggage Boot', 'Verified FASTag Included'],
    ctaType: 'CALL',
    ctaUrl: 'https://www.driveitcars.in/suv7',
    postText: `Planning a family temple tour, outstation pilgrimage, or vacation with the entire group? 👨‍👩‍👧‍👦

Travel with zero fatigue in DriveItCars' 7-seater fleet. Featuring the ultra-comfortable Toyota Innova Hycross Hybrid, Innova Crysta, and Toyota Fortuner.

💎 Luxurious captain seats & dual-zone climate control
💎 Immense luggage capacity for 5-6 full suitcases
💎 Supreme high-speed highway stability & verified FASTag
💎 Self-drive or with professional verified chauffeur

Make family memories in absolute luxury!

📞 Instant Booking: +91 63000 41186
🌐 View Fleet: https://www.driveitcars.in/suv7`,
    faq: {
      question: 'Which 7-seater cars are available for self-drive outstation trips from Hyderabad?',
      answer: 'DriveItCars offers Toyota Innova Hycross Hybrid, Innova Crysta, Toyota Fortuner, and Maruti XL6 with unlimited kilometer options and all-India permits for outstation family trips. Call +91 63000 41186.',
    },
    targetLocations: ['Kukatpally', 'Secunderabad', 'Banjara Hills', 'Jubilee Hills'],
  },
  {
    templateType: 'corporate',
    theme: 'Executive European Sedans for Boardrooms & Corporate VIPs',
    badge: '★ GERMAN PERFORMANCE & LUXURY ★',
    headline: 'EXECUTIVE LUXURY',
    subheadline: 'Make a Statement at Corporate Meetings and Boardrooms',
    priceHook: 'European Refinement • 5-Star Safety',
    carName: 'Skoda Slavia & Volkswagen Virtus GT',
    carImageFile: 'slavia.webp',
    features: ['100% Privacy Guaranteed', 'Ventilated Leather Seats', 'Unlimited Km Options'],
    ctaType: 'CALL',
    ctaUrl: 'https://www.driveitcars.in/sedan',
    postText: `Arrive in poise and authority. Upgrade your executive travel in Hyderabad with our premium European sedans. 👔✨

Drive the high-performance Volkswagen Virtus GT and Skoda Slavia — engineered with 5-star GNCAP safety, ventilated leather seats, and German driving dynamics.

🏢 Ideal for CEO meetings, client visits & corporate conferences
🏢 Pristine interior detailing & 100% passenger privacy
🏢 Flexible GST billing & corporate monthly car rental packages

Reserve your executive sedan with DriveItCars today.

📞 Corporate Concierge: +91 63000 41186
🌐 Explore: https://www.driveitcars.in/sedan`,
    faq: {
      question: 'Do you offer monthly corporate car rentals with GST invoicing in Hyderabad?',
      answer: 'Yes, DriveItCars provides flexible monthly and long-term car subscriptions for executives and corporates in Hyderabad with 100% tax-compliant GST invoicing and dedicated fleet maintenance. Call +91 63000 41186.',
    },
    targetLocations: ['Banjara Hills', 'Jubilee Hills', 'HITEC City', 'Begumpet'],
  },
  {
    templateType: 'weekend',
    theme: 'Weekend Getaways & Monsoon 4x4 Trails',
    badge: '★ WEEKEND ROAD TRIP SPECIAL ★',
    headline: 'CONQUER THE TRAILS',
    subheadline: 'Drive to Ananthagiri Hills, Srisailam & Nagarjuna Sagar in 4x4 Power',
    priceHook: 'Mahindra Thar 4x4 & Scorpio-N Ready',
    carName: 'Mahindra Thar 4x4 & Scorpio',
    carImageFile: '5-Thar.webp',
    features: ['Rugged 4x4 Drivetrain', 'All-Terrain Capability', '24/7 Roadside Assistance'],
    ctaType: 'BOOK',
    ctaUrl: 'https://www.driveitcars.in/self-drive-suv-hyderabad',
    postText: `The weekend is calling! 🌲 Ready to explore Ananthagiri Hills, Vikarabad trails, Srisailam, or Nagarjuna Sagar?

Take command of the road with DriveItCars' rugged 4x4 and AWD fleet:
🚙 Mahindra Thar 4x4 (Convertible / Hard Top)
🚙 Scorpio-N & Hyundai Creta
🚙 Toyota Fortuner 4x4

All-terrain ready, 24/7 roadside assistance, unlimited kilometer options, and doorstep handover right at your home on Friday evening!

Pack your bags and hit the open highway!

📞 Reserve Your 4x4: +91 63000 41186
🌐 Book: https://www.driveitcars.in/self-drive-suv-hyderabad`,
    faq: {
      question: 'Can I rent a Mahindra Thar 4x4 for a weekend road trip from Hyderabad?',
      answer: 'Yes! DriveItCars provides well-maintained Mahindra Thar 4x4 and Scorpio-N SUVs with doorstep delivery across Hyderabad for weekend road trips and countryside trails. Contact +91 63000 41186.',
    },
    targetLocations: ['Gachibowli', 'Kondapur', 'Miyapur', 'Vikarabad Route'],
  },
  {
    templateType: 'showcase',
    theme: 'Refundable Security Deposit Across Hyderabad',
    badge: '★ DRIVEITCARS EXCLUSIVE PROMISE ★',
    headline: 'REFUNDABLE DEPOSIT',
    subheadline: 'Transparent Terms. Clear Booking. Pure Driving Freedom.',
    priceHook: 'Doorstep Drop Across 28+ Hyderabad Localities',
    carName: 'Maruti XL6, Baleno & Creta',
    carImageFile: 'xl6.webp',
    features: ['Doorstep Delivery in 30 Min', 'Unlimited Km Daily / Monthly', 'Instant WhatsApp Booking'],
    ctaType: 'BOOK',
    ctaUrl: 'https://www.driveitcars.in/',
    postText: `Experience car rental the way it should be: simple, honest, and transparent! 🔑⚡

At DriveItCars, we believe in complete clarity. Rent any hatchback, sedan, or SUV with a refundable security deposit returned post-trip upon car inspection as per rental terms, and doorstep handover in under 30 minutes.

📍 Delivering across 28+ Hyderabad delivery hubs:
Banjara Hills, Jubilee Hills, Gachibowli, Madhapur, Kondapur, Kukatpally, Begumpet, Secunderabad, LB Nagar, and RGIA Airport.

Unlock pure driving freedom today!

📞 Instant WhatsApp: +91 63000 41186
🌐 Reserve: https://www.driveitcars.in/`,
    faq: {
      question: 'How does the security deposit work for car rentals with DriveItCars?',
      answer: 'DriveItCars requires a security deposit that is refunded upon vehicle return and inspection as per rental terms. Quick Aadhaar and driving license verification. Call +91 63000 41186 or book online at driveitcars.in.',
    },
    targetLocations: ['All 28 Hyderabad Hubs', 'Secunderabad', 'Kukatpally', 'Banjara Hills'],
  },
];

/**
 * Fetches recent campaign history from Neon to avoid repetition.
 */
async function getRecentCampaignHistory(limit = 7) {
  if (!DATABASE_URL) return [];
  try {
    const sql = neon(DATABASE_URL);
    const rows = await sql`
      SELECT theme, title, created_at
      FROM gbp_posts
      ORDER BY created_at DESC
      LIMIT ${limit};
    `;
    return rows;
  } catch {
    return [];
  }
}

/**
 * Generates today's marketing campaign dynamically.
 */
export async function generateDailyCampaign() {
  console.log('🧠 [Content Engine] Synthesizing today\'s marketing campaign...');

  // Get current day in Asia/Kolkata timezone
  const kolkataDate = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const dayOfWeek = kolkataDate.find(p => p.type === 'weekday')?.value || 'Monday';
  const recentHistory = await getRecentCampaignHistory(7);

  // If Gemini API Key is available, generate fresh contextual marketing copy
  if (GEMINI_API_KEY) {
    try {
      console.log('🤖 Invoking Gemini AI for localized GBP campaign generation...');
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

      const prompt = `You are the Senior Local SEO, AEO (Answer Engine Optimization) & GEO (Generative/Geographic Engine Optimization) Marketing Director for "${BRAND_CONFIG.name}" (website: ${BRAND_CONFIG.website}, phone: ${BRAND_CONFIG.phone}), Hyderabad's top self-drive and luxury car rental brand.

Today is ${dayOfWeek}.
Hyderabad Target Hubs: ${(BRAND_CONFIG.hubs || []).join(', ')}
Available Fleet: ${VERIFIED_FLEET.map(f => `${f.name} (${f.category}, ${f.imageFile})`).join(', ')}
Recent Campaign Themes (Do NOT repeat): ${recentHistory.map(h => h.theme).join('; ') || 'None'}

Generate a high-converting, AEO & GEO-optimized Google Business Profile (GBP) marketing campaign for today.
Choose one templateType from: ["showcase", "airport", "self_drive", "weekend", "corporate", "family"].
Choose an appropriate vehicle from Available Fleet and use its exact imageFile.

CRITICAL AEO & GEO REQUIREMENTS:
1. SECURITY DEPOSIT POLICY: DriveItCars REQUIRES a security deposit. NEVER write "zero deposit", "no deposit", or "100% refundable" (since damages or last-minute cancellations cannot be refunded). Always state "Refundable security deposit as per rental terms".
2. AEO (Answer Engine Optimization): The FAQ must be formulated for Google AI Overviews and Perplexity. The answer MUST begin with a direct, unambiguous factual answer (e.g., "Yes, DriveItCars provides..."), state the refundable deposit and unlimited-km policy, delivery time (15–30 mins), and include phone ${BRAND_CONFIG.phone}.
3. GEO (Geographic Grounding): The post text must mention 2-3 real geographic landmarks or arterial corridors (e.g. Cyber Towers, Mindspace, PVNR Expressway, ORR exits, RGIA Terminal 1) in the targeted localities.
4. Deep-Linking: "ctaUrl" should point to the most relevant deep URL (e.g. https://www.driveitcars.in/sedan, https://www.driveitcars.in/hyderabad-airport-car-rental, or https://www.driveitcars.in/gachibowli).

Return a valid JSON object matching this schema without markdown fences:
{
  "templateType": "showcase | airport | self_drive | weekend | corporate | family",
  "theme": "Short theme summary",
  "badge": "★ ALL CAPS EYE CATCHING BADGE ★",
  "headline": "PUNCHY 2-4 WORD ALL CAPS HEADLINE",
  "subheadline": "Clear, compelling benefit sentence mentioning Hyderabad localities",
  "priceHook": "Starting from ₹... / Day or Special Benefit",
  "carName": "Exact Car Name",
  "carImageFile": "exact image file from Available Fleet list",
  "features": ["3 specific features with verified USPs: Refundable Deposit, Unlimited KMs, 24/7 Handover, etc."],
  "ctaType": "BOOK or CALL",
  "ctaUrl": "Relevant deep URL on driveitcars.in",
  "title": "Google Post Title (with DriveItCars)",
  "postText": "Engaging 120-180 word Google Post with bullet points, emojis, exact phone ${BRAND_CONFIG.phone}, website link, landmark anchors, and local keywords",
  "faq": {
    "question": "A real, high-volume conversational question people search for in Hyderabad",
    "answer": "Direct AEO-formatted 2-3 sentence answer starting with an affirmative direct answer, with phone ${BRAND_CONFIG.phone}"
  },
  "targetLocations": ["Top 3-4 specific Hyderabad localities targeted today"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const responseText = response.text?.trim() || '{}';
      const parsed = JSON.parse(responseText);

      if (parsed.headline && parsed.carImageFile) {
        console.log(`✅ Gemini generated dynamic campaign: "${parsed.headline}" (${parsed.theme})`);
        return {
          ...parsed,
          day: dayOfWeek,
        };
      }
    } catch (err) {
      console.warn(`⚠️ Gemini content generation fallback: ${err.message}`);
    }
  }

  // Fallback to high-converting curated rotation by day of week
  const dayIndices = { Sunday: 5, Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4, Saturday: 2 };
  const fallbackIndex = dayIndices[dayOfWeek] ?? 0;
  const campaign = FALLBACK_CAMPAIGNS[fallbackIndex];

  console.log(`📋 Using curated campaign rotation for ${dayOfWeek}: "${campaign.headline}" (${campaign.theme})`);
  return {
    ...campaign,
    day: dayOfWeek,
  };
}
