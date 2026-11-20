import path from 'node:path';

/**
 * DriveItCars Official Brand Configuration
 * Single source of truth for visual identity, typography, contact details, and marketing standards.
 */
export const BRAND_CONFIG = {
  name: 'DriveItCars',
  legalName: 'DriveItCars Self Drive Car Rental',
  tagline: "Hyderabad's Premier Self Drive & Luxury Car Rental",
  website: 'https://www.driveitcars.in',
  displayWebsite: 'www.driveitcars.in',
  phone: '+91 63000 41186',
  displayPhone: '+91 63000 41186',
  whatsappNumber: '+916300041186',
  whatsappUrl: 'https://wa.me/916300041186',

  // Verified Brand Assets
  logoPath: path.resolve(process.cwd(), 'public/logo.webp'),
  logoLightPath: path.resolve(process.cwd(), 'public/logo2.webp'),

  // Approved Brand Palette (Strict - No invented colors)
  colors: {
    primaryGold: '#FFB907',       // Signature DriveItCars Gold
    goldHover: '#E5A800',
    primaryDark: '#0B0F19',       // Deep rich charcoal / near black
    secondaryDark: '#131B2E',     // Midnight navy slate
    overlayDark: 'rgba(11, 15, 25, 0.88)',
    overlayScrim: 'rgba(11, 15, 25, 0.65)',
    cardBg: '#1A233A',
    cardBorder: '#2A3655',
    accentGreen: '#10B981',       // Trust badge & WhatsApp green
    accentSky: '#38BDF8',         // Airport & open highway blue
    textLight: '#FFFFFF',
    textMuted: '#94A3B8',
    textMutedLight: '#CBD5E1',
  },

  // Typography Stacks
  fonts: {
    heading: 'Montserrat, Arial, sans-serif',
    body: 'Inter, Arial, sans-serif',
  },

  // Output Standards
  output: {
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    format: 'jpeg',
    quality: 95,
    safeMargin: 48, // 48px padding from all edges
  },

  // Verified Fleet Data
  fleet: [
    { id: 'virtus', name: 'Volkswagen Virtus GT', category: 'Executive Sedan', cutout: 'virtus.webp' },
    { id: 'slavia', name: 'Skoda Slavia 1.5 TSI', category: 'Executive Sedan', cutout: 'slavia.webp' },
    { id: 'hycross', name: 'Toyota Innova Hycross Hybrid', category: '7-Seater Luxury MPV', cutout: 'hycross.webp' },
    { id: 'fortuner', name: 'Toyota Fortuner 4x4', category: '7-Seater Luxury SUV', cutout: '7-Fortuner.webp' },
    { id: 'crysta', name: 'Toyota Innova Crysta', category: '7-Seater Premium MPV', cutout: '7-Innova Crysta.webp' },
    { id: 'thar', name: 'Mahindra Thar 4x4', category: 'Off-Road SUV', cutout: '5-Thar.webp' },
    { id: 'xl6', name: 'Maruti Suzuki XL6', category: '6-Seater Captain MPV', cutout: 'xl6.webp' },
    { id: 'baleno', name: 'Maruti Baleno Automatic', category: 'Premium Hatchback', cutout: 'Baleno.webp' },
    { id: 'swift', name: 'Maruti Swift ZXi', category: 'Compact Hatchback', cutout: 'Swift.webp' },
    { id: 'verna', name: 'Hyundai Verna Turbo', category: 'Executive Sedan', cutout: 'seden-Verna.webp' },
    { id: 'city', name: 'Honda City i-VTEC', category: 'Sedan', cutout: 'seden-City.webp' },
  ],

  // Verified Service Features (No unverified claims or ratings)
  features: [
    'Refundable Security Deposit',
    'Doorstep Delivery Across Hyderabad',
    'Unlimited Kilometers',
    'Sanitized & Inspected Fleet',
    '24/7 Roadside Assistance',
    'Verified FASTag Equipped',
    '24/7 Airport Handover at RGIA',
  ],

  // Verified Hyderabad Hubs
  hubs: [
    'Rajiv Gandhi International Airport (RGIA)',
    'HITEC City',
    'Gachibowli',
    'Madhapur',
    'Banjara Hills',
    'Jubilee Hills',
    'Kondapur',
    'Kukatpally',
    'Secunderabad',
  ],
};
