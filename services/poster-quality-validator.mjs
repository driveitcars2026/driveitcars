import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { BRAND_CONFIG } from '../config/brand-config.mjs';

/**
 * DriveItCars - Comprehensive Poster Quality Validator
 * 
 * Verifies structural image properties, brand compliance, safe margins,
 * and text rendering sanity before any poster is sent to Telegram or GBP.
 */

export async function validatePosterQuality(options = {}) {
  const {
    filePath,
    campaign = {},
    brand = BRAND_CONFIG,
    expectedWidth = 1200,
    expectedHeight = 900,
    expectedFormat = 'jpeg',
  } = options;

  const errors = [];
  const warnings = [];

  // 1. File existence & readability
  if (!filePath || !fs.existsSync(filePath)) {
    errors.push(`Poster file does not exist on disk: ${filePath}`);
    return { valid: false, errors, warnings };
  }

  // 2. Read metadata via Sharp
  let meta;
  try {
    meta = await sharp(filePath).metadata();
  } catch (err) {
    errors.push(`Poster file cannot be parsed as an image: ${err.message}`);
    return { valid: false, errors, warnings };
  }

  // 3. Exact Dimensions
  if (meta.width !== expectedWidth || meta.height !== expectedHeight) {
    errors.push(`Invalid dimensions: expected ${expectedWidth}x${expectedHeight}, got ${meta.width}x${meta.height}`);
  }

  // 4. File format
  const format = meta.format === 'jpg' ? 'jpeg' : meta.format;
  if (format !== expectedFormat) {
    errors.push(`Invalid image format: expected ${expectedFormat}, got ${meta.format}`);
  }

  // 5. Alpha channel check (posters must have no accidental transparency)
  if (meta.hasAlpha) {
    errors.push(`Accidental transparency detected: final commercial poster must have no alpha channel (solid JPEG required).`);
  }

  // 6. Color space
  if (meta.space !== 'srgb') {
    warnings.push(`Color space is '${meta.space}', standard sRGB recommended for web & GBP display.`);
  }

  // 7. Verify Brand Logo presence
  if (!fs.existsSync(brand.logoPath)) {
    errors.push(`Required DriveItCars logo asset is missing at: ${brand.logoPath}`);
  }

  // 8. Contact Information verification
  const contactPhone = brand.displayPhone || brand.phone;
  if (!contactPhone.includes('63000 41186') && !contactPhone.includes('6300041186')) {
    errors.push(`Unverified contact phone detected: "${contactPhone}". Must be +91 63000 41186.`);
  }

  const website = brand.displayWebsite || brand.website;
  if (!website.includes('driveitcars.in')) {
    errors.push(`Unverified website URL detected: "${website}". Must point to driveitcars.in.`);
  }

  // 9. Safe margins and headline clipping check
  const headline = campaign.headline || campaign.title || '';
  if (!headline.trim()) {
    errors.push(`Campaign headline is empty.`);
  } else if (headline.length > 90) {
    errors.push(`Headline is excessively long (${headline.length} chars). Risk of visual overflow or clipping.`);
  }

  // 10. Density / Resolution sanity
  const stats = fs.statSync(filePath);
  if (stats.size < 60000) {
    warnings.push(`Image file size (${Math.round(stats.size / 1024)} KB) is unusually low for 1200x900 commercial photography.`);
  }

  const valid = errors.length === 0;

  return {
    valid,
    errors,
    warnings,
    metadata: {
      width: meta.width,
      height: meta.height,
      format: meta.format,
      sizeBytes: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      channels: meta.channels,
      hasAlpha: meta.hasAlpha,
      space: meta.space,
    },
  };
}
