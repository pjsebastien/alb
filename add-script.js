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
  const relToRoot = path.relative(path.dirname(file), dir).replace(/\\/g, '/');
  const scriptPath = relToRoot ? relToRoot + '/script.js' : 'script.js';

  if (!h.includes('script.js')) {
    h = h.replace('</body>', `<script src="${scriptPath}"></script>\n</body>`);
    fs.writeFileSync(file, h, 'utf8');
    console.log('Added script to: ' + path.relative(dir, file));
  }
}
console.log('Done');
