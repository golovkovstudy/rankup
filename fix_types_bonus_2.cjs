const fs = require('fs');
let fileStr = fs.readFileSync('src/types.ts', 'utf8');

fileStr = fileStr.replace(
  "customTitle?: string;",
  "customTitle?: { en: string, ru: string };\n  customDesc?: { en: string, ru: string };"
);

fs.writeFileSync('src/types.ts', fileStr);
