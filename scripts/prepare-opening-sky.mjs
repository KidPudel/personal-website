/**
 * The homepage's opening sky in AV1, beside the H.264 files every browser can play. Browsers that
 * decode AV1 take these, at about half the bytes; the rest fall back to H.264. Made from the
 * original sky video. The dither in the sky is fine noise, the kind codecs save space by removing,
 * so the quality is set where its dots still survive (CRF 30); a smaller file smooths them away.
 * Requires ffmpeg with SVT-AV1.
 *
 *   node scripts/prepare-opening-sky.mjs
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const art = (name) => fileURLToPath(new URL(`../src/assets/art/${name}`, import.meta.url));
const source = art('dithered sky.mp4');

const encode = (output, scale, fps) => execFileSync('ffmpeg', [
  '-y', '-v', 'error', '-i', source,
  '-an', '-vf', `scale=${scale}:flags=lanczos,fps=${fps}`,
  '-c:v', 'libsvtav1', '-preset', '4', '-crf', '30', '-g', '240',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  art(output),
], { stdio: 'inherit' });

// The same sizes and frame rates as the H.264 files they stand in for.
encode('dithered-sky-av1.mp4', '1280:720', '24000/1001');
encode('dithered-sky-mobile-av1.mp4', '640:360', '15');
