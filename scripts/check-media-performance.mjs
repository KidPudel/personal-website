import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const projectRoot = new URL('../', import.meta.url);
const sourceRoot = new URL('../src/', import.meta.url);
const failures = [];

async function collectAstroFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return collectAstroFiles(path);
      return extname(entry.name) === '.astro' ? [path] : [];
    }),
  );
  return nested.flat();
}

function lineNumber(source, index) {
  return source.slice(0, index).split('\n').length;
}

function report(file, source, match, message) {
  const projectPath = relative(projectRoot.pathname, file);
  failures.push(`${projectPath}:${lineNumber(source, match.index)} ${message}`);
}

function hasAttribute(tag, attribute) {
  return new RegExp(`\\b${attribute}(?:=|\\s|>)`).test(tag);
}

for (const file of await collectAstroFiles(sourceRoot.pathname)) {
  const source = await readFile(file, 'utf8');
  const imageTags = source.matchAll(/<(Image|img)\b[\s\S]*?>/g);

  for (const match of imageTags) {
    const [tag, kind] = match;
    const hasLoading = hasAttribute(tag, 'loading') || /\{loading\}/.test(tag);
    if (!hasLoading) report(file, source, match, `<${kind}> must declare loading="eager" or loading="lazy".`);
    if (!hasAttribute(tag, 'decoding')) report(file, source, match, `<${kind}> must declare decoding="async".`);

    if (kind === 'img') {
      if (!hasAttribute(tag, 'width') || !hasAttribute(tag, 'height')) {
        report(file, source, match, '<img> must declare intrinsic width and height.');
      }
    }

    if (/\bwidths=/.test(tag) && !/\bsizes=/.test(tag)) {
      report(file, source, match, '<Image> with responsive widths must also declare sizes.');
    }

    if (/\.gif(?:[?'"}])/i.test(tag)) {
      report(file, source, match, 'Rendered GIFs are not allowed. Use MP4/WebM with a poster.');
    }
  }

  const videoTags = source.matchAll(/<video\b[\s\S]*?>[\s\S]*?<\/video>/g);
  for (const match of videoTags) {
    const [video] = match;
    const openingTag = video.match(/<video\b[\s\S]*?>/)?.[0] ?? '';
    for (const attribute of ['poster', 'width', 'height', 'preload', 'playsinline']) {
      if (!hasAttribute(openingTag, attribute)) {
        report(file, source, match, `<video> must declare ${attribute}.`);
      }
    }

    if (!hasAttribute(openingTag, 'src') && !/<source\b[\s\S]*?\bsrc=/.test(video)) {
      report(file, source, match, '<video> needs a parser-discoverable src or <source src> in the HTML.');
    }

    if (hasAttribute(openingTag, 'autoplay') && !hasAttribute(openingTag, 'data-critical-media')) {
      report(file, source, match, 'Autoplay is reserved for explicitly reviewed data-critical-media.');
    }

    if (/\bpreload=["']auto["']/.test(openingTag) && !hasAttribute(openingTag, 'data-critical-media')) {
      report(file, source, match, 'preload="auto" is reserved for explicitly reviewed data-critical-media.');
    }
  }

  const highPriorityCount = [...source.matchAll(/fetchpriority=["']high["']/g)].length;
  if (highPriorityCount > 1) {
    failures.push(`${relative(projectRoot.pathname, file)} has ${highPriorityCount} high-priority media requests; use at most one.`);
  }
}

if (failures.length) {
  console.error('Media performance contract failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log('Media performance contract passed.');
}
