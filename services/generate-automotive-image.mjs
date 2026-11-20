import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { GoogleGenAI } from '@google/genai';
import { BRAND_CONFIG } from '../config/brand-config.mjs';

/**
 * DriveItCars - Automotive Photographic Background Generator
 * 
 * Stage A of the Visual Pipeline:
 * Generates or selects high-resolution, photorealistic automotive background photography.
 * STRICT REQUIREMENT: Clean photographic scene only. Absolutely NO text, logos, or watermarks.
 * The vehicle is the hero subject occupying 65–75% of the frame with negative space for text.
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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.IMAGEN_API_KEY;
const BACKGROUNDS_DIR = path.resolve(process.cwd(), 'assets/backgrounds');

/**
 * Curated high-resolution automotive photography library
 * Guarantees 100% reliability and photorealism across all DriveItCars campaign themes
 */
export const CURATED_AUTOMOTIVE_LIBRARY = [
  {
    id: 'editorial_virtus_cybercity',
    theme: 'corporate',
    system: 'editorial',
    vehicleName: 'Volkswagen Virtus GT',
    vehicleCategory: 'Executive Sedan',
    scene: 'HITEC City Cyber Towers & Mindspace Corporate Plaza, Hyderabad',
    fileName: 'volkswagen_virtus_gt_red_1793899776859.jpg',
    lighting: 'Crisp morning business light with architectural glass reflections',
    composition: 'Hero red sedan parked at 3/4 angle, ample clean negative space top left',
  },
  {
    id: 'editorial_slavia_financial_dist',
    theme: 'showcase',
    system: 'editorial',
    vehicleName: 'Skoda Slavia 1.5 TSI',
    vehicleCategory: 'Executive Sedan',
    scene: 'Financial District modern glass architecture, Nanakramguda, Hyderabad',
    fileName: 'skoda_slavia_crystal_blue_1793899758576.jpg',
    lighting: 'Late afternoon refined natural light',
    composition: 'Crystal blue sedan front three-quarters, negative space across upper section',
  },
  {
    id: 'airport_hycross_rgia',
    theme: 'airport',
    system: 'service_promo',
    vehicleName: 'Toyota Innova Hycross Hybrid',
    vehicleCategory: '7-Seater Luxury MPV',
    scene: 'Rajiv Gandhi International Airport (RGIA) Hyderabad Terminal Approach',
    fileName: 'toyota_innova_hycross_white_1793899797456.jpg',
    lighting: 'Bright clean daylit arrival zone',
    composition: 'Pearl white Hycross at terminal curb, clean negative space top left',
  },
  {
    id: 'airport_terminal_fleet',
    theme: 'airport',
    system: 'service_promo',
    vehicleName: 'Toyota Innova Crysta / Hycross',
    vehicleCategory: 'Airport Premium Fleet',
    scene: 'Hyderabad Airport RGIA 24/7 Car Pickup Zone',
    fileName: 'blog_airport_car_rental_hyderabad_1793877771137.jpg',
    lighting: 'Vibrant modern airport terminal atmosphere',
    composition: 'Premium car ready for passenger handover, generous top margin',
  },
  {
    id: 'lifestyle_orr_cable_bridge',
    theme: 'self_drive',
    system: 'lifestyle',
    vehicleName: 'Premium Self-Drive SUV',
    vehicleCategory: 'Highway SUV',
    scene: 'Hyderabad Outer Ring Road (ORR) & Durgam Cheruvu Cable Bridge',
    fileName: 'blog_hyderabad_orr_cable_bridge_1793877839683.jpg',
    lighting: 'Golden hour sunset over modern cable-stayed suspension bridge',
    composition: 'Dynamic automotive highway scene, spacious sky area for headline',
  },
  {
    id: 'lifestyle_weekend_hills',
    theme: 'weekend',
    system: 'lifestyle',
    vehicleName: 'Mahindra Thar 4x4 / Fortuner',
    vehicleCategory: 'Off-Road & Adventure SUV',
    scene: 'Scenic curves of Ananthagiri Hills & Vikarabad forest road',
    fileName: 'blog_weekend_road_trips_hyderabad_1793877750380.jpg',
    lighting: 'Warm morning sunbeams through highway canopy',
    composition: 'Adventure SUV commanding open winding road, atmospheric upper space',
  },
  {
    id: 'corporate_cyber_corridor',
    theme: 'corporate',
    system: 'editorial',
    vehicleName: 'Executive Business Sedan',
    vehicleCategory: 'Monthly Corporate Fleet',
    scene: 'Gachibowli Financial District Corporate Park, Hyderabad',
    fileName: 'blog_monthly_corporate_car_rental_1793877816943.jpg',
    lighting: 'Polished corporate dusk lighting with illuminated modern high-rises',
    composition: 'Executive fleet commanding foreground, clean slate upper quadrant',
  },
  {
    id: 'service_promo_xl6_family',
    theme: 'family',
    system: 'service_promo',
    vehicleName: 'Maruti Suzuki XL6 Nexa',
    vehicleCategory: '6-Seater Captain MPV',
    scene: 'Clean open highway leading to Hyderabad Outer Ring Road',
    fileName: 'maruti_suzuki_xl6_nexa_blue_v2_1793899837418.jpg',
    lighting: 'Crisp clear blue sky natural sunlight',
    composition: 'Nexa blue XL6 at dynamic angle, clear open sky for bold service messaging',
  },
  {
    id: 'luxury_wedding_falaknuma',
    theme: 'luxury',
    system: 'editorial',
    vehicleName: 'Toyota Fortuner / Luxury Sedan',
    vehicleCategory: 'VIP & Wedding Fleet',
    scene: 'Taj Falaknuma Palace Grand Driveway, Hyderabad',
    fileName: 'blog_luxury_wedding_car_rental_1793877797055.jpg',
    lighting: 'Majestic twilight architectural illumination with warm ambient lanterns',
    composition: 'Royal vehicle presentation, opulent palace backdrop with negative space',
  },
];

/**
 * Generate or retrieve an authentic automotive photograph
 * 
 * @param {Object} options
 * @param {string} options.campaignTheme - 'airport' | 'corporate' | 'weekend' | 'self_drive' | 'luxury' | 'family'
 * @param {string} options.visualSystem - 'editorial' | 'lifestyle' | 'service_promo'
 * @param {string} [options.vehicleModel] - e.g. 'Volkswagen Virtus GT', 'Toyota Innova Hycross'
 * @param {string} [options.scene] - Location description
 * @returns {Promise<{ buffer: Buffer, source: string, meta: Object }>}
 */
export async function generateAutomotiveImage(options = {}) {
  const {
    campaignTheme = 'self_drive',
    visualSystem = 'editorial',
    vehicleModel,
    scene,
  } = options;

  console.log(`📸 [Stage A: Automotive Photography] Sourcing scene for theme='${campaignTheme}', system='${visualSystem}'...`);

  // 1. Try Imagen 3 API if Vertex AI / Imagen credentials are explicitly enabled
  if (process.env.VERTEX_AI_PROJECT || process.env.ENABLE_IMAGEN_API === 'true') {
    try {
      console.log(`🤖 Attempting dynamic AI photo generation via Imagen 3...`);
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

      const prompt = buildAutomotivePrompt({
        theme: campaignTheme,
        system: visualSystem,
        vehicleModel,
        scene,
      });

      console.log(`   Prompt: "${prompt.slice(0, 120)}..."`);

      const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '4:3',
        },
      });

      if (response?.generatedImages?.[0]?.image?.imageBytes) {
        const imageBase64 = response.generatedImages[0].image.imageBytes;
        const buffer = Buffer.from(imageBase64, 'base64');
        console.log(`   ✅ Successfully generated AI automotive photograph (${buffer.length} bytes)!`);

        return {
          buffer,
          source: 'imagen-3.0',
          meta: {
            prompt,
            campaignTheme,
            visualSystem,
            vehicleModel,
            scene,
          },
        };
      }
    } catch (genErr) {
      console.warn(`   ⚠️ AI image generation note: ${genErr.message}. Gracefully using curated high-res library.`);
    }
  }

  // 2. Select matching curated high-resolution automotive photograph
  const selectedPhoto = selectCuratedPhoto(campaignTheme, visualSystem, vehicleModel);
  const photoPath = path.join(BACKGROUNDS_DIR, selectedPhoto.fileName);

  if (!fs.existsSync(photoPath)) {
    throw new Error(`Curated automotive photo missing at: ${photoPath}`);
  }

  const buffer = fs.readFileSync(photoPath);
  console.log(`   💎 Curated automotive photo loaded: ${selectedPhoto.fileName} (${selectedPhoto.scene})`);

  return {
    buffer,
    source: 'curated_library',
    meta: {
      id: selectedPhoto.id,
      fileName: selectedPhoto.fileName,
      vehicleName: selectedPhoto.vehicleName,
      scene: selectedPhoto.scene,
      campaignTheme,
      visualSystem,
    },
  };
}

/**
 * Match the best curated photo based on theme, visual system, and vehicle
 */
function selectCuratedPhoto(theme, system, vehicle) {
  // 1. If a specific vehicle is requested, prioritize matching that vehicle across the library
  if (vehicle) {
    const vLower = vehicle.toLowerCase();
    const vehicleMatches = CURATED_AUTOMOTIVE_LIBRARY.filter(p => 
      p.vehicleName.toLowerCase().includes(vLower) ||
      vLower.includes(p.vehicleName.toLowerCase().split(' ')[0])
    );
    if (vehicleMatches.length > 0) return vehicleMatches[0];
  }

  // 2. Try exact theme match
  let matches = CURATED_AUTOMOTIVE_LIBRARY.filter(p => p.theme === theme);
  if (matches.length > 0) {
    const systemMatches = matches.filter(p => p.system === system);
    if (systemMatches.length > 0) return systemMatches[0];
    return matches[0];
  }

  // 3. Fallback to visual system match
  matches = CURATED_AUTOMOTIVE_LIBRARY.filter(p => p.system === system);
  if (matches.length > 0) return matches[0];

  // 4. Default fallback
  return CURATED_AUTOMOTIVE_LIBRARY[0];
}

/**
 * Construct strict commercial photography prompt for Imagen
 */
function buildAutomotivePrompt({ theme, system, vehicleModel, scene }) {
  const carName = vehicleModel || 'Volkswagen Virtus GT luxury sedan';
  const location = scene || 'modern Hyderabad street near HITEC City Cyber Towers';

  return `Commercial automotive advertising photography of a pristine ${carName} in ${location}. Shot with Hasselblad H6D-100c, 85mm f/2.8 lens. The vehicle is the hero subject occupying 70% of the frame, parked at a dynamic 3/4 beauty angle. Natural reflections on the paint, crisp realistic wheels and headlights, clean Hyderabad pavement. Composition provides ample clean negative space in the top-left sky area for graphic layout. Absolutely NO text, NO letters, NO numbers, NO logo overlays, NO watermarks, NO badges, NO digital artifacts. Realistic professional car commercial photo.`;
}
