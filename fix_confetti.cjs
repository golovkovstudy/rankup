const fs = require('fs');
let dashStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

dashStr = dashStr.replace(
  "import { differenceInDays, differenceInCalendarDays, parseISO } from 'date-fns';",
  "import { differenceInDays, differenceInCalendarDays, parseISO } from 'date-fns';\nimport confetti from 'canvas-confetti';"
);

const oldToggle = `                if (!wasCompleted) {
                  showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                }`;

const newToggle = `                if (!wasCompleted) {
                  const allWillBeCompleted = dailyQuests.every(q => q.id === quest.id ? true : q.completed);
                  if (allWillBeCompleted) {
                    confetti({
                      particleCount: 100,
                      spread: 70,
                      origin: { y: 0.6 },
                      colors: ['#10b981', '#34d399', '#059669']
                    });
                  }
                  showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                }`;

dashStr = dashStr.replace(oldToggle, newToggle);
fs.writeFileSync('src/components/Dashboard.tsx', dashStr);
