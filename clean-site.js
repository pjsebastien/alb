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

function cleanHtml(html, filePath) {
  let h = html;

  // 1. Remove Web Archive injected scripts and styles at the top
  // Remove everything from <script src="//archive.org to <!-- End Wayback Rewrite JS Include -->
  h = h.replace(/<script src="\/\/archive\.org[\s\S]*?<!-- End Wayback Rewrite JS Include -->\s*/gi, '');

  // Remove any remaining WA toolbar/scripts
  h = h.replace(/<!-- BEGIN WAYBACK TOOLBAR INSERT -->[\s\S]*?<!-- END WAYBACK TOOLBAR INSERT -->/gi, '');
  h = h.replace(/<script[^>]*src="[^"]*web-static\.archive\.org[^"]*"[^>]*><\/script>\s*/gi, '');
  h = h.replace(/<script[^>]*src="[^"]*archive\.org[^"]*"[^>]*><\/script>\s*/gi, '');
  h = h.replace(/<link[^>]*href="[^"]*web-static\.archive\.org[^"]*"[^>]*\/?>\s*/gi, '');
  h = h.replace(/<script[^>]*>[\s\S]*?__wm\.init[\s\S]*?<\/script>\s*/gi, '');
  h = h.replace(/<script[^>]*>[\s\S]*?window\.RufflePlayer[\s\S]*?<\/script>\s*/gi, '');
  h = h.replace(/<script[^>]*>[\s\S]*?archive_analytics[\s\S]*?<\/script>\s*/gi, '');
  h = h.replace(/<!--\s*FILE ARCHIVED ON[\s\S]*?-->\s*/gi, '');

  // Remove WA playback div
  h = h.replace(/<div id="wm-ipp-base"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*/gi, '');

  // 2. Fix all links: replace WA URLs with local relative paths
  // Pattern: https://web.archive.org/web/TIMESTAMP[modifier]/https://albmaitredoeuvre.fr/PATH
  h = h.replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/https?:\/\/albmaitredoeuvre\.fr\//g, function(match) {
    // Extract the path
    const m = match.match(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/https?:\/\/albmaitredoeuvre\.fr\/(.*)/);
    const afterSlash = m ? m[1] : '';
    // Calculate relative path from current file to root
    const rel = path.relative(path.dirname(filePath), BASE_DIR).replace(/\\/g, '/');
    const prefix = rel ? rel + '/' : '';
    return prefix + afterSlash;
  });

  // Also handle the base site URL without trailing content
  h = h.replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/https?:\/\/albmaitredoeuvre\.fr(?=["'\s<>])/g, function() {
    const rel = path.relative(path.dirname(filePath), BASE_DIR).replace(/\\/g, '/');
    return rel ? rel + '/' : './';
  });

  // 3. Fix remaining external WA URLs (like schema.org, facebook, linkedin etc)
  h = h.replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/(https?:\/\/)/g, '$1');

  // 4. Fix direct albmaitredoeuvre.fr references (not going through WA)
  h = h.replace(/https?:\/\/albmaitredoeuvre\.fr\//g, function() {
    const rel = path.relative(path.dirname(filePath), BASE_DIR).replace(/\\/g, '/');
    return (rel ? rel + '/' : './');
  });

  // 5. Remove all old <link rel="stylesheet"> and <script src=""> that point to missing WP resources
  // We'll add our own CSS
  h = h.replace(/<link[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']*wp-content[^"']*["'][^>]*\/?>\s*/gi, '');
  h = h.replace(/<link[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']*wp-includes[^"']*["'][^>]*\/?>\s*/gi, '');
  h = h.replace(/<link[^>]*href=["'][^"']*wp-content[^"']*["'][^>]*rel=["']stylesheet["'][^>]*\/?>\s*/gi, '');
  h = h.replace(/<link[^>]*href=["'][^"']*fonts\.googleapis\.com[^"']*["'][^>]*\/?>\s*/gi, '');

  // Remove script tags pointing to missing WP resources
  h = h.replace(/<script[^>]*src=["'][^"']*wp-content[^"']*["'][^>]*><\/script>\s*/gi, '');
  h = h.replace(/<script[^>]*src=["'][^"']*wp-includes[^"']*["'][^>]*><\/script>\s*/gi, '');
  h = h.replace(/<script[^>]*src=["'][^"']*wp-emoji[^"']*["'][^>]*><\/script>\s*/gi, '');

  // Remove inline WP emoji script
  h = h.replace(/<script>\s*window\._wpemojiSettings[\s\S]*?<\/script>\s*/gi, '');

  // Remove WP-related style blocks that reference missing resources
  h = h.replace(/<style[^>]*id=["'](?:wp-|global-styles|astra|stackable|uag)[^"']*["'][^>]*>[\s\S]*?<\/style>\s*/gi, '');

  // 6. Remove dns-prefetch and preconnect to WA/external
  h = h.replace(/<link[^>]*rel=["'](?:dns-prefetch|preconnect)["'][^>]*\/?>\s*/gi, '');

  // 7. Remove WP JSON/API/oEmbed links
  h = h.replace(/<link[^>]*rel=["'](?:https:\/\/api\.w\.org\/|EditURI|wlwmanifest|alternate)[^"']*["'][^>]*\/?>\s*/gi, '');
  h = h.replace(/<link[^>]*type=["']application\/(?:json\+oembed|rsd\+xml|json)[^"']*["'][^>]*\/?>\s*/gi, '');
  h = h.replace(/<link[^>]*rel=["'](?:shortlink|pingback)[^"']*["'][^>]*\/?>\s*/gi, '');

  // 8. Remove inline <style> blocks that are empty or very short
  h = h.replace(/<style[^>]*>\s*<\/style>\s*/gi, '');

  // 9. Add our custom CSS link in the <head>
  const relToRoot = path.relative(path.dirname(filePath), BASE_DIR).replace(/\\/g, '/');
  const cssPath = relToRoot ? relToRoot + '/style.css' : 'style.css';
  h = h.replace(/<\/head>/i, `<link rel="stylesheet" href="${cssPath}">\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Raleway:wght@600;700&display=swap" rel="stylesheet">\n</head>`);

  // 10. Fix broken image src - keep data-src but also set src for display
  // Replace lazy-load placeholders with actual data-src values
  h = h.replace(/src="data:image\/[^"]*"([^>]*?)data-src="([^"]*)"/g, 'src="$2"$1data-src="$2"');

  // 11. Remove noscript duplicate images
  h = h.replace(/<noscript><img[^>]*><\/noscript>/gi, '');

  // 12. Remove broken srcset/data-srcset attributes (pointing to missing files)
  h = h.replace(/\s*(?:data-)?srcset="[^"]*web\.archive\.org[^"]*"/gi, '');
  h = h.replace(/\s*data-sizes="auto"/gi, '');
  h = h.replace(/\s*data-eio="l"/gi, '');

  // 13. Remove the lazyload class since we removed the lazy loading script
  h = h.replace(/\blazyload\b/g, '');

  // 14. Clean up data-back attributes (used for parallax backgrounds)
  h = h.replace(/data-back="([^"]*)"/g, function(match, url) {
    // Convert to inline style background-image
    return `style="background-image: url('${url}')"`;
  });

  // 15. Remove WP-specific comments
  h = h.replace(/<!--\s*\/?\s*wp:[\s\S]*?-->/gi, '');
  h = h.replace(/<!--\s*\.site-branding\s*-->/gi, '');

  // 16. Clean up multiple blank lines
  h = h.replace(/\n{3,}/g, '\n\n');

  // 17. Fix remaining image URLs that still point to WA
  h = h.replace(/src="[^"]*web\.archive\.org\/web\/\d+[a-z_]*\/([^"]*)"/g, 'src="$1"');

  return h;
}

// Process all HTML files
const htmlFiles = findHtmlFiles(BASE_DIR);
console.log(`Found ${htmlFiles.length} HTML files to clean\n`);

for (const file of htmlFiles) {
  const rel = path.relative(BASE_DIR, file);
  console.log(`Cleaning: ${rel}`);
  const html = fs.readFileSync(file, 'utf8');
  const cleaned = cleanHtml(html, file);
  fs.writeFileSync(file, cleaned, 'utf8');
}

console.log('\nDone! All HTML files cleaned.');
