const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const oldChart = `              <BarChart data={[
                { name: lang === 'ru' ? 'Пн' : 'Mon', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Вт' : 'Tue', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Ср' : 'Wed', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Чт' : 'Thu', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Пт' : 'Fri', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Сб' : 'Sat', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 },
                { name: lang === 'ru' ? 'Вс' : 'Sun', val: state.stats.workoutsCompleted > 0 ? Math.floor(Math.random() * 5) + 1 : 0 }
              ]}>`;

const newChart = `              <BarChart data={(() => {
                const days = [0,0,0,0,0,0,0];
                (state.stats.activityHistory || []).forEach(d => {
                  const day = new Date(d).getDay(); // 0 is Sunday
                  days[day === 0 ? 6 : day - 1]++;
                });
                return [
                  { name: lang === 'ru' ? 'Пн' : 'Mon', val: days[0] },
                  { name: lang === 'ru' ? 'Вт' : 'Tue', val: days[1] },
                  { name: lang === 'ru' ? 'Ср' : 'Wed', val: days[2] },
                  { name: lang === 'ru' ? 'Чт' : 'Thu', val: days[3] },
                  { name: lang === 'ru' ? 'Пт' : 'Fri', val: days[4] },
                  { name: lang === 'ru' ? 'Сб' : 'Sat', val: days[5] },
                  { name: lang === 'ru' ? 'Вс' : 'Sun', val: days[6] }
                ];
              })()}>`;

fileStr = fileStr.replace(oldChart, newChart);
fs.writeFileSync('src/components/Achievements.tsx', fileStr);
