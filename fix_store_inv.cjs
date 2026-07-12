const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetLogic = `            qList.forEach(q => {
                const isScheduled = templatesToRun.some(tNum => q.scheduleDays.includes(tNum));
                if (isScheduled) {
                    uniqueQuests.set(q.id, {
                        id: q.id,
                        completed: false,
                        date: todayStr,
                    });
                }
            });`;

const replaceLogic = `            qList.forEach(q => {
                const isScheduled = templatesToRun.some(tNum => q.scheduleDays.includes(tNum));
                const hasInventory = !q.inventoryReq || user.inventory?.includes(q.inventoryReq);
                if (isScheduled && hasInventory) {
                    uniqueQuests.set(q.id, {
                        id: q.id,
                        completed: false,
                        date: todayStr,
                    });
                }
            });`;

storeStr = storeStr.replace(targetLogic, replaceLogic);
fs.writeFileSync('src/store.ts', storeStr);
