const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const oldQuestGen = `      } else if (activeDayOfWeek === user.restDay) {
          // It's rest day!
          newQuests = [{
              id: 'rest_day_quest',
              completed: false,
              date: todayStr
          }];
      } else {
          // Calculate active day mappings
          const activeDays = [];
          for (let i = 1; i <= 6; i++) {
              activeDays.push((user.restDay + i) % 7);
          }
          const trainingDayNumber = activeDays.indexOf(activeDayOfWeek) + 1; // 1 to 6
          
          const currentRankConfig = RANKS[progress.currentRank];
          newQuests = currentRankConfig.quests
            .filter(q => q.scheduleDays.includes(trainingDayNumber))
            .map(q => ({
              id: q.id,
              completed: false,
              date: todayStr,
            }));
      }`;

const newQuestGen = `      } else {
          // Backward compatibility + new trainingDays logic
          let tDays = user.trainingDays;
          if (!tDays || tDays.length === 0) {
            tDays = [];
            for (let i = 1; i <= 6; i++) {
                tDays.push((user.restDay !== undefined ? user.restDay : 0) + i % 7);
            }
            tDays = tDays.map(d => d % 7);
          }
          
          if (!tDays.includes(activeDayOfWeek)) {
            // It's rest day!
            newQuests = [{
                id: 'rest_day_quest',
                completed: false,
                date: todayStr
            }];
          } else {
            const currentRankConfig = RANKS[progress.currentRank];
            
            // Map the selected N training days to the 6 workout templates
            const N = tDays.length;
            const idx = tDays.indexOf(activeDayOfWeek); // 0 to N-1
            
            // e.g. N=3 -> idx=0 gets templates 1,2; idx=1 gets 3,4; idx=2 gets 5,6
            const startTemplate = Math.floor(idx * (6 / N)) + 1;
            const endTemplate = Math.floor((idx + 1) * (6 / N));
            
            const templatesToRun = [];
            for(let i = startTemplate; i <= endTemplate; i++) {
                templatesToRun.push(i);
            }
            
            // Gather all quests for these templates
            let uniqueQuests = new Map();
            currentRankConfig.quests.forEach(q => {
                const isScheduled = templatesToRun.some(tNum => q.scheduleDays.includes(tNum));
                if (isScheduled) {
                    uniqueQuests.set(q.id, {
                        id: q.id,
                        completed: false,
                        date: todayStr,
                    });
                }
            });
            
            newQuests = Array.from(uniqueQuests.values());
            
            // If somehow empty, give a rest quest
            if (newQuests.length === 0) {
                newQuests = [{ id: 'rest_day_quest', completed: false, date: todayStr }];
            }
          }
      }`;

fileStr = fileStr.replace(oldQuestGen, newQuestGen);
fs.writeFileSync('src/store.ts', fileStr);
