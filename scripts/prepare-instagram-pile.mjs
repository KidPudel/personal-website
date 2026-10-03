/**
 * The pile of saves: the prototype's saved posts (public/instagram-showcase/thumbnails), without
 * the profile pictures, in one sprite of small tiles. One request for the whole wall on the
 * Instagram Saves cover, and the paper of its frames. The tile order is written beside it, so the
 * page can find a post by name.
 *
 *   node scripts/prepare-instagram-pile.mjs
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = fileURLToPath(new URL('../public/instagram-showcase/thumbnails/', import.meta.url));
const target = fileURLToPath(new URL('../src/assets/case_study_images/instagram-saves-redesign/pile/', import.meta.url));
const [tileWidth, tileHeight, columns] = [160, 200, 9];

const names = readdirSync(source).filter((name) => name.endsWith('.webp') && !name.startsWith('profile-')).sort();
const rows = Math.ceil(names.length / columns);
const tiles = await Promise.all(names.map(async (name, index) => ({
  input: await sharp(`${source}${name}`).resize(tileWidth, tileHeight, { fit: 'cover' }).toBuffer(),
  left: (index % columns) * tileWidth,
  top: Math.floor(index / columns) * tileHeight,
})));

await sharp({ create: { width: columns * tileWidth, height: rows * tileHeight, channels: 3, background: '#f2f2f0' } })
  .composite(tiles)
  .webp({ quality: 64 })
  .toFile(`${target}pile.webp`);

writeFileSync(`${target}pile.json`, `${JSON.stringify({ tileWidth, tileHeight, columns, rows, names: names.map((name) => name.replace('.webp', '')) }, null, 2)}\n`);
console.log(`Pile: ${names.length} saves, ${columns} × ${rows}.`);
