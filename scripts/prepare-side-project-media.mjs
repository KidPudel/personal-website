/** Rebuild lightweight preview media while keeping the authored files intact. Requires ffmpeg. */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const discourses = fileURLToPath(new URL('../src/assets/games/discourses/', import.meta.url));
const snake = fileURLToPath(new URL('../src/assets/games/snake/', import.meta.url));

await sharp(`${discourses}discourses-teaser.webp`, { animated: false })
  .webp({ quality: 85, effort: 6 })
  .toFile(`${discourses}discourses-poster.webp`);

const result = spawnSync('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-i', `${snake}snake-raylib.mp4`,
  '-map', '0:v:0', '-an', '-dn', '-c:v', 'copy',
  '-map_metadata', '-1', '-movflags', '+faststart',
  `${snake}snake-raylib-silent.mp4`,
], { stdio: 'inherit' });

if (result.status !== 0) throw new Error('Side-project media preparation failed.');
console.log('Prepared side-project preview media.');
