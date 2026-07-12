const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Onboarding.tsx', 'utf8');

const oldStep4 = `{step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 relative z-10">
            <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">{t.rest_day_select}</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 0, label: t.sunday },
                { id: 1, label: t.monday },
                { id: 2, label: t.tuesday },
                { id: 3, label: t.wednesday },
                { id: 4, label: t.thursday },
                { id: 5, label: t.friday },
                { id: 6, label: t.saturday }
              ].map((day) => (
                <div 
                  key={day.id}
                  onClick={() => setFormData({ ...formData, restDay: day.id })}
                  className={\`p-3 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold uppercase tracking-widest \${formData.restDay === day.id ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}\`}
                >
                  {day.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}`;

const newStep4 = `{step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 relative z-10">
            <label className="block text-[10px] text-slate-500 uppercase tracking-tighter mb-2">
              {lang === 'ru' ? 'Выбери тренировочные дни' : 'Select Training Days'}
            </label>
            <p className="text-[10px] text-slate-400 mb-2 leading-tight">
              {lang === 'ru' ? 'Нагрузка будет распределена на выбранные дни. Мы рекомендуем 3-5 дней в неделю.' : 'Volume will be distributed across selected days. We recommend 3-5 days.'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 0, label: t.sunday },
                { id: 1, label: t.monday },
                { id: 2, label: t.tuesday },
                { id: 3, label: t.wednesday },
                { id: 4, label: t.thursday },
                { id: 5, label: t.friday },
                { id: 6, label: t.saturday }
              ].map((day) => {
                const isSelected = formData.trainingDays?.includes(day.id) || (!formData.trainingDays && day.id !== formData.restDay);
                return (
                  <div 
                    key={day.id}
                    onClick={() => {
                      let currentDays = formData.trainingDays || [1,2,3,4,5,6];
                      if (isSelected) {
                        if (currentDays.length > 1) {
                          setFormData({ ...formData, trainingDays: currentDays.filter(d => d !== day.id).sort() });
                        }
                      } else {
                        setFormData({ ...formData, trainingDays: [...currentDays, day.id].sort() });
                      }
                    }}
                    className={\`p-3 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold uppercase tracking-widest \${isSelected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-white/5 text-slate-500 hover:border-emerald-500/30'}\`}
                  >
                    {day.label}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}`;

fileStr = fileStr.replace(oldStep4, newStep4);

const oldButtonCondition = `disabled={step === 1 && (!formData.age || !formData.height || !formData.weight) || (step === 4 && formData.restDay === undefined)}`;
const newButtonCondition = `disabled={(step === 1 && (!formData.age || !formData.height || !formData.weight)) || (step === 4 && (!formData.trainingDays || formData.trainingDays.length === 0))}`;

fileStr = fileStr.replace(oldButtonCondition, newButtonCondition);
fs.writeFileSync('src/components/Onboarding.tsx', fileStr);
