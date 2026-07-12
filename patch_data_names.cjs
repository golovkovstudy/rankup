const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

fileStr = fileStr.replace(/Отжимания уголком \(Pike Pushups\) \(Pike Pushups\)/g, 'Отжимания уголком (Pike Pushups)');

fs.writeFileSync('src/data.ts', fileStr);
