const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const toRemove = `          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
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
          </div>`;

fileStr = fileStr.replace(toRemove, `          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
            <span>{lang === 'ru' ? 'Мотивация' : 'Motivation'}</span>
          </div>`);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
