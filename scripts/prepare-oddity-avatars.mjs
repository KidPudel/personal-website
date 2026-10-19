import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// Stand-in friends for the "Did I already send this?" oddity: Igor's own doodles, trimmed and
// centred so each fills an avatar circle the way a profile photo would. The share sheet on the site
// never shows real people. The originals in src/assets/art/doodles stay untouched.
//
// node scripts/prepare-oddity-avatars.mjs

const doodles = {
  bird: 'Doodles_bird_1.png',
  fish: 'Doodles_fish_1.png',
  robot: 'Doodles_robot.png',
  camera: 'Doodles_camera.png',
  burger: 'Doodles_burger.png',
  campfire: 'Doodles_campfire.png',
};

const size = 192;
// How much of the circle the drawing may fill, so its corners stay inside the round crop.
const fill = 0.6;

for (const [name, file] of Object.entries(doodles)) {
  const input = fileURLToPath(new URL(`../src/assets/art/doodles/${file}`, import.meta.url));
  const trimmed = await sharp(input).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
  const scale = (size * fill) / Math.max(trimmed.info.width, trimmed.info.height);
  const width = Math.round(trimmed.info.width * scale);
  const height = Math.round(trimmed.info.height * scale);
  const drawing = await sharp(trimmed.data).resize(width, height).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: drawing, left: Math.round((size - width) / 2), top: Math.round((size - height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(fileURLToPath(new URL(`../src/assets/oddities/already-sent/avatars/${name}.png`, import.meta.url)));
}
