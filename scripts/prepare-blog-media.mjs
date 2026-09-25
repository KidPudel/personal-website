/** Rebuild blog video derivatives without changing the authored recordings. Requires ffmpeg. */
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const directory = fileURLToPath(new URL('../src/assets/blog-assets/', import.meta.url));
mkdirSync(`${directory}web`, { recursive: true });
// The sound is the subject of these films, so the audio track is kept.
const films = [['sound-filter-world', 10]];
function ffmpeg(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Blog media preparation failed.');
}
for (const [name, posterTime] of films) {
  for (const height of [720, 1080]) {
    ffmpeg(['-i', `${directory}${name}.mp4`, '-map', '0:v:0', '-map', '0:a:0',
      '-vf', `scale=-2:${height}:flags=lanczos`, '-c:v', 'libx264',
      '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k',
      '-movflags', '+faststart', '-map_metadata', '-1', `${directory}web/${name}-${height}.mp4`]);
  }
  ffmpeg(['-ss', String(posterTime), '-i', `${directory}${name}.mp4`, '-frames:v', '1',
    '-vf', 'scale=1280:-2:flags=lanczos', `${directory}web/${name}-poster.png`]);
  console.log(`Prepared ${name}`);
}
