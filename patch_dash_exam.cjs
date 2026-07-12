const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const regexRankExam = /\{\!isSSR && \(\s*<div className="bg-slate-800\/50 border border-white\/5 rounded-2xl p-6 relative overflow-hidden">.*?<\/section>/s;

const newExamSection = `{!isSSR && (
          <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col gap-4">
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
            
            {phaseVal < 3 && (
              <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                <div className="bg-slate-900 border border-slate-700 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg relative">
                  <Award className={allQuestsCompleted ? 'text-indigo-400' : 'text-slate-600'} size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">{lang === 'ru' ? 'Мини-экзамен' : 'Mini Exam'}</h3>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">
                    {lang === 'ru' ? \`Сдайте экзамен, чтобы досрочно перейти в Фазу \${phaseVal === 1 ? 'II' : 'III'}\` : \`Pass the exam to early unlock Phase \${phaseVal === 1 ? 'II' : 'III'}\`}
                  </p>
                  <button 
                    onClick={() => onStartChallenge(phaseVal === 1 ? 'phase2' : 'phase3')}
                    disabled={!allQuestsCompleted}
                    className={\`w-full py-2 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all \${
                      allQuestsCompleted 
                        ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }\`}
                  >
                    {allQuestsCompleted ? (lang === 'ru' ? 'Начать экзамен' : 'Start Exam') : (lang === 'ru' ? 'Выполните квесты' : 'Complete Quests First')}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="bg-slate-900 border border-slate-700 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg relative">
                <Award className={phaseVal === 3 && allQuestsCompleted ? 'text-emerald-400' : 'text-slate-600'} size={32} />
                {phaseVal === 3 && allQuestsCompleted && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white uppercase tracking-wider">{t.level_up_exam}</h3>
                  <span className={\`px-2 py-0.5 rounded text-slate-950 text-[10px] font-black uppercase tracking-widest \${phaseVal === 3 && allQuestsCompleted ? 'bg-emerald-500' : 'bg-slate-500'}\`}>
                    {phaseVal === 3 && allQuestsCompleted ? t.challenge_active : t.locked}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  {lang === 'ru' ? 'Сдайте экзамен, чтобы повысить ранг' : 'Pass the exam to rank up'}
                </p>
                <button 
                  onClick={() => onStartChallenge('rank')}
                  disabled={phaseVal !== 3 || !allQuestsCompleted || daysInRank < currentRankConfig.minDays}
                  className={\`w-full py-2.5 rounded-xl font-black uppercase tracking-widest text-xs transition-all \${
                    phaseVal === 3 && allQuestsCompleted && daysInRank >= currentRankConfig.minDays
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }\`}
                >
                  {phaseVal === 3 && daysInRank >= currentRankConfig.minDays ? t.try_level_up : \`\${Math.max(0, currentRankConfig.minDays - daysInRank)} \${t.days_remaining}\`}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>`;

fileStr = fileStr.replace(regexRankExam, newExamSection);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
