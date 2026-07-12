const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const target = `                 if (allComplete) status = 'full';
                 else if (anyComplete) status = 'partial';
                 else status = 'missed'; // will be 'missed' if they don't complete anything
             }
         }
      }`;

const replace = `                 if (allComplete) status = 'full';
                 else if (anyComplete) status = 'partial';
                 else status = undefined; // Don't show red for today while they are still working on it
             }
         }
      }`;

fileStr = fileStr.replace(target, replace);
fs.writeFileSync('src/components/Achievements.tsx', fileStr);
