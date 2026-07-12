const fs = require('fs');
let fileStr = fs.readFileSync('src/store.ts', 'utf8');

const regex = /const toggleQuest = \(questId: string\) => \{\s*setState\(prev => \{\s*const todayStr = format\(new Date\(\), 'yyyy-MM-dd'\);\s*const newQuests = prev\.dailyQuests\.map\(q =>\s*q\.id === questId \? \{ \.\.\.q, completed: !q\.completed \} : q\s*\);/s;

const newToggleQuest = `const toggleQuest = (questId: string, incrementSets: boolean = false, maxSets: number = 1) => {
    setState(prev => {
      const todayStr = format(new Date(), 'yyyy-MM-dd');
      
      const newQuests = prev.dailyQuests.map(q => {
        if (q.id === questId) {
          if (incrementSets) {
            const nextSets = (q.currentSets || 0) + 1;
            if (nextSets >= maxSets) {
               return { ...q, currentSets: nextSets, completed: true };
            } else {
               return { ...q, currentSets: nextSets };
            }
          } else {
            // normal toggle
            if (q.completed) {
              return { ...q, completed: false, currentSets: 0 };
            } else {
              return { ...q, completed: true, currentSets: maxSets };
            }
          }
        }
        return q;
      });`;

fileStr = fileStr.replace(regex, newToggleQuest);

fs.writeFileSync('src/store.ts', fileStr);
