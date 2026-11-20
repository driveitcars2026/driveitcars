import path from 'node:path';
import { BRAND_CONFIG } from '../config/brand-config.mjs';
import { generateAutomotiveImage } from '../services/generate-automotive-image.mjs';
import { composePoster } from '../services/poster-composer.mjs';
import { validatePosterQuality } from '../services/poster-quality-validator.mjs';

/**
 * DriveItCars - Two-Stage Automotive Poster Generation Engine
 * 
 * Stage A: Sourcing or AI-generating authentic automotive photography (no text/logos)
 * Stage B: Programmatic Sharp/SVG composition of typography, logo, and verified CTA
 */

export async function generatePoster(options = {}) {
  const {
    campaign = {},
    brand = BRAND_CONFIG,
    outputFormat = 'jpg',
    width = 1200,
    height = 900,
    outputPath = null,
    visualSystem = null,
  } = options;

  const theme = campaign.theme || campaign.templateType || 'self_drive';

  // 1. Stage A: Photographic background
  const photoResult = await generateAutomotiveImage({
    campaignTheme: theme,
    visualSystem: visualSystem || campaign.visualSystem,
    vehicleModel: campaign.vehicle || campaign.carModel,
    scene: campaign.scene,
  });

  // 2. Stage B: Programmatic composition
  const dateStr = new Date().toISOString().slice(0, 10);
  const targetPath = outputPath || path.resolve(
    process.cwd(),
    `reports/posters/poster-${dateStr}-${theme.toLowerCase()}.${outputFormat === 'jpeg' ? 'jpg' : outputFormat}`
  );

  const composeResult = await composePoster({
    backgroundBuffer: photoResult.buffer,
    campaign,
    brand,
    visualSystem: visualSystem || photoResult.meta.visualSystem,
    outputPath: targetPath,
    width,
    height,
  });

  // 3. Quality Validation
  const validation = await validatePosterQuality({
    filePath: composeResult.filePath,
    campaign,
    brand,
    expectedWidth: width,
    expectedHeight: height,
  });

  if (!validation.valid) {
    console.error('❌ Poster quality validation failed:', validation.errors);
    throw new Error(`Poster quality validation failed: ${validation.errors.join('; ')}`);
  }

  console.log(`✨ [Poster Engine] High-resolution poster verified (${validation.metadata.sizeKB} KB, sRGB solid JPEG).`);

  return {
    filePath: composeResult.filePath,
    visualSystem: composeResult.visualSystem,
    photoSource: photoResult.source,
    validation,
  };
}
