const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex1 = /else if \(lowerId\.includes\('squat'\) \|\| lowerId\.includes\('lunge'\) \|\| lowerId\.includes\('pistol'\)\) \{/g;
fileStr = fileStr.replace(regex1, "else if (lowerId.includes('squat') || lowerId.includes('lunge') || lowerId.includes('pistol') || lowerId.includes('rdl') || lowerId.includes('calf') || lowerId.includes('nordic') || lowerId.includes('wiper') || lowerId.includes('raise') || lowerId.includes('hollow') || lowerId.includes('plank') || lowerId.includes('crunch') || lowerId.includes('situp')) {");

fs.writeFileSync('src/store.ts', fileStr);
