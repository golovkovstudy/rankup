const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const targetStr = `      </div>

      {/* Daily Quests */}`;

const newStr = `      </div>
      
      {/* Body Metrics */}
      {state.user && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
            <span>{lang === 'ru' ? 'Метрики Тела' : 'Body Metrics'}</span>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('open-update-body'))}
              className="text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30"
            >
              {lang === 'ru' ? 'Изменить' : 'Update'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div>
                 <div className="text-[10px] text-slate-500 uppercase tracking-widest">{t.weight}</div>
                 <div className="text-xl font-black text-slate-200">{state.user.weight} <span className="text-xs text-slate-500 font-normal">kg</span></div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
              <div>
                 <div className="text-[10px] text-slate-500 uppercase tracking-widest">{t.height}</div>
                 <div className="text-xl font-black text-slate-200">{state.user.height} <span className="text-xs text-slate-500 font-normal">cm</span></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
               <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">BMI / ИМТ</div>
               <div className="text-2xl font-black text-white">
                 {(state.user.weight / Math.pow(state.user.height/100, 2)).toFixed(1)}
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-500 to-indigo-500 opacity-50"></div>
            </div>
            <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
               <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{lang === 'ru' ? 'Сожжено ккал' : 'Calories Burned'}</div>
               <div className="text-2xl font-black text-orange-400">
                 {state.stats.caloriesBurnedTotal || 0}
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-500 to-red-500 opacity-50"></div>
            </div>
          </div>
        </div>
      )}

      {/* Daily Quests */}`;

fileStr = fileStr.replace(targetStr, newStr);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
