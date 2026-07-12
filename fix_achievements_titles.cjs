const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const trophyDivRegex = /<motion\.div\s+key=\{trophy\.id\}[\s\S]*?<\/motion\.div>/g;
// I shouldn't use regex if I don't know the exact structure, let's just replace inside TROPHIES.map

let replacement = `            return (
              <motion.div 
                key={trophy.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={\`p-4 rounded-2xl border flex flex-col items-center text-center transition-all \${
                  isUnlocked 
                    ? \`bg-gradient-to-br \${tierClass}\` 
                    : 'bg-slate-900/50 border-white/5 grayscale opacity-60'
                }\`}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-black/20">
                  {!isUnlocked ? <Lock size={20} className="text-slate-500" /> : <div className="text-2xl">🏆</div>}
                </div>
                <h3 className="font-bold text-sm mb-1 leading-tight">{trophy.title[lang]}</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-70 mb-3">{trophy.desc[lang]}</p>
                
                {isUnlocked && (
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('equipTitle', { detail: trophy.title[lang] }))}
                    className={\`mt-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors \${state.user?.selectedTitle === trophy.title[lang] ? 'bg-white text-black' : 'bg-black/30 hover:bg-black/50 text-white'}\`}
                  >
                    {state.user?.selectedTitle === trophy.title[lang] ? (lang === 'ru' ? 'Выбрано' : 'Equipped') : (lang === 'ru' ? 'Выбрать титул' : 'Equip Title')}
                  </button>
                )}

                {!isUnlocked && trophy.req.type !== 'rank' && (
                  <div className="w-full mt-auto">
                    <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <div 
                        className={\`h-full \${theme.bg.replace('/20', '/80')} \${theme.glow}\`}
                        style={{ width: \`\${Math.min(100, (progress.current / progress.target) * 100)}%\` }}
                      />
                    </div>
                    <div className={\`text-[10px] font-bold mt-1.5 \${theme.text}\`}>
                      {Math.floor(progress.current)} / {progress.target}
                    </div>
                  </div>
                )}
                {!isUnlocked && trophy.req.type === 'rank' && (
                  <div className="w-full mt-auto">
                    <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <div 
                        className={\`h-full \${theme.bg.replace('/20', '/80')} \${theme.glow}\`}
                        style={{ width: \`\${Math.min(100, (progress.current / progress.target) * 100)}%\` }}
                      />
                    </div>
                    <div className={\`text-[10px] font-bold mt-1.5 \${theme.text}\`}>
                      Rank {state.progress.currentRank} / {trophy.req.rank}
                    </div>
                  </div>
                )}
              </motion.div>
            );`;

// Let's use string split to inject the equip button
let parts = fileStr.split("{!isUnlocked && trophy.req.type !== 'rank' && (");
if (parts.length === 2) {
  const injection = `
                {isUnlocked && (
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('equipTitle', { detail: trophy.title[lang] }))}
                    className={\`mt-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors \${state.user?.selectedTitle === trophy.title[lang] ? 'bg-white text-black' : 'bg-black/30 hover:bg-black/50 text-white'}\`}
                  >
                    {state.user?.selectedTitle === trophy.title[lang] ? (lang === 'ru' ? 'Выбрано' : 'Equipped') : (lang === 'ru' ? 'Выбрать титул' : 'Equip Title')}
                  </button>
                )}
                {!isUnlocked && trophy.req.type !== 'rank' && (`;
  fileStr = parts[0] + injection + parts[1];
  fs.writeFileSync('src/components/Achievements.tsx', fileStr);
}
