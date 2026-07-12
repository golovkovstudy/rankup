const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const oldCard = `              className={\`group flex items-center p-5 rounded-2xl border transition-all cursor-pointer \${
                quest.completed 
                  ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20' 
                  : \`bg-white/[0.03] border-white/5 hover:\${theme.border}\`
              }\`}`;

const newCard = `              className={\`group flex items-center p-5 rounded-2xl border transition-all cursor-pointer \${
                quest.completed 
                  ? 'bg-emerald-900/40 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:bg-emerald-900/60' 
                  : \`bg-white/[0.03] border-white/5 hover:\${theme.border}\`
              }\`}`;
fileStr = fileStr.replace(oldCard, newCard);

const oldToggle = `                  if (allWillBeCompleted) {
                    confetti({
                      particleCount: 100,
                      spread: 70,
                      origin: { y: 0.6 },
                      colors: ['#10b981', '#34d399', '#059669']
                    });
                  }
                  showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                }`;

const newToggle = `                  if (allWillBeCompleted) {
                    confetti({
                      particleCount: 100,
                      spread: 70,
                      origin: { y: 0.6 },
                      colors: ['#10b981', '#34d399', '#059669']
                    });
                  }
                  try {
                    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
                    audio.volume = 0.5;
                    audio.play();
                  } catch(e) {}
                  showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                }`;
fileStr = fileStr.replace(oldToggle, newToggle);

const oldDesc = `                {qData.desc && (
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{qData.desc[lang]}</div>
                )}`;
const newDesc = `                {qData.desc && (
                  <div className={\`text-[10px] mt-1 uppercase tracking-wider \${quest.completed ? 'text-emerald-500/80' : 'text-slate-500'}\`}>{qData.desc[lang]}</div>
                )}`;
fileStr = fileStr.replace(oldDesc, newDesc);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
