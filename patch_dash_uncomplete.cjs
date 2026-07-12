const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const target = `const wasCompleted = quest.completed;
                if (hasSets) {
                  onToggleQuest(quest.id, true, maxSets);`;

const replacement = `const wasCompleted = quest.completed;
                if (hasSets) {
                  if (wasCompleted) {
                    onToggleQuest(quest.id, false, 1);
                  } else {
                    onToggleQuest(quest.id, true, maxSets);
                  }`;

fileStr = fileStr.replace(target, replacement);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
