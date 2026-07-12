const fs = require('fs');
let fileStr = fs.readFileSync('src/utils/calories.ts', 'utf8');

const regex = /\/\/ check for km\s*const kmMatch = d\.match\(\/\(\\d\+\(\?:\\\.\\d\+\)\?\)\\s\*km\/\);\s*if \(kmMatch\) \{\s*totalKm = parseFloat\(kmMatch\[1\]\);\s*\} else if \(id\.includes\('5k'\)\) \{\s*totalKm = 5;\s*\} else if \(id\.includes\('10k'\)\) \{\s*totalKm = 10;\s*\}/s;

const replacement = `// check for km
  const kmMatch = d.match(/(\\d+(?:\\.\\d+)?)\\s*km/);
  if (kmMatch) {
    totalKm = parseFloat(kmMatch[1]);
  } else if (id.includes('5k')) {
    totalKm = 5;
  } else if (id.includes('10k')) {
    totalKm = 10;
  }
  const titleD = (questId + " " + desc).toLowerCase();
  if (titleD.includes('1 mile') || titleD.includes('1 миля')) {
    totalKm = 1.6;
  } else if (titleD.includes('10 km') || titleD.includes('10 км')) {
    totalKm = 10;
  }`;

fileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('src/utils/calories.ts', fileStr);
