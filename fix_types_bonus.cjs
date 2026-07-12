const fs = require('fs');
let fileStr = fs.readFileSync('src/types.ts', 'utf8');

fileStr = fileStr.replace(
  "customTitle?: string;",
  "customTitle?: string;\n  originalId?: string;"
);

fs.writeFileSync('src/types.ts', fileStr);
