const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');

content = content.replace(
`      if (!wasCompleted && isCompleted) {
        if (!newStats.activityHistory) {`,
`      const ageScale = getAgeScale(prev.user?.age || 25);
      if (!wasCompleted && isCompleted) {
        if (!newStats.activityHistory) {`
);

content = content.replace(/const ageScale = getAgeScale\(prev\.user\?\.age \|\| 25\);\n/, '');
fs.writeFileSync('src/store.ts', content);
