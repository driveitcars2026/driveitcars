import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

async function loadSharp() {
  try {
    const mod = await import('sharp');
    return mod.default || mod;
  } catch {
    return require('E:/Github/driveitcars/public_html/node_modules/sharp');
  }
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function buildWheelSvg({ width, height, cx, wheelCy, r, angleDeg, wheelOpacity, wheelScale }) {
  const shadowRx = (30 * wheelScale).toFixed(2);
  const shadowCy = (wheelCy + r + 6).toFixed(2);
  const shadowOp = (0.11 * wheelOpacity).toFixed(4);

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <ellipse cx="${cx.toFixed(2)}" cy="${shadowCy}" rx="${shadowRx}" ry="3.6" fill="#191c20" opacity="${shadowOp}" />
  <g opacity="${wheelOpacity.toFixed(4)}" transform="translate(${cx.toFixed(2)}, ${wheelCy}) scale(${wheelScale.toFixed(4)}) rotate(${angleDeg.toFixed(2)})">
    <!-- Left spoke (9 o'clock) -->
    <path d="M -41 -5.8 L -13 -6.8 L -13 6.8 L -41 5.8 Z" fill="#191c20" />
    <line x1="-38" y1="0" x2="-15" y2="0" stroke="#4b5563" stroke-width="1.4" stroke-linecap="round" />
    <!-- Right spoke (3 o'clock) -->
    <path d="M 13 -6.8 L 41 -5.8 L 41 5.8 L 13 6.8 Z" fill="#191c20" />
    <line x1="15" y1="0" x2="38" y2="0" stroke="#4b5563" stroke-width="1.4" stroke-linecap="round" />
    <!-- Bottom split twin-strut spoke (6 o'clock) -->
    <path d="M -9.5 11 L -12 41 L -5 41 L -2 13 Z" fill="#191c20" />
    <path d="M 9.5 11 L 12 41 L 5 41 L 2 13 Z" fill="#191c20" />
    <path d="M -6.2 21 L 0 30 L 6.2 21" fill="none" stroke="#ffb907" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Outer steering wheel rim -->
    <circle cx="0" cy="0" r="45.5" fill="none" stroke="#191c20" stroke-width="10.5" />
    <!-- Inner rim bevel -->
    <circle cx="0" cy="0" r="41" fill="none" stroke="#374151" stroke-width="1.2" opacity="0.55" />
    <!-- 12-o'clock motorsport gold stripe -->
    <path d="M -8.2 -44.75 A 45.5 45.5 0 0 1 8.2 -44.75" fill="none" stroke="#ffb907" stroke-width="11" stroke-linecap="butt" />
    <!-- Center horn hub -->
    <circle cx="0" cy="0" r="15" fill="#191c20" />
    <circle cx="0" cy="0" r="10" fill="none" stroke="#ffb907" stroke-width="2.2" />
    <circle cx="0" cy="0" r="3" fill="#ffb907" />
  </g>
</svg>`
  );
}

async function main() {
  const sharp = await loadSharp();
  const isPreview = process.argv.includes('--preview');

  const W = 640;
  const H = 220;
  const logoLeft = 100;
  const logoTop = 73;
  const logoW = 440;
  const logoH = 74;

  const R = 52;
  const wheelCy = 110;
  const xStart = 72;
  const xEnd = 568;

  const { data: logoRaw, info: logoInfo } = await sharp('public/logo.png')
    .trim()
    .resize(logoW, logoH, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3',
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  if (logoInfo.width !== logoW || logoInfo.height !== logoH) {
    throw new Error(`Unexpected resized logo dimensions: ${logoInfo.width}x${logoInfo.height}`);
  }

  const totalFrames = 42;
  const delays = new Array(totalFrames).fill(30);
  delays[41] = 2500;

  const frames = [];
  const previewIndices = new Set([0, 16, 28, 41]);
  const previewDir = 'C:\\Users\\Akheel\\.gemini\\antigravity\\brain\\663242e7-e4dc-40e4-b0af-98bb252bb6ea\\scratch';
  if (isPreview) {
    fs.mkdirSync(previewDir, { recursive: true });
  }

  for (let i = 0; i < totalFrames; i++) {
    let cx = xStart;
    let angleDeg = 0;
    let wheelOpacity = 0;
    let wheelScale = 1;
    let revealEndX = 0;

    if (i <= 3) {
      const p = i / 3;
      const e = 1 - Math.pow(1 - p, 3);
      cx = xStart;
      angleDeg = -28 * (1 - e);
      wheelOpacity = 0.15 + 0.85 * e;
      wheelScale = 0.84 + 0.16 * e;
      revealEndX = 0;
    } else if (i <= 33) {
      const p = (i - 4) / 29;
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      cx = xStart + (xEnd - xStart) * e;
      angleDeg = ((cx - xStart) / R) * (180 / Math.PI);
      wheelOpacity = 1;
      wheelScale = 1;
      revealEndX = cx;
    } else if (i <= 40) {
      const p = (i - 34) / 6;
      const e = 1 - Math.pow(1 - p, 3);
      cx = xEnd + 24 * e;
      angleDeg = ((cx - xStart) / R) * (180 / Math.PI);
      wheelOpacity = 1 - e;
      wheelScale = 1 - 0.18 * e;
      revealEndX = W;
    } else {
      wheelOpacity = 0;
      revealEndX = W;
    }

    const buf = new Uint8Array(W * H * 3);
    buf.fill(255);

    if (revealEndX > logoLeft) {
      for (let ly = 0; ly < logoH; ly++) {
        const gy = logoTop + ly;
        for (let lx = 0; lx < logoW; lx++) {
          const gx = logoLeft + lx;
          const mask = revealEndX >= W ? 1 : clamp((revealEndX - gx) / 22, 0, 1);
          if (mask <= 0) continue;

          const srcIdx = (ly * logoW + lx) * 4;
          const alpha = (logoRaw[srcIdx + 3] / 255) * mask;
          if (alpha <= 0) continue;

          const dstIdx = (gy * W + gx) * 3;
          const invAlpha = 1 - alpha;
          buf[dstIdx] = Math.round(logoRaw[srcIdx] * alpha + 255 * invAlpha);
          buf[dstIdx + 1] = Math.round(logoRaw[srcIdx + 1] * alpha + 255 * invAlpha);
          buf[dstIdx + 2] = Math.round(logoRaw[srcIdx + 2] * alpha + 255 * invAlpha);
        }
      }
    }

    let frameBuffer;
    if (wheelOpacity > 0.01) {
      const svgOverlay = buildWheelSvg({
        width: W,
        height: H,
        cx,
        wheelCy,
        r: R,
        angleDeg,
        wheelOpacity,
        wheelScale,
      });

      frameBuffer = await sharp(Buffer.from(buf), {
        raw: { width: W, height: H, channels: 3 },
      })
        .composite([{ input: svgOverlay, top: 0, left: 0 }])
        .removeAlpha()
        .raw()
        .toBuffer();
    } else {
      frameBuffer = Buffer.from(buf);
    }

    if (isPreview && previewIndices.has(i)) {
      const previewPath = path.join(previewDir, `loader-preview-${i}.png`);
      await sharp(frameBuffer, { raw: { width: W, height: H, channels: 3 } })
        .png()
        .toFile(previewPath);
    }

    frames.push(frameBuffer);
  }

  const stacked = Buffer.concat(frames);
  const outPath = 'public/driveit-loader.gif';

  let colours = 64;
  for (let attempt = 0; attempt < 2; attempt++) {
    await sharp(stacked, {
      raw: { width: W, height: H * frames.length, channels: 3, pageHeight: H },
    })
      .gif({ loop: 0, delay: delays, colours, effort: 7, dither: 0 })
      .toFile(outPath);

    const { data: cornerData } = await sharp(outPath)
      .extract({ left: 0, top: 0, width: 1, height: 1 })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const r = cornerData[0];
    const g = cornerData[1];
    const b = cornerData[2];

    if (r === 255 && g === 255 && b === 255) {
      break;
    }

    if (attempt === 0) {
      colours = 128;
    } else {
      throw new Error(`Corner pixel not pure white: [${r}, ${g}, ${b}]`);
    }
  }

  const meta = await sharp(outPath, { animated: true }).metadata();
  const stat = fs.statSync(outPath);

  console.log(
    JSON.stringify(
      {
        outPath,
        bytes: stat.size,
        kb: Number((stat.size / 1024).toFixed(2)),
        colours,
        pages: meta.pages,
        width: meta.width,
        pageHeight: meta.pageHeight,
        loop: meta.loop,
        delayLast: meta.delay?.[meta.delay.length - 1],
        cornerRgb: [255, 255, 255],
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
