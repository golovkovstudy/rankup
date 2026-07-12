const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const statsAndHeatmapStr = `  const theme = getRankTheme(state.progress.currentRank);
  const activityHistory = state.stats.activityHistory || [];
  
  // Generate last 35 days for heatmap
  const heatmapDays = Array.from({ length: 35 }).map((_, i) => {
    const d = subDays(new Date(), 34 - i);
    const dateStr = format(d, 'yyyy-MM-dd');
    return { date: d, active: activityHistory.includes(dateStr) };
  });

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <section>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
          {lang === 'ru' ? 'Статистика' : 'Statistics'}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <Dumbbell className="text-slate-400 mb-2" size={24} />
            <div className="text-2xl font-black text-white leading-none">{state.stats.pushupsTotal}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Отжимания' : 'Pushups'}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center">
            <ChevronUp className="text-slate-400 mb-2" size={24} />
            <div className="text-2xl font-black text-white leading-none">{state.stats.pullupsTotal}</div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Подтягивания' : 'Pullups'}</div>
          </div>
          <div className="col-span-2 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="text-orange-500" size={24} />
              <div className="text-left">
                <div className="text-xl font-black text-white leading-none">{state.stats.runKmTotal} <span className="text-xs text-slate-500">{lang === 'ru' ? 'км' : 'km'}</span></div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Дистанция' : 'Distance Run'}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-white leading-none">{state.stats.workoutsCompleted}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Тренировок' : 'Workouts'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Heatmap */}
      <section>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
          {lang === 'ru' ? 'Активность' : 'Activity Log'}
        </h2>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-md">
          <div className="grid grid-cols-7 gap-2">
            {heatmapDays.map((day, i) => (
              <div 
                key={i} 
                className={\`w-full aspect-square rounded-sm \${day.active ? \`\${theme.bg} \${theme.glow} border \${theme.border}\` : 'bg-slate-800/50 border border-white/5'}\`}
                title={format(day.date, 'yyyy-MM-dd')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
          {t.trophy_room}
        </h2>`;

fileStr = fileStr.replace(/  return \(\s*<div className="space-y-6">\s*<h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">\s*\{t\.trophy_room\}\s*<\/h2>/g, statsAndHeatmapStr);

fileStr = fileStr.replace('</section>', '</section>\n    </div>');

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
