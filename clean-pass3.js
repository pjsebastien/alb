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

let total = 0;
for (const file of walk(dir)) {
  let h = fs.readFileSync(file, 'utf8');
  const before = (h.match(/web\.archive\.org/g) || []).length;

  // Fix mailto: and tel: links going through WA
  h = h.replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/(mailto:[^"']+)/g, '$1');
  h = h.replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/(tel:[^"']+)/g, '$1');

  // Fix any remaining WA URLs pointing to external sites
  h = h.replace(/https?:\/\/web\.archive\.org\/web\/\d+[a-z_]*\/(https?:\/\/[^"'<>\s]+)/g, '$1');

  const after = (h.match(/web\.archive\.org/g) || []).length;
  if (before !== after) {
    fs.writeFileSync(file, h, 'utf8');
    console.log(path.relative(dir, file) + ': ' + before + ' -> ' + after);
  }
  total += after;
}
console.log('Total remaining: ' + total);
