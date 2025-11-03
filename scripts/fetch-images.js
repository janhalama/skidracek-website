#!/usr/bin/env node
/*
  Downloads images referenced by the target site's HTML and stylesheets.
  Saves under public/images/original/ preserving filename (with simple dedupe).
*/
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const SITE_URL = process.env.SITE_URL || 'https://www.skidracek.cz/';
const OUT_DIR = path.resolve(process.cwd(), 'public/images/original');

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }
async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  return await res.text();
}
async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function absolutize(resource, baseUrl) {
  const base = new URL(baseUrl);
  return new URL(resource, base).toString();
}

function unique(arr) { return Array.from(new Set(arr)); }

function extractImgSrcs(html, baseUrl) {
  const srcs = [];
  const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  for (const m of html.matchAll(imgRe)) srcs.push(absolutize(m[1], baseUrl));
  return srcs;
}

function extractStylesheetUrls(html, baseUrl) {
  const hrefs = [];
  const linkRe = /<link[^>]+rel=["']stylesheet["'][^>]*>/gi;
  const hrefRe = /href=["']([^"']+)["']/i;
  for (const tag of html.match(linkRe) || []) {
    const m = tag.match(hrefRe);
    if (m && m[1]) hrefs.push(absolutize(m[1], baseUrl));
  }
  return hrefs;
}

function extractCssImageUrls(cssText, baseUrl) {
  const urls = [];
  const urlRe = /url\(([^)]+)\)/g;
  for (const m of cssText.matchAll(urlRe)) {
    const raw = m[1].trim().replace(/^['"]|['"]$/g, '');
    if (!raw || raw.startsWith('data:')) continue;
    urls.push(absolutize(raw, baseUrl));
  }
  return urls;
}

function looksLikeImage(u) {
  return /(\.png|\.jpe?g|\.webp|\.svg)(\?.*)?$/i.test(u);
}

function sanitizeFilename(u) {
  try {
    const parsed = new URL(u);
    const name = path.basename(parsed.pathname);
    return name.replace(/[^a-zA-Z0-9._-]/g, '_');
  } catch { return 'file'; }
}

async function main() {
  ensureDir(OUT_DIR);
  const html = await fetchText(SITE_URL);
  const stylesheetUrls = extractStylesheetUrls(html, SITE_URL);
  const htmlImgs = extractImgSrcs(html, SITE_URL).filter(looksLikeImage);

  let cssImgs = [];
  for (const cssUrl of stylesheetUrls) {
    try {
      const css = await fetchText(cssUrl);
      const urls = extractCssImageUrls(css, cssUrl).filter(looksLikeImage);
      cssImgs.push(...urls);
    } catch { /* ignore stylesheet errors */ }
  }

  const all = unique([...htmlImgs, ...cssImgs]);
  let downloaded = 0;
  const seenNames = new Set();

  for (const url of all) {
    try {
      const buf = await fetchBuffer(url);
      let filename = sanitizeFilename(url);
      // avoid overwrites
      while (seenNames.has(filename) || fs.existsSync(path.join(OUT_DIR, filename))) {
        const ext = path.extname(filename);
        const base = path.basename(filename, ext);
        filename = `${base}_dup${ext}`;
      }
      seenNames.add(filename);
      fs.writeFileSync(path.join(OUT_DIR, filename), buf);
      downloaded++;
    } catch { /* skip failed image */ }
  }

  console.log(`Saved ${downloaded} images to ${OUT_DIR}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
