/** Rebuild web derivatives without changing the authored recordings. Requires ffmpeg. */
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const directory = fileURLToPath(new URL('../src/assets/case_study_images/instagram-saves-redesign/showcase-videos/', import.meta.url));
mkdirSync(`${directory}web`, { recursive: true });
const films = [ ['01-easier-save', 10], ['02-flexible-management', 5], ['03-search-and-filter', 5] ];
function ffmpeg(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Instagram media preparation failed.');
}
for (const [name, posterTime] of films) {
  for (const width of [540, 720]) {
    ffmpeg(['-i', `${directory}${name}.mp4`, '-map', '0:v:0', '-an',
      '-vf', `scale=${width}:-2:flags=lanczos:out_range=tv`, '-c:v', 'libx264',
      '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
      '-map_metadata', '-1', `${directory}web/${name}-${width}.mp4`]);
  }
  ffmpeg(['-ss', String(posterTime), '-i', `${directory}${name}.mp4`, '-frames:v', '1',
    '-vf', 'scale=720:-2:flags=lanczos', `${directory}web/${name}-poster.png`]);
  console.log(`Prepared ${name}`);
}
