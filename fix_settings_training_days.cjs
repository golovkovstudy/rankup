const fs = require('fs');
let fileStr = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');

const oldRestDaySelect = `            {/* Rest Day */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.rest_day_select}</label>
              <select 
                className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-slate-100 font-mono focus:outline-none focus:border-emerald-500/50 transition-colors uppercase text-xs font-bold tracking-widest"
                value={state.user?.restDay ?? 0}
                onChange={(e) => onSetRestDay(parseInt(e.target.value, 10))}
              >
                {t.week_days.map((dayName: string, index: number) => (
                  <option key={index} value={index}>{dayName}</option>
                ))}
              </select>
            </div>`;

const newTrainingDaysSelect = `            {/* Training Days */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">
                {lang === 'ru' ? 'Тренировочные дни' : 'Training Days'}
              </label>
              <div className="grid grid-cols-7 gap-1">
                {t.week_days.map((dayName: string, index: number) => {
                  let tDays = state.user?.trainingDays;
                  if (!tDays) {
                    tDays = [];
                    for(let i=1; i<=6; i++) tDays.push(((state.user?.restDay || 0) + i) % 7);
                  }
                  const isSelected = tDays.includes(index);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        let newDays = [...tDays];
                        if (isSelected) {
                          if (newDays.length > 1) newDays = newDays.filter(d => d !== index);
                        } else {
                          newDays.push(index);
                          newDays.sort();
                        }
                        // We need a store function to set training days!
                        // For now, if we reuse onSetRestDay, we can't easily. We need a new prop or modify onSetRestDay.
                        // Actually let's just dispatch an event to the store.
                        window.dispatchEvent(new CustomEvent('updateTrainingDays', { detail: newDays }));
                      }}
                      className={\`p-2 rounded-lg text-xs font-bold transition-colors \${isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}\`}
                    >
                      {dayName.slice(0, 2)}
                    </button>
                  );
                })}
              </div>
            </div>`;

fileStr = fileStr.replace(oldRestDaySelect, newTrainingDaysSelect);
fs.writeFileSync('src/components/SettingsModal.tsx', fileStr);
