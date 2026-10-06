import type { ImageMetadata } from 'astro';
import sharp from 'sharp';

const placeholders = new Map<string, Promise<string>>();

/**
 * A tiny copy of an image (about 200 bytes) as a data URL, made at build time
 * and painted behind the image so its place is never empty while it loads.
 * Suited to soft images, like the showcase's gradients, that read the same
 * stretched from a few pixels.
 */
export const imagePlaceholder = (image: ImageMetadata): Promise<string> => {
  const path = (image as ImageMetadata & { fsPath?: string }).fsPath;
  if (!path) throw new Error(`No source file for the placeholder of ${image.src}`);

  let placeholder = placeholders.get(path);
  if (!placeholder) {
    placeholder = sharp(path)
      .resize(24)
      .webp({ quality: 60 })
      .toBuffer()
      .then((buffer) => `data:image/webp;base64,${buffer.toString('base64')}`);
    placeholders.set(path, placeholder);
  }
  return placeholder;
};
