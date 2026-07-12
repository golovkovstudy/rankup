const fs = require('fs');
let fileStr = fs.readFileSync('src/types.ts', 'utf8');
fileStr = fileStr.replace("  experience: 'beginner' | 'experienced' | 'veteran';\n", "");
fs.writeFileSync('src/types.ts', fileStr);
