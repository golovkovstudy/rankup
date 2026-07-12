const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const targetBmiBlock = `<div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
               <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">BMI / ИМТ</div>
               <div className="text-2xl font-black text-white">
                 {(state.user.weight / Math.pow(state.user.height/100, 2)).toFixed(1)}
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-500 to-indigo-500 opacity-50"></div>
            </div>`;

const newBmiBlock = `<div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
               <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">BMI / ИМТ</div>
               <div className="flex items-end gap-2">
                 <div className="text-2xl font-black text-white">
                   {(() => {
                     const bmi = state.user.weight / Math.pow(state.user.height/100, 2);
                     return bmi.toFixed(1);
                   })()}
                 </div>
                 <div className="text-[10px] uppercase font-bold tracking-widest pb-1" style={{
                   color: (() => {
                     const bmi = state.user.weight / Math.pow(state.user.height/100, 2);
                     if (bmi < 18.5) return '#60a5fa'; // blue
                     if (bmi < 25) return '#34d399'; // emerald
                     if (bmi < 30) return '#fbbf24'; // amber
                     return '#f87171'; // red
                   })()
                 }}>
                   {(() => {
                     const bmi = state.user.weight / Math.pow(state.user.height/100, 2);
                     if (bmi < 18.5) return lang === 'ru' ? 'Дефицит' : 'Under';
                     if (bmi < 25) return lang === 'ru' ? 'Норма' : 'Normal';
                     if (bmi < 30) return lang === 'ru' ? 'Избыток' : 'Over';
                     return lang === 'ru' ? 'Ожирение' : 'Obese';
                   })()}
                 </div>
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-2 opacity-50" style={{
                 background: (() => {
                   const bmi = state.user.weight / Math.pow(state.user.height/100, 2);
                   if (bmi < 18.5) return 'linear-gradient(to bottom, #3b82f6, #60a5fa)';
                   if (bmi < 25) return 'linear-gradient(to bottom, #10b981, #34d399)';
                   if (bmi < 30) return 'linear-gradient(to bottom, #f59e0b, #fbbf24)';
                   return 'linear-gradient(to bottom, #ef4444, #f87171)';
                 })()
               }}></div>
            </div>`;

fileStr = fileStr.replace(targetBmiBlock, newBmiBlock);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
