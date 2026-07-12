const fs = require('fs');
const dataStr = fs.readFileSync('src/data.ts', 'utf8');
const matches = [...dataStr.matchAll(/id:\s*'([a-s]_[^']+)',.*?title:\s*\{\s*en:\s*'[^']+',\s*ru:\s*'([^']+)'\s*\}/g)];

const unique = {};
matches.forEach(m => {
  let id = m[1];
  // ignore chal_ and murph_ (they are challenges, mostly just repeats of pushups/pullups)
  if (id.startsWith('chal') || id.startsWith('murph')) return;
  id = id.replace('_f', '');
  unique[id] = m[2];
});

for (let id in unique) {
  console.log(id + "  ->  " + unique[id]);
}
