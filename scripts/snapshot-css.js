#!/usr/bin/env node
/*
  Fetches CSS from a target site and extracts candidate design tokens.
  Outputs:
    - data/css/raw-*.css        Raw downloaded stylesheets
    - data/css/snapshot.json    Aggregated frequencies for colors, radii, shadows, fonts
*/

const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const TARGET = process.env.SITE_URL || 'https://www.skidracek.cz/';
const OUT_DIR = path.resolve(process.cwd(), 'data/css');

/** Ensures an output directory exists. */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

/** Fetches a URL and returns text. */
async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

/** Extracts stylesheet hrefs from HTML. */
function extractStylesheetUrls(html, baseUrl) {
  const hrefs = [];
  const linkRe = /<link[^>]+rel=["']stylesheet["'][^>]*>/gi;
  const hrefRe = /href=["']([^"']+)["']/i;
  const base = new URL(baseUrl);
  for (const tag of html.match(linkRe) || []) {
    const m = tag.match(hrefRe);
    if (m && m[1]) {
      const abs = new URL(m[1], base).toString();
      hrefs.push(abs);
    }
  }
  return Array.from(new Set(hrefs));
}

/** Counts occurrences in an object map. */
function addCount(map, key) {
  map[key] = (map[key] || 0) + 1;
}

/** Extracts token-like values from CSS text. */
function analyzeCss(cssText) {
  const colors = {};
  const radii = {};
  const shadows = {};
  const fonts = {};

  // Colors: hex, rgb(a), hsl(a)
  const colorRe = /(#[0-9a-fA-F]{3,8})|rgba?\([^\)]*\)|hsla?\([^\)]*\)/g;
  for (const m of cssText.match(colorRe) || []) addCount(colors, m.trim());

  // Border radius
  const radiusRe = /border-radius\s*:\s*([^;]+);/g;
  for (const m of cssText.matchAll(radiusRe)) addCount(radii, m[1].trim());

  // Box shadows
  const shadowRe = /box-shadow\s*:\s*([^;]+);/g;
  for (const m of cssText.matchAll(shadowRe)) addCount(shadows, m[1].trim());

  // Font families
  const fontRe = /font-family\s*:\s*([^;]+);/g;
  for (const m of cssText.matchAll(fontRe)) addCount(fonts, m[1].trim());

  return { colors, radii, shadows, fonts };
}

/** Merges count maps by summing values. */
function mergeCounts(target, source) {
  for (const [k, v] of Object.entries(source)) target[k] = (target[k] || 0) + v;
}

/** Sorts an object map into array of { value, count } descending. */
function topList(map) {
  return Object.entries(map)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

(async function main() {
  ensureDir(OUT_DIR);
  const html = await fetchText(TARGET);
  const cssUrls = extractStylesheetUrls(html, TARGET);
  const aggregate = { colors: {}, radii: {}, shadows: {}, fonts: {} };

  let idx = 0;
  for (const url of cssUrls) {
    try {
      const css = await fetchText(url);
      const filePath = path.join(OUT_DIR, `raw-${idx++}.css`);
      fs.writeFileSync(filePath, css, 'utf8');
      const { colors, radii, shadows, fonts } = analyzeCss(css);
      mergeCounts(aggregate.colors, colors);
      mergeCounts(aggregate.radii, radii);
      mergeCounts(aggregate.shadows, shadows);
      mergeCounts(aggregate.fonts, fonts);
    } catch (err) {
      // Skip failed stylesheet
    }
  }

  const snapshot = {
    site: TARGET,
    generatedAt: new Date().toISOString(),
    stylesheets: cssUrls,
    totals: {
      colors: Object.keys(aggregate.colors).length,
      radii: Object.keys(aggregate.radii).length,
      shadows: Object.keys(aggregate.shadows).length,
      fonts: Object.keys(aggregate.fonts).length,
    },
    top: {
      colors: topList(aggregate.colors).slice(0, 40),
      radii: topList(aggregate.radii).slice(0, 20),
      shadows: topList(aggregate.shadows).slice(0, 20),
      fonts: topList(aggregate.fonts).slice(0, 10),
    },
  };

  fs.writeFileSync(path.join(OUT_DIR, 'snapshot.json'), JSON.stringify(snapshot, null, 2));
  console.log(`Saved CSS snapshot with ${cssUrls.length} stylesheets`);
})();


