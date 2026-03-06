const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, 'albmaitredoeuvre');

function walk(d) {
  const files = [];
  for (const e of fs.readdirSync(d, {withFileTypes:true})) {
    const f = path.join(d, e.name);
    if (e.isDirectory() && !['images','wp-content','wp-includes','author'].includes(e.name)) files.push(...walk(f));
    else if (e.name === 'index.html') files.push(f);
  }
  return files;
}

const FAVICON = '8000 A 02 RECTO calibrage nouvelle carte recto HAUT 350 gr by pass   -07.png';

for (const file of walk(BASE)) {
  let h = fs.readFileSync(file, 'utf8');
  if (h.includes('rel="icon"')) continue; // already has favicon

  const relToRoot = path.relative(path.dirname(file), BASE).replace(/\\/g, '/');
  const prefix = relToRoot ? relToRoot + '/' : '';
  const faviconTag = `<link rel="icon" type="image/png" href="${prefix}images/${FAVICON}">\n  <link rel="apple-touch-icon" href="${prefix}images/${FAVICON}">`;

  h = h.replace('</head>', `  ${faviconTag}\n</head>`);
  fs.writeFileSync(file, h, 'utf8');
  console.log('Added favicon: ' + path.relative(BASE, file));
}
console.log('Done');
