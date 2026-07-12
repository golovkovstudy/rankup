const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const targetLegend = `          <div className="mt-4 flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 tracking-widest">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-[3px] bg-slate-800/50 border border-white/5"></div>
                <span>{lang === 'ru' ? 'Отдых' : 'Rest'}</span>
             </div>
             <div className="flex items-center gap-2">
                <div className={\`w-3 h-3 rounded-[3px] \${theme.bg} border \${theme.border}\`}></div>
                <span className={theme.text}>{lang === 'ru' ? 'Тренировка' : 'Workout'}</span>
             </div>
          </div>`;

const replaceLegend = `          <div className="mt-4 flex items-center justify-between text-[9px] uppercase font-bold text-slate-500 tracking-widest">
             <div className="flex items-center gap-1.5">
                <div className={\`w-2.5 h-2.5 rounded-[2px] \${theme.bg} border \${theme.border}\`}></div>
                <span className={theme.text}>{lang === 'ru' ? 'Успех' : 'Success'}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-yellow-500/80 border border-yellow-400"></div>
                <span className="text-yellow-500">{lang === 'ru' ? 'Частично' : 'Partial'}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-red-500/80 border border-red-400"></div>
                <span className="text-red-500">{lang === 'ru' ? 'Пропуск' : 'Missed'}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-500/30 border border-blue-400/50"></div>
                <span className="text-blue-400">{lang === 'ru' ? 'Выходной' : 'Rest'}</span>
             </div>
          </div>`;

fileStr = fileStr.replace(targetLegend, replaceLegend);

// Also remove the confusing tooltip about "Brighter green means more quests completed"
const targetTooltip = `          <div className="group relative flex items-center">
            <Info size={16} className="text-slate-500 cursor-pointer hover:text-emerald-400 transition-colors" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-slate-600 rounded-xl text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center shadow-xl font-bold uppercase tracking-widest leading-relaxed">
              {lang === 'ru' ? 'Сетка активности показывает дни, когда вы выполняли задания. Чем ярче зеленый, тем больше заданий выполнено!' : 'Activity heatmap shows days you completed quests. Brighter green means more quests completed!'}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-600"></div>
            </div>
          </div>`;

fileStr = fileStr.replace(targetTooltip, "");

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
