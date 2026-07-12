const fs = require('fs');
let fileStr = fs.readFileSync('src/types.ts', 'utf8');

fileStr = fileStr.replace(
  "ssrChallengesCompleted: string[];",
  "ssrChallengesCompleted: string[];\n  activityHistory?: string[];"
);

fs.writeFileSync('src/types.ts', fileStr);
