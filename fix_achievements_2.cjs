const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

// 1. Remove Analytics block
const targetAnalytics = `      {/* Advanced Stats Chart */}
      <section>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
          {lang === 'ru' ? 'Аналитика' : 'Analytics'}
        </h2>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-md h-64 flex flex-col">
          <div className="flex-1 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={(() => {
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
              })()}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }} 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px', color: '#10b981', fontWeight: 'bold' }} 
                  itemStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="val" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest">
            {lang === 'ru' ? 'Примерная активность по дням недели' : 'Estimated activity by weekday'}
          </p>
        </div>
      </section>`;

fileStr = fileStr.replace(targetAnalytics, '');

// 2. Rewrite Heatmap logic
// In the imports, I need startOfWeek, endOfWeek, eachDayOfInterval if they exist.
// Let's just use manual date math to avoid missing date-fns imports.
const heatmapCalcOld = `  const heatmapDays = Array.from({ length: 35 }).map((_, i) => {
    const d = subDays(new Date(), 34 - i);
    const dateStr = format(d, 'yyyy-MM-dd');
    return { date: d, active: activityHistory.includes(dateStr) };
  });`;

const heatmapCalcNew = `  const heatmapDays = (() => {
    const today = new Date();
    // Get to the most recent Sunday
    const dayOfWeek = today.getDay(); 
    // Let's align to Monday (1). If today is Sunday (0), it's 6 days past Monday.
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    // We want exactly 4 weeks (28 days) + the current week up to today
    // Let's just show a fixed 5 weeks (35 days) ending on this coming Sunday to make it a perfect grid.
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    const endDay = new Date(today);
    endDay.setDate(today.getDate() + daysUntilSunday);
    
    // We want 35 days ending on endDay
    return Array.from({ length: 35 }).map((_, i) => {
      const d = subDays(endDay, 34 - i);
      const dateStr = format(d, 'yyyy-MM-dd');
      return { 
        date: d, 
        active: activityHistory.includes(dateStr),
        isFuture: d > today
      };
    });
  })();
  
  const weekDays = lang === 'ru' ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];`;

fileStr = fileStr.replace(heatmapCalcOld, heatmapCalcNew);

// 3. Rewrite Heatmap UI
const heatmapUIOld = `        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-md">
          <div className="grid grid-cols-7 gap-2">
            {heatmapDays.map((day, i) => (
              <div 
                key={i} 
                className={\`w-full aspect-square rounded-sm \${day.active ? \`\${theme.bg} \${theme.glow} border \${theme.border}\` : 'bg-slate-800/50 border border-white/5'}\`}
                title={format(day.date, 'yyyy-MM-dd')}
              />
            ))}
          </div>
        </div>`;

const heatmapUINew = `        <div className="p-5 rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {weekDays.map(wd => (
              <div key={wd} className="text-center text-[9px] font-bold text-slate-500 uppercase">{wd}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 relative z-10">
            {heatmapDays.map((day, i) => {
              // Add some visual distinction based on past/future/active
              let classes = "w-full aspect-square rounded-[4px] transition-all duration-300 ";
              if (day.isFuture) {
                classes += "bg-slate-800/20 border border-white/[0.02]";
              } else if (day.active) {
                classes += \`\${theme.bg} shadow-[0_0_10px_rgba(16,185,129,0.3)] border \${theme.border} transform hover:scale-110 z-10\`;
              } else {
                classes += "bg-slate-800/50 border border-white/5 hover:bg-slate-700";
              }

              return (
                <div 
                  key={i} 
                  className={classes}
                  title={format(day.date, 'dd MMM yyyy')}
                />
              )
            })}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 tracking-widest">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-[3px] bg-slate-800/50 border border-white/5"></div>
                <span>{lang === 'ru' ? 'Отдых' : 'Rest'}</span>
             </div>
             <div className="flex items-center gap-2">
                <div className={\`w-3 h-3 rounded-[3px] \${theme.bg} border \${theme.border}\`}></div>
                <span className={theme.text}>{lang === 'ru' ? 'Тренировка' : 'Workout'}</span>
             </div>
          </div>
        </div>`;

fileStr = fileStr.replace(heatmapUIOld, heatmapUINew);

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
