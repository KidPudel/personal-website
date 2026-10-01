import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// Remove only fully transparent outer pixels. Preserve every visible pixel and the originals.
for (const name of ['menu-light', 'dish-sheet-light', 'checkout']) {
  const source = fileURLToPath(new URL(`../src/assets/case_study_images/supergood/${name}.png`, import.meta.url));
  const output = fileURLToPath(new URL(`../src/assets/case_study_images/supergood/${name}-hero.png`, import.meta.url));
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let left = info.width;
  let top = info.height;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * info.channels + info.channels - 1] === 0) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }
  if (right < left) throw new Error(`No visible pixels in ${name}`);
  await sharp(source).extract({ left, top, width: right - left + 1, height: bottom - top + 1 }).png().toFile(output);
}
