const fs = require('fs');
let content = fs.readFileSync('src/store.ts', 'utf8');

content = content.replace(/ *const ageScale = getAgeScale\(prev\.user\?\.age \|\| 25\);\n/g, '');

content = content.replace(
`      let newStats = { ...prev.stats };

      if (!wasCompleted && isCompleted) {`,
`      let newStats = { ...prev.stats };
      const ageScale = getAgeScale(prev.user?.age || 25);

      if (!wasCompleted && isCompleted) {`
);

fs.writeFileSync('src/store.ts', content);
