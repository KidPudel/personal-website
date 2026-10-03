import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { dither } from '../src/components/case-studies/observatory/dither.mjs';

// Observatory's archive footage, as it is: only the black letterbox bars are cut away. When the
// original GIF is given (as an argument, or saved next to the other files) it becomes a small
// silent MP4 for the page, and its first frame becomes the poster, so the two always match. The
// poster is then printed in the page's two-ink dither, the still the cover shows before the film.
//
//   node scripts/prepare-observatory-footage.mjs ~/Downloads/telescope-gif.gif
const folder = (name) => fileURLToPath(new URL(`../src/assets/case_study_images/observatory/${name}`, import.meta.url));
const source = folder('archive-telescope.webp');
const gif = process.argv[2] ?? folder('archive-telescope.gif');
const video = folder('archive-telescope.mp4');
const poster = folder('archive-telescope-frame.webp');
const still = folder('archive-telescope-dither.png');

// The picture inside the letterbox of the 480 × 360 film: x, y, width, height.
const [left, top, width, height] = [6, 21, 470, 320];

if (existsSync(gif)) {
  // H.264 in yuv420p with the moov atom first and no audio, at the GIF's own frame rate.
  execFileSync('ffmpeg', [
    '-y', '-i', gif,
    '-vf', `crop=${width}:${height}:${left}:${top}`,
    '-an', '-movflags', '+faststart', '-pix_fmt', 'yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '24',
    video,
  ], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-y', '-i', video, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '90', poster], { stdio: 'inherit' });
} else {
  await sharp(source).extract({ left, top, width, height }).webp({ quality: 90 }).toFile(poster);
}

// The dithered still: two inks, so a palette PNG of a few kilobytes.
const { data, info } = await sharp(poster).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
dither(data, info.width, info.height);
await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .removeAlpha()
  .png({ palette: true, colours: 2, compressionLevel: 9 })
  .toFile(still);
