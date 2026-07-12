const fs = require('fs');

const dataStr = fs.readFileSync('src/data.ts', 'utf8');

// Match all objects that look like { id: '...', ..., title: { en: '...', ru: '...' } }
const matches = [...dataStr.matchAll(/id:\s*'([^']+)',.*?title:\s*\{\s*en:\s*'([^']+)',\s*ru:\s*'([^']+)'\s*\}/g)];

const male = new Set();
const female = new Set();
const both = new Set();

matches.forEach(m => {
   const id = m[1];
   const ru = m[3];
   
   if (id.endsWith('_f')) {
      female.add(ru);
   } else if (matches.some(x => x[1] === id + '_f')) {
      male.add(ru);
   } else {
      both.add(ru);
   }
});

console.log("Men specific:", Array.from(male).join('; '));
console.log("Women specific:", Array.from(female).join('; '));
console.log("Both:", Array.from(both).join('; '));
