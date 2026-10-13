import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// Screens for the SuperGood and Two Sticks work cards on the homepage, derived from the case
// studies' screenshots (the originals stay untouched):
//
// - supergood-history.png: the History screen with its orders marked delivered instead of
//   cancelled, since the card repeats one of them. Set in Inter Bold, which must be installed.
// - supergood-menu.png: the menu's screen without its device, and without the cart bar and the
//   button under it. The card draws the bar live, so it can fill with the repeated order.
// - two-sticks-sheet.png and two-sticks-sheet-blank.png: the handwriting Web App's sheet from
//   write.png, as it was written and checked, and with the canvas and the score still empty.
//
// node scripts/prepare-showcase-screens.mjs

const source = (path) => fileURLToPath(new URL(`../src/assets/case_study_images/${path}`, import.meta.url));
const output = (name) => fileURLToPath(new URL(`../src/assets/showcase-cards/${name}`, import.meta.url));
const rect = (width, height, fill) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${fill}"/></svg>`,
);

// Dark pixels in a box: where a line of text sits.
async function inkBox(file, box) {
  const { data, info } = await sharp(file).extract(box).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let left = info.width, top = info.height, right = -1, bottom = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      if (data[i] + data[i + 1] + data[i + 2] > 240) continue;
      left = Math.min(left, x); top = Math.min(top, y); right = Math.max(right, x); bottom = Math.max(bottom, y);
    }
  }
  if (right < 0) throw new Error(`No text in ${JSON.stringify(box)}`);
  return { left: box.left + left, top: box.top + top, width: right - left + 1, height: bottom - top + 1 };
}

// ---- SuperGood History: "Отменен" becomes "Доставлен" on all three orders ----
{
  const file = source('supergood/history.png');
  const layers = [];
  for (const y of [160, 283, 856]) {
    const ink = await inkBox(file, { left: 214, top: y, width: 200, height: 34 });
    // "Отменен" has no descenders, so its ink height is the cap height (Inter: 0.727 em).
    const size = ink.height / 0.727;
    // The order card's own paper, just right of the word.
    const { data } = await sharp(file).extract({ left: ink.left + ink.width + 14, top: ink.top + 4, width: 1, height: 1 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const paper = `rgb(${data[0]} ${data[1]} ${data[2]})`;
    layers.push(
      { input: rect(ink.width + 8, ink.height + 8, paper), left: ink.left - 4, top: ink.top - 4 },
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="${Math.ceil(size * 1.4)}">` +
            `<text x="0" y="${(ink.height + size * 0.2).toFixed(2)}" font-family="Inter" font-weight="700" font-size="${size.toFixed(2)}" fill="#0b0b0c" letter-spacing="-0.1">Доставлен</text></svg>`,
        ),
        left: ink.left,
        top: Math.round(ink.top - size * 0.2),
      },
    );
  }
  await sharp(file).composite(layers).png().toFile(output('supergood-history.png'));
}

// ---- SuperGood menu: the screen alone, the bar's place left to the card's own paper ----
{
  const screen = { left: 77, top: 34, width: 448, height: 988 };
  await sharp(source('supergood/menu-light.png'))
    .extract(screen)
    .composite([{ input: rect(402, 76, 'rgb(248 245 238)'), left: 100 - screen.left, top: 892 - screen.top }])
    .png()
    .toFile(output('supergood-menu.png'));
}

// ---- Two Sticks: the handwriting sheet, written and blank ----
{
  const sheet = { left: 72, top: 178, width: 706, height: 1534 };
  const written = await sharp(source('two-sticks/write.png')).extract(sheet).png().toBuffer();
  await sharp(written).toFile(output('two-sticks-sheet.png'));
  await sharp(written)
    .composite([
      // The canvas, before the first stroke.
      { input: rect(462, 477, '#fff'), left: 193 - sheet.left, top: 570 - sheet.top },
      // The score, before "Проверить".
      { input: rect(520, 90, 'rgb(212 183 141)'), left: 170 - sheet.left, top: 1210 - sheet.top },
    ])
    .png()
    .toFile(output('two-sticks-sheet-blank.png'));
}
