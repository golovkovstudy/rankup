const fs = require('fs');
const dataStr = fs.readFileSync('src/data.ts', 'utf8');
const matches = [...dataStr.matchAll(/id:\s*'([a-z]_[^']+)',.*?title:\s*\{\s*en:\s*'[^']+',\s*ru:\s*'([^']+)'\s*\}/g)];

const unique = {};
matches.forEach(m => {
  const id = m[1].replace('_f', '');
  unique[id] = m[2];
});

for (let id in unique) {
  console.log(id + ".mp4  ->  " + unique[id]);
}
