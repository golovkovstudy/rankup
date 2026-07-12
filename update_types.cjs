const fs = require('fs');
let fileStr = fs.readFileSync('src/types.ts', 'utf8');

fileStr = fileStr.replace(
  "  runKmTotal: number;",
  "  runKmTotal: number;\n  caloriesBurnedTotal?: number;"
);

fs.writeFileSync('src/types.ts', fileStr);
