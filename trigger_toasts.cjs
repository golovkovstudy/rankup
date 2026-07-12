const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { UI, RANKS, SSR_CHALLENGES } from '../data';",
  "import { UI, RANKS, SSR_CHALLENGES } from '../data';\nimport { showSystemToast } from '../toast';"
);

const oldMap = `onClick={() => onToggleQuest(quest.id)}`;
const newMap = `onClick={() => {
                const wasCompleted = quest.completed;
                onToggleQuest(quest.id);
                if (!wasCompleted) {
                  showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                }
              }}`;

fileStr = fileStr.replace(oldMap, newMap);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
