const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'albmaitredoeuvre');

function walk(d) {
  const files = [];
  for (const e of fs.readdirSync(d, {withFileTypes:true})) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) files.push(...walk(f));
    else if (e.name.endsWith('.html')) files.push(f);
  }
  return files;
}

for (const file of walk(dir)) {
  let h = fs.readFileSync(file, 'utf8');
  const before = h.length;

  // Remove WP Fastest Cache comment
  h = h.replace(/<!-- WP Fastest Cache[\s\S]*$/m, '');

  // Remove playback timings comment
  h = h.replace(/<!--\s*playback timings[\s\S]*?-->/gi, '');

  // Remove remaining inline WP scripts (trident detection, etc.)
  h = h.replace(/<script>\s*\/\(trident\|msie\)[\s\S]*?<\/script>\s*/gi, '');

  // Remove Cookie Notice comments
  h = h.replace(/<!-- Cookie Notice plugin[\s\S]*?-->\s*/gi, '');
  h = h.replace(/<!-- \/ Cookie Notice plugin -->\s*/gi, '');

  // Remove Yoast SEO comments
  h = h.replace(/<!-- This site is optimized with the Yoast SEO plugin[\s\S]*?-->\s*/gi, '');
  h = h.replace(/<!-- \/ Yoast SEO plugin\. -->\s*/gi, '');

  // Ensure proper closing
  if (!h.trim().endsWith('</html>')) {
    h = h.trim() + '\n</html>';
  }

  // Clean up excessive whitespace
  h = h.replace(/\n{3,}/g, '\n\n');

  if (h.length !== before) {
    fs.writeFileSync(file, h, 'utf8');
    console.log('Cleaned: ' + path.relative(dir, file));
  }
}
console.log('Final cleanup done');
