// Builds the ZIP files buyers download.
//
//   node scripts/build-downloads.mts          (or: npm run downloads)
//
// 1. Copies each playbook's HTML from the kit source folder into private/products/,
//    stripping the kit-wide navigation (its links would be dead inside a ZIP) and
//    applying known fixes.
// 2. Packs each product (and the complete series) into a ZIP with a start-here guide,
//    a README and the licence, and writes private/downloads/manifest.json.
// 3. Writes the free sample (the SaaS Type Classifier) to public/free/.
//
// private/ is gitignored: the repo is public and these are the paid files. The free
// sample is meant to be public, so it lives in public/ and ships with the site.
//
// Env: KIT_SRC (kit folder, default ../SaaS_Starter_Kit).

import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { deflateRawSync } from "node:zlib";
import { getPackage, packages, type DownloadPackage, type Manifest, type ManifestFile } from "../lib/downloads.ts";
import { formatPrice, getProduct, partLabel, seriesTotal } from "../lib/products.ts";
import { site } from "../lib/site.ts";

const ROOT = resolve(import.meta.dirname, "..");
const KIT_SRC = process.env.KIT_SRC ?? resolve(ROOT, "..", "SaaS_Starter_Kit");
const PRODUCTS_DIR = join(ROOT, "private", "products");
const OUT_DIR = join(ROOT, "private", "downloads");
const FREE_DIR = join(ROOT, "public", "free");
const VERSION = "1.0";

const log = (msg: string) => console.log(msg);

/* ── 1. Prepare the HTML sources ─────────────────────────────────── */

/** Removes the kit-wide top bar and fixes known issues in a playbook page. */
function preparePage(html: string, srcName: string) {
  let out = html;

  // The kit-wide navigation links to sibling files that are not in a single ZIP.
  out = out.replace(/<header[^>]*class="topbar1?"[^>]*>[\s\S]*?<\/header>\s*/gi, "");

  // A template literal nested inside a plain string printed "${item.note}" verbatim.
  if (srcName === "section01-budget-stack.html") {
    out = out.replace(
      "' <span style=\"color:var(--ink4);font-size:10px\">(${item.note})</span>'",
      "' <span style=\"color:var(--ink4);font-size:10px\">(' + item.note + ')</span>'",
    );
  }

  return out;
}

function prepareSources() {
  rmSync(PRODUCTS_DIR, { recursive: true, force: true });
  mkdirSync(PRODUCTS_DIR, { recursive: true });
  const seen = new Set<string>();
  for (const pkg of packages) {
    for (const file of pkg.files) {
      if (seen.has(file.name)) continue;
      seen.add(file.name);
      const src = join(KIT_SRC, file.src);
      if (!existsSync(src)) throw new Error(`Missing kit file: ${src}`);
      const html = preparePage(readFileSync(src, "utf8"), file.src);
      writeFileSync(join(PRODUCTS_DIR, file.name), html, "utf8");
      log(`prepared  ${file.name}`);
    }
  }
}

/* ── 2. Guides, licence, ZIP ─────────────────────────────────────── */

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function licenseText(pkg: DownloadPackage) {
  return `${pkg.folder}
Licence (version ${VERSION})

This licence is granted by ${site.name} (${site.owner}) to the person who purchased this product.

You may
- Use the files for your own projects, companies and clients, without limit.
- Keep copies on any devices you own and print them for your own use.
- Adapt the templates, scripts and prompts for your own work.

You may not
- Share, resell, sublicense or redistribute the files, in whole or in part, or make them available to others, including in shared drives, communities or courses.
- Republish the content, adapted or not, as your own product.
- Remove this licence or the copyright notices.

No warranty
The playbooks share opinions and frameworks from ${site.owner}'s own product work. They are provided as is, without any warranty. Results depend on how you apply them. Nothing in the playbooks is legal, tax or financial advice; the Legal and Legal-ish playbook in particular gives templates and checklists for first drafts, and a qualified professional should review any legal document before you rely on it.

Questions
${site.email}
${site.links.linkedin}

Copyright ${new Date().getFullYear()} ${site.name}. All rights reserved.
`;
}

function readmeText(pkg: DownloadPackage, files: { name: string; label: string }[]) {
  const lines = [
    pkg.folder,
    `Version ${VERSION}. Built ${new Date().toISOString().slice(0, 10)}.`,
    "",
    "Start with \"Start here.html\". It links to everything in this folder.",
    "",
    "What is in this folder",
    ...files.map((f) => `- ${f.name}: ${f.label}`),
    "- LICENSE.txt: what you can and cannot do with these files.",
    "",
    "How to use the playbooks",
    "1. Unzip the folder anywhere on your computer (keep the files together).",
    "2. Double-click a .html file. It opens in your browser (Chrome, Edge, Safari or Firefox) and works offline.",
    "3. The pages are interactive: fill in the quizzes, tick the checklists and copy the scripts and prompts.",
    "4. Your ticks and answers are saved in your browser, so you can close a page and pick up where you left off.",
    "5. Want a paper copy of a page? Use your browser's print command.",
    "",
    "Note: the exact typefaces load from Google Fonts when you are online. Offline, your browser uses a similar built-in font.",
    "",
    "Support",
    `Email ${site.email} or message ${site.owner} on LinkedIn: ${site.links.linkedin}`,
    "",
    `${site.name}`,
  ];
  return lines.join("\n") + "\n";
}

function startHereHtml(pkg: DownloadPackage, files: { name: string; label: string }[]) {
  const learn = pkg.products
    .map((p) => {
      const items = p.learn.map((l) => `<li>${escapeHtml(l)}</li>`).join("");
      const heading = pkg.isBundle ? `<h3><span>${partLabel(p.part)}</span> ${escapeHtml(p.title)}</h3>` : "";
      return `${heading}<ul>${items}</ul>`;
    })
    .join("");

  const fileCards = files
    .map(
      (f) => `
      <li class="file">
        <div>
          <a class="name" href="${encodeURI(f.name)}">${escapeHtml(f.name)}</a>
          <p>${escapeHtml(f.label)}</p>
        </div>
        <a class="open" href="${encodeURI(f.name)}">Open</a>
      </li>`,
    )
    .join("");

  const price = pkg.isBundle ? `${formatPrice(99)} for the series (${formatPrice(seriesTotal)} separately)` : formatPrice(pkg.products[0].price);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Start here: ${escapeHtml(pkg.folder)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
<style>
  :root { --paper:#faf9f6; --surface:#fff; --ink:#141416; --ink2:#45454d; --ink3:#6c6c75; --line:#e6e3dc; --accent:#2b50d8; --soft:#eef1fd; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--ink); font: 16px/1.6 "Hanken Grotesk", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
  main { max-width: 760px; margin: 0 auto; padding: 56px 24px 80px; }
  .brand { font-weight: 600; letter-spacing: -0.01em; } .brand span { color: var(--accent); }
  .eyebrow { margin: 40px 0 10px; font-size: 12px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); }
  h1 { font: 600 clamp(2rem, 5.5vw, 3rem)/1.08 "Hanken Grotesk", system-ui, sans-serif; letter-spacing: -0.025em; margin: 0 0 14px; }
  h2 { font: 600 1.45rem/1.2 "Hanken Grotesk", system-ui, sans-serif; letter-spacing: -0.01em; margin: 48px 0 14px; }
  h3 { font: 600 15px/1.3 "Hanken Grotesk", system-ui, sans-serif; margin: 26px 0 8px; } h3 span { color: var(--ink3); font-weight: 500; margin-right: 6px; }
  p { color: var(--ink2); margin: 0 0 12px; }
  ul { padding-left: 20px; color: var(--ink2); } li { margin: 6px 0; }
  .meta { display: flex; flex-wrap: wrap; gap: 8px 18px; font-size: 14px; color: var(--ink3); }
  .files { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
  .file { display: flex; align-items: center; justify-content: space-between; gap: 16px; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 14px 16px; }
  .file p { margin: 2px 0 0; font-size: 14px; }
  .name { font-weight: 600; color: var(--ink); text-decoration: none; } .name:hover { color: var(--accent); }
  .open { flex: none; font-size: 13px; font-weight: 600; color: var(--accent); background: var(--soft); border-radius: 999px; padding: 6px 12px; text-decoration: none; }
  .steps { counter-reset: step; list-style: none; padding: 0; } .steps li { counter-increment: step; position: relative; padding-left: 40px; margin: 12px 0; }
  .steps li::before { content: counter(step); position: absolute; left: 0; top: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--ink); color: #fff; font-size: 13px; font-weight: 600; display: grid; place-items: center; }
  .note { background: var(--surface); border: 1px dashed #d6d2c9; border-radius: 14px; padding: 16px 18px; font-size: 14.5px; }
  a { color: var(--accent); }
  footer { margin-top: 56px; padding-top: 20px; border-top: 1px solid var(--line); font-size: 13px; color: var(--ink3); }
</style>
</head>
<body>
<main>
  <div class="brand">Modawal<span>Labs</span></div>
  <p class="eyebrow">${pkg.isBundle ? "The Road to MVP, complete series" : `The Road to MVP, ${escapeHtml(partLabel(pkg.products[0].part))}`}</p>
  <h1>${escapeHtml(pkg.title)}</h1>
  <p>${escapeHtml(pkg.isBundle ? "All seven playbooks, from choosing a stack to launch week." : pkg.products[0].tagline)}</p>
  <div class="meta"><span>Version ${VERSION}</span><span>${price}</span><span>Licensed to you, the purchaser</span></div>

  <h2>What is in this folder</h2>
  <ul class="files">${fileCards}</ul>
  <p style="margin-top:12px;font-size:14px">Each playbook is an interactive .html file. LICENSE.txt and README.txt sit next to them.</p>

  <h2>How to use it</h2>
  <ol class="steps">
    <li>Keep the files together in this folder (unzipped).</li>
    <li>Open a playbook by clicking its name above, or double-click the .html file. It opens in your browser and works offline.</li>
    <li>The pages are interactive: answer the quizzes, tick the checklists and copy the scripts and prompts straight into your tools.</li>
    <li>Your ticks and answers are saved in your browser, so you can close a page and pick up where you left off.</li>
    <li>Want a paper copy of a page? Use your browser's print command.</li>
  </ol>
  <div class="note">The exact typefaces load from Google Fonts while you are online. Offline, your browser substitutes a similar built-in font; everything else works the same.</div>

  <h2>What you will learn</h2>
  ${learn}

  <h2>Questions?</h2>
  <p>Email <a href="mailto:${site.email}">${site.email}</a> or message ${escapeHtml(site.owner)} on <a href="${site.links.linkedin}">LinkedIn</a>.</p>

  <footer>Copyright ${new Date().getFullYear()} ${site.name}. Personal licence: use it for your own projects, do not share or resell. See LICENSE.txt.</footer>
</main>
</body>
</html>
`;
}

/* Minimal ZIP writer (deflate, UTF-8 names). */
const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buf: Buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function dosDateTime(d: Date) {
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  return { time, date };
}

type ZipEntry = { name: string; data: Buffer };

function zip(entries: ZipEntry[], stamp = new Date()) {
  const { time, date } = dosDateTime(stamp);
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.name, "utf8");
    const deflated = deflateRawSync(entry.data, { level: 9 });
    const useDeflate = deflated.length < entry.data.length;
    const body = useDeflate ? deflated : entry.data;
    const method = useDeflate ? 8 : 0;
    const crc = crc32(entry.data);

    const local = Buffer.alloc(30 + name.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(entry.data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    name.copy(local, 30);

    const central = Buffer.alloc(46 + name.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(method, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(date, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(entry.data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    name.copy(central, 46);

    locals.push(local, body);
    centrals.push(central);
    offset += local.length + body.length;
  }

  const centralSize = centrals.reduce((n, b) => n + b.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...locals, ...centrals, end]);
}

function buildPackages() {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });
  const manifest: Manifest = { builtAt: new Date().toISOString(), packages: {} };

  for (const pkg of packages) {
    const files = pkg.files.map((f) => ({ name: f.name, label: f.label }));
    const entries: ZipEntry[] = [];
    const listed: ManifestFile[] = [];
    const add = (name: string, data: Buffer, kind: ManifestFile["kind"]) => {
      entries.push({ name: `${pkg.folder}/${name}`, data });
      listed.push({ name, bytes: data.length, kind });
    };

    add("Start here.html", Buffer.from(startHereHtml(pkg, files), "utf8"), "guide");
    for (const f of files) add(f.name, readFileSync(join(PRODUCTS_DIR, f.name)), "html");
    add("README.txt", Buffer.from(readmeText(pkg, files), "utf8"), "text");
    add("LICENSE.txt", Buffer.from(licenseText(pkg), "utf8"), "text");

    const archive = zip(entries);
    writeFileSync(join(OUT_DIR, `${pkg.slug}.zip`), archive);
    manifest.packages[pkg.slug] = { zipName: pkg.zipName, bytes: archive.length, builtAt: manifest.builtAt, files: listed };
    log(`packed    ${pkg.slug}.zip (${Math.round(archive.length / 1024)} KB, ${entries.length} files)`);
  }

  writeFileSync(join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  log(`manifest  ${Object.keys(manifest.packages).length} packages`);
}

/* ── 3. Free sample ──────────────────────────────────────────────── */

/** The classifier from Part 01, with a slim banner that leads back to the full playbook. */
function buildFreeSample() {
  const product = getProduct("choose-your-stack");
  const file = getPackage("choose-your-stack")?.files.find((f) => f.src === "section01-saas-type-classifier.html");
  if (!product || !file) throw new Error("The free sample needs choose-your-stack and its classifier file");

  const others = product.includes.filter((item) => !item.startsWith("SaaS Type Classifier"));
  const banner = `<div style="background:#141416;color:rgba(255,255,255,0.78);font:400 13.5px/1.55 'DM Sans',system-ui,sans-serif;padding:11px 20px;text-align:center">
  Free sample from <strong style="color:#fff;font-weight:500">Road to MVP, ${escapeHtml(partLabel(product.part))}: ${escapeHtml(product.title)}</strong>. The full playbook adds the ${others.map(escapeHtml).join(" and the ")}.
  <a href="/products/${product.slug}" style="margin-left:6px;color:#e8c170;font-weight:500;text-decoration:none;white-space:nowrap">Get the full playbook, ${formatPrice(product.price)} &rarr;</a>
</div>`;

  let html = readFileSync(join(PRODUCTS_DIR, file.name), "utf8");
  html = html.replace(/<title>[\s\S]*?<\/title>/i, "<title>SaaS Type Classifier (free sample) · Road to MVP</title>");
  html = html.replace(/<body[^>]*>/i, (tag) => `${tag}\n${banner}`);
  mkdirSync(FREE_DIR, { recursive: true });
  writeFileSync(join(FREE_DIR, "saas-type-classifier.html"), html, "utf8");
  log("free      public/free/saas-type-classifier.html");
}

/* ── Run ─────────────────────────────────────────────────────────── */

log(`kit source: ${KIT_SRC}`);
if (!existsSync(KIT_SRC)) throw new Error(`Kit folder not found: ${KIT_SRC} (set KIT_SRC)`);
prepareSources();
buildPackages();
buildFreeSample();
const total = packages.reduce((n, p) => n + statSync(join(OUT_DIR, `${p.slug}.zip`)).size, 0);
log(`done: ${packages.length} ZIPs, ${(total / 1024).toFixed(0)} KB in ${OUT_DIR}`);
