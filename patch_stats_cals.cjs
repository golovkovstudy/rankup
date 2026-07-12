const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Statistics.tsx', 'utf8');

const regex = /<div className="col-span-2 p-4 rounded-2xl bg-slate-800\/50 border border-slate-700\/50 flex items-center justify-between">.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/s;

const replacement = `<div className="col-span-2 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center">
              <Flame className="text-orange-500 mb-2" size={24} />
              <div className="text-2xl font-black text-white leading-none">{state.stats.caloriesBurnedTotal || 0}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Сожжено ккал' : 'Calories'}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-black text-white leading-none mb-2">{state.stats.runKmTotal} <span className="text-xs text-slate-500">{lang === 'ru' ? 'км' : 'km'}</span></div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{lang === 'ru' ? 'Дистанция' : 'Distance Run'}</div>
            </div>
          </div>
          <div className="col-span-2 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-center">
            <div>
              <div className="text-2xl font-black text-white leading-none">{state.stats.workoutsCompleted}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{lang === 'ru' ? 'Тренировок выполнено' : 'Workouts Completed'}</div>
            </div>
          </div>
        </div>
      </section>`;

fileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('src/components/Statistics.tsx', fileStr);
