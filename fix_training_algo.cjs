const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const oldCode = `            // Map the selected N training days to the 6 workout templates
            const N = tDays.length;
            const idx = tDays.indexOf(activeDayOfWeek); // 0 to N-1
            
            // e.g. N=3 -> idx=0 gets templates 1,2; idx=1 gets 3,4; idx=2 gets 5,6
            const startTemplate = Math.floor(idx * (6 / N)) + 1;
            const endTemplate = Math.floor((idx + 1) * (6 / N));
            
            const templatesToRun = [];
            for(let i = startTemplate; i <= endTemplate; i++) {
                templatesToRun.push(i);
            }`;

const newCode = `            // Map the selected N training days to the 6 workout templates
            const N = tDays.length;
            const idx = tDays.indexOf(activeDayOfWeek); // 0 to N-1
            
            const templatesToRun = [];
            if (N >= 6) {
                // For 6 or 7 days, just run template (idx % 6) + 1
                // E.g. day 0->1, 1->2, ... 5->6, 6->1
                templatesToRun.push((idx % 6) + 1);
            } else {
                // e.g. N=3 -> idx=0 gets templates 1,2; idx=1 gets 3,4; idx=2 gets 5,6
                const startTemplate = Math.floor(idx * (6 / N)) + 1;
                const endTemplate = Math.floor((idx + 1) * (6 / N));
                for(let i = startTemplate; i <= endTemplate; i++) {
                    templatesToRun.push(i);
                }
            }`;

storeStr = storeStr.replace(oldCode, newCode);
fs.writeFileSync('src/store.ts', storeStr);
