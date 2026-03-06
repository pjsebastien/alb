const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, 'albmaitredoeuvre');

function findHtmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...findHtmlFiles(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function cleanPass2(html) {
  let h = html;

  // Remove inline script blocks that contain WP AJAX/REST config
  // These are WP-specific and won't work locally
  h = h.replace(/<script[^>]*>\s*(?:\/\*[\s\S]*?\*\/\s*)?var\s+(?:stackable|accordions_ajax|cnArgs|wpcf7|cv_client)\s*=[\s\S]*?<\/script>\s*/gi, '');

  // Clean escaped WA URLs in remaining inline scripts
  h = h.replace(/https?:\\\/\\\/web\.archive\.org\\\/web\\\/\d+[a-z_]*\\\/https?:\\\/\\\/albmaitredoeuvre\.fr\\\//g, '/');
  h = h.replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/https?:\/\/albmaitredoeuvre\.fr\//g, '/');

  // Clean remaining WA URLs in any context (non-escaped)
  h = h.replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/(https?:\/\/)/g, '$1');

  // Remove cookie notice div and related scripts (won't work without the plugin)
  h = h.replace(/<div id="cookie-notice"[\s\S]*?<\/div>\s*<\/div>/gi, '');

  // Remove side-menu plugin markup
  h = h.replace(/<div class="wowp-side-menu[\s\S]*?<\/div>\s*<\/div>/gi, '');

  // Remove remaining empty script blocks
  h = h.replace(/<script[^>]*>\s*<\/script>\s*/gi, '');

  // Remove WP generator meta
  h = h.replace(/<meta name="generator" content="WordPress[^"]*"\s*\/?>\s*/gi, '');

  // Remove multiple consecutive newlines
  h = h.replace(/\n{3,}/g, '\n\n');

  return h;
}

const htmlFiles = findHtmlFiles(BASE_DIR);
for (const file of htmlFiles) {
  const rel = path.relative(BASE_DIR, file);
  const html = fs.readFileSync(file, 'utf8');
  const cleaned = cleanPass2(html);
  if (cleaned !== html) {
    console.log(`Cleaned: ${rel}`);
    fs.writeFileSync(file, cleaned, 'utf8');
  }
}

// Verify no WA references remain
let totalRemaining = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const matches = html.match(/web\.archive\.org/g);
  if (matches) {
    console.log(`WARNING: ${path.relative(BASE_DIR, file)} still has ${matches.length} WA references`);
    totalRemaining += matches.length;
  }
}
console.log(`\nTotal remaining WA references: ${totalRemaining}`);
