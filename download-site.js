const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, 'albmaitredoeuvre');
const SITE_ORIGIN = 'https://albmaitredoeuvre.fr';
const WA_TS = '20250320192107';

const PAGES = [
  '/', '/blog/', '/contact/', '/mentions-legales/',
  '/politique-de-confidentialite/', '/prestations/',
  '/realisations/', '/category/non-classe/',
  '/permis-de-construire-la-reunion/',
];

const downloaded = new Set();
const resourceQueue = [];
let failCount = 0;

function fetchBuffer(url, maxRedirects = 8) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 30000,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = new URL(loc, url).href;
        return fetchBuffer(loc, maxRedirects - 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Extract the original URL from a Web Archive URL
// e.g. "https://web.archive.org/web/20250320192107cs_/https://albmaitredoeuvre.fr/wp-content/foo.css"
// returns "https://albmaitredoeuvre.fr/wp-content/foo.css"
function extractOriginalUrl(waUrl) {
  const m = waUrl.match(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/(https?:\/\/.+)/);
  return m ? m[1] : null;
}

// Convert an original URL to a local file path
function originalUrlToLocal(origUrl) {
  if (!origUrl) return null;
  try {
    const u = new URL(origUrl);
    // Only download resources from the site itself
    if (u.hostname !== 'albmaitredoeuvre.fr') return null;
    let p = u.pathname;
    if (!p || p === '/') p = '/index.html';
    if (p.endsWith('/')) p += 'index.html';
    p = p.replace(/^\//, '');
    return p;
  } catch { return null; }
}

// Build a Web Archive download URL using id_ modifier (returns raw original content)
function buildWAUrl(origUrl, modifier = 'id_') {
  return `https://web.archive.org/web/${WA_TS}${modifier}/${origUrl}`;
}

// Extract all Web Archive URLs from HTML/CSS content
function extractWAUrls(text) {
  const urls = new Set();
  // Match full WA URLs: https://web.archive.org/web/TIMESTAMP.../https://...
  const waPattern = /https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/https?:\/\/[^\s"'<>()]+/gi;
  let m;
  while ((m = waPattern.exec(text)) !== null) {
    urls.add(m[0]);
  }
  return urls;
}

// Extract original-site relative URLs
function extractSiteUrls(text) {
  const urls = new Set();
  // Direct references to albmaitredoeuvre.fr
  const sitePattern = /https?:\/\/albmaitredoeuvre\.fr\/[^\s"'<>()]*[^\s"'<>().;,]/gi;
  let m;
  while ((m = sitePattern.exec(text)) !== null) {
    urls.add(m[0]);
  }
  return urls;
}

function isDownloadable(origUrl) {
  if (!origUrl) return false;
  try {
    const u = new URL(origUrl);
    if (u.hostname !== 'albmaitredoeuvre.fr') return false;
    // Skip API/feed endpoints
    if (u.pathname.match(/\/(feed|xmlrpc|wp-json|wp-login|wp-admin)\//)) return false;
    if (u.pathname.endsWith('.php') && !u.pathname.includes('wp-content')) return false;
    return true;
  } catch { return false; }
}

async function downloadFile(origUrl) {
  const localPath = originalUrlToLocal(origUrl);
  if (!localPath || downloaded.has(localPath)) return;
  downloaded.add(localPath);

  const fullPath = path.join(BASE_DIR, localPath);
  if (localPath.length > 250) { console.log(`  SKIP (path too long): ${localPath.slice(0, 80)}...`); return; }

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  try {
    await sleep(350);
    const waUrl = buildWAUrl(origUrl, 'id_');
    console.log(`  DL: ${localPath}`);
    const buf = await fetchBuffer(waUrl);
    fs.writeFileSync(fullPath, buf);

    // If CSS, scan for more URLs
    if (localPath.match(/\.css$/i)) {
      const text = buf.toString('utf8');
      for (const waU of extractWAUrls(text)) {
        const orig = extractOriginalUrl(waU);
        if (orig && isDownloadable(orig) && !downloaded.has(originalUrlToLocal(orig))) {
          resourceQueue.push(orig);
        }
      }
      for (const su of extractSiteUrls(text)) {
        if (isDownloadable(su) && !downloaded.has(originalUrlToLocal(su))) {
          resourceQueue.push(su);
        }
      }
    }
  } catch (err) {
    failCount++;
    if (!err.message.includes('404')) {
      console.log(`  FAIL: ${localPath} - ${err.message}`);
    } else {
      console.log(`  404: ${localPath}`);
    }
  }
}

async function downloadPage(pagePath) {
  const origUrl = `${SITE_ORIGIN}${pagePath}`;
  const localPath = originalUrlToLocal(origUrl);
  if (!localPath || downloaded.has(localPath)) return;
  downloaded.add(localPath);

  const fullPath = path.join(BASE_DIR, localPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  try {
    await sleep(500);
    // Use no modifier for HTML to get the WA-rewritten version (has full URLs we can parse)
    const waUrl = buildWAUrl(origUrl, '');
    console.log(`Page: ${pagePath}`);
    const buf = await fetchBuffer(waUrl);
    const html = buf.toString('utf8');
    fs.writeFileSync(fullPath, html, 'utf8');

    // Extract all Web Archive URLs
    for (const waU of extractWAUrls(html)) {
      const orig = extractOriginalUrl(waU);
      if (orig && isDownloadable(orig) && !downloaded.has(originalUrlToLocal(orig))) {
        resourceQueue.push(orig);
      }
    }
    // Also extract direct site URLs
    for (const su of extractSiteUrls(html)) {
      if (isDownloadable(su) && !downloaded.has(originalUrlToLocal(su))) {
        resourceQueue.push(su);
      }
    }
  } catch (err) {
    console.log(`FAIL page: ${pagePath} - ${err.message}`);
  }
}

async function main() {
  console.log('=== Downloading albmaitredoeuvre.fr from Web Archive ===\n');
  if (fs.existsSync(BASE_DIR)) fs.rmSync(BASE_DIR, { recursive: true, force: true });
  fs.mkdirSync(BASE_DIR, { recursive: true });

  // 1. Download all pages
  for (const p of PAGES) await downloadPage(p);

  // 2. Download all discovered resources
  const seen = new Set();
  console.log(`\n${resourceQueue.length} resources queued\n`);
  let count = 0;
  while (resourceQueue.length > 0) {
    const origUrl = resourceQueue.shift();
    if (seen.has(origUrl)) continue;
    seen.add(origUrl);
    await downloadFile(origUrl);
    count++;
    if (count % 50 === 0) console.log(`  ... ${count} resources processed, ${resourceQueue.length} remaining`);
  }

  console.log(`\n=== Done! ${downloaded.size} files, ${failCount} failures ===`);
}

main().catch(console.error);
