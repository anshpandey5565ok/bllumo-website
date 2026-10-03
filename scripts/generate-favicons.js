const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

// 1. Read source logo
const sourcePath = path.join(__dirname, '..', 'public', 'bllumo-logo.png');
const sourceData = fs.readFileSync(sourcePath);
const srcPng = PNG.sync.read(sourceData);

console.log('Source image loaded:', srcPng.width, 'x', srcPng.height);

// 2. Find exact bounding box of the logo mark (pixels that are dark)
let minX = srcPng.width, maxX = 0, minY = srcPng.height, maxY = 0;
for (let y = 0; y < srcPng.height; y++) {
  for (let x = 0; x < srcPng.width; x++) {
    const idx = (srcPng.width * y + x) << 2;
    const r = srcPng.data[idx];
    const g = srcPng.data[idx + 1];
    const b = srcPng.data[idx + 2];
    if (r < 235 || g < 235 || b < 235) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
console.log('Logo bounding box:', { minX, maxX, minY, maxY, cropW, cropH });

// 3. Flood-fill from corners to find outside background pixels
// We do this to provide clean transparency on the exterior while preserving the interior white eye ring & pupil
const isOutside = new Uint8Array(srcPng.width * srcPng.height);
const queue = [];

function isWhitePixel(x, y) {
  const idx = (srcPng.width * y + x) << 2;
  return srcPng.data[idx] > 230 && srcPng.data[idx+1] > 230 && srcPng.data[idx+2] > 230;
}

// Seed queue with image borders
for (let x = 0; x < srcPng.width; x++) {
  if (isWhitePixel(x, 0)) { queue.push([x, 0]); isOutside[0 * srcPng.width + x] = 1; }
  if (isWhitePixel(x, srcPng.height - 1)) { queue.push([x, srcPng.height - 1]); isOutside[(srcPng.height - 1) * srcPng.width + x] = 1; }
}
for (let y = 0; y < srcPng.height; y++) {
  if (isWhitePixel(0, y)) { queue.push([0, y]); isOutside[y * srcPng.width + 0] = 1; }
  if (isWhitePixel(srcPng.width - 1, y)) { queue.push([srcPng.width - 1, y]); isOutside[y * srcPng.width + (srcPng.width - 1)] = 1; }
}

let head = 0;
while (head < queue.length) {
  const [cx, cy] = queue[head++];
  const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
  for (const [nx, ny] of neighbors) {
    if (nx >= 0 && nx < srcPng.width && ny >= 0 && ny < srcPng.height) {
      const pos = ny * srcPng.width + nx;
      if (!isOutside[pos] && isWhitePixel(nx, ny)) {
        isOutside[pos] = 1;
        queue.push([nx, ny]);
      }
    }
  }
}
console.log('Outside background identified:', queue.length, 'pixels');

// Function to sample pixel from cropped logo
// If useTransparency is true, outside white pixels are transparent.
// If useTransparency is false, outside white pixels remain #FFFFFF.
function getCroppedPixel(cx, cy, useTransparency = false) {
  const srcX = Math.round(minX + cx);
  const srcY = Math.round(minY + cy);
  if (srcX < 0 || srcX >= srcPng.width || srcY < 0 || srcY >= srcPng.height) {
    return [255, 255, 255, useTransparency ? 0 : 255];
  }
  const pos = srcY * srcPng.width + srcX;
  const idx = pos << 2;
  const r = srcPng.data[idx];
  const g = srcPng.data[idx + 1];
  const b = srcPng.data[idx + 2];
  let a = srcPng.data[idx + 3];

  if (useTransparency && isOutside[pos]) {
    a = 0;
  }
  return [r, g, b, a];
}

// High-quality bilinear resampling and centering function
function renderCenteredIcon(targetSize, paddingPercent = 0.12, useTransparency = false, roundedSquircle = false) {
  const out = new PNG({ width: targetSize, height: targetSize });

  // Clear to transparent
  for (let i = 0; i < out.data.length; i += 4) {
    out.data[i] = 255;
    out.data[i + 1] = 255;
    out.data[i + 2] = 255;
    out.data[i + 3] = 0;
  }

  // Draw background if not fully transparent (or if squircle)
  if (!useTransparency || roundedSquircle) {
    const radius = roundedSquircle ? targetSize * 0.22 : 0;
    for (let y = 0; y < targetSize; y++) {
      for (let x = 0; x < targetSize; x++) {
        let inside = true;
        if (roundedSquircle) {
          const dx = Math.max(0, Math.max(radius - x, x - (targetSize - 1 - radius)));
          const dy = Math.max(0, Math.max(radius - y, y - (targetSize - 1 - radius)));
          if (dx * dx + dy * dy > radius * radius) {
            inside = false;
          }
        }
        if (inside) {
          const idx = (targetSize * y + x) << 2;
          out.data[idx] = 255;
          out.data[idx + 1] = 255;
          out.data[idx + 2] = 255;
          out.data[idx + 3] = 255;
        }
      }
    }
  }

  // Calculate scaled dimensions to preserve aspect ratio perfectly
  const maxInnerDim = Math.round(targetSize * (1 - paddingPercent * 2));
  let destW, destH;
  if (cropW > cropH) {
    destW = maxInnerDim;
    destH = Math.round(cropH * (maxInnerDim / cropW));
  } else {
    destH = maxInnerDim;
    destW = Math.round(cropW * (maxInnerDim / cropH));
  }

  const offsetX = Math.round((targetSize - destW) / 2);
  const offsetY = Math.round((targetSize - destH) / 2);

  // Render cropped logo into destination box using bilinear interpolation
  for (let dy = 0; dy < destH; dy++) {
    const targetY = offsetY + dy;
    if (targetY < 0 || targetY >= targetSize) continue;

    const srcYFloat = (dy / (destH - 1)) * (cropH - 1);
    const sy0 = Math.floor(srcYFloat);
    const sy1 = Math.min(cropH - 1, sy0 + 1);
    const fy = srcYFloat - sy0;

    for (let dx = 0; dx < destW; dx++) {
      const targetX = offsetX + dx;
      if (targetX < 0 || targetX >= targetSize) continue;

      const srcXFloat = (dx / (destW - 1)) * (cropW - 1);
      const sx0 = Math.floor(srcXFloat);
      const sx1 = Math.min(cropW - 1, sx0 + 1);
      const fx = srcXFloat - sx0;

      const p00 = getCroppedPixel(sx0, sy0, useTransparency);
      const p10 = getCroppedPixel(sx1, sy0, useTransparency);
      const p01 = getCroppedPixel(sx0, sy1, useTransparency);
      const p11 = getCroppedPixel(sx1, sy1, useTransparency);

      // Bilinear blend
      const r = Math.round((1 - fy) * ((1 - fx) * p00[0] + fx * p10[0]) + fy * ((1 - fx) * p01[0] + fx * p11[0]));
      const g = Math.round((1 - fy) * ((1 - fx) * p00[1] + fx * p10[1]) + fy * ((1 - fx) * p01[1] + fx * p11[1]));
      const b = Math.round((1 - fy) * ((1 - fx) * p00[2] + fx * p10[2]) + fy * ((1 - fx) * p01[2] + fx * p11[2]));
      const a = Math.round((1 - fy) * ((1 - fx) * p00[3] + fx * p10[3]) + fy * ((1 - fx) * p01[3] + fx * p11[3]));

      const outIdx = (targetSize * targetY + targetX) << 2;
      if (a > 0) {
        // Alpha blend onto existing background
        const bgA = out.data[outIdx + 3] / 255;
        const fgA = a / 255;
        const finalA = fgA + bgA * (1 - fgA);
        if (finalA > 0) {
          out.data[outIdx] = Math.round((r * fgA + out.data[outIdx] * bgA * (1 - fgA)) / finalA);
          out.data[outIdx + 1] = Math.round((g * fgA + out.data[outIdx + 1] * bgA * (1 - fgA)) / finalA);
          out.data[outIdx + 2] = Math.round((b * fgA + out.data[outIdx + 2] * bgA * (1 - fgA)) / finalA);
          out.data[outIdx + 3] = Math.round(finalA * 255);
        }
      }
    }
  }

  return PNG.sync.write(out);
}

// Generate ICO file containing 16x16, 32x32, 48x48
function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type (1 = ICO)
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + count * 16;
  const dirEntries = [];
  for (let i = 0; i < count; i++) {
    const entry = Buffer.alloc(16);
    const size = sizes[i];
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    dirEntries.push(entry);
    offset += pngBuffers[i].length;
  }
  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

// Let's generate all the required assets:
// 1. favicon-16x16.png (clean white squircle so black logo is striking on both light and dark browser tabs)
const png16 = renderCenteredIcon(16, 0.08, false, true);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon-16x16.png'), png16);
console.log('Created public/favicon-16x16.png');

// 2. favicon-32x32.png
const png32 = renderCenteredIcon(32, 0.10, false, true);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon-32x32.png'), png32);
console.log('Created public/favicon-32x32.png');

// 3. 48x48 for ICO
const png48 = renderCenteredIcon(48, 0.10, false, true);

// 4. favicon.ico (multi-size ICO)
const icoBuffer = createIco([png16, png32, png48], [16, 32, 48]);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), icoBuffer);
fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'favicon.ico'), icoBuffer);
console.log('Created public/favicon.ico and src/app/favicon.ico');

// 5. apple-touch-icon.png (180x180 - iOS standard)
const applePng = renderCenteredIcon(180, 0.14, false, false);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), applePng);
fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'apple-icon.png'), applePng);
console.log('Created public/apple-touch-icon.png and src/app/apple-icon.png');

// 6. android-chrome-192x192.png
const png192 = renderCenteredIcon(192, 0.14, false, false);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'android-chrome-192x192.png'), png192);
console.log('Created public/android-chrome-192x192.png');

// 7. android-chrome-512x512.png
const png512 = renderCenteredIcon(512, 0.14, false, false);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'android-chrome-512x512.png'), png512);
fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.png'), png512);
console.log('Created public/android-chrome-512x512.png and src/app/icon.png');

// 8. Create transparent versions for direct UI usage
const png512Transparent = renderCenteredIcon(512, 0.10, true, false);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'bllumo-icon-transparent.png'), png512Transparent);
console.log('Created public/bllumo-icon-transparent.png');
