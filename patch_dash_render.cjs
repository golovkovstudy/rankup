const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const regex = /\{dailyQuests\.map\(quest => \{\s*const qData = getQuestData\(quest\);\s*if \(!qData\) return null;\s*return \(\s*<motion\.div\s*key=\{quest\.id\}\s*whileTap=\{\{ scale: 0\.98 \}\}\s*onClick=\{\(e\) => \{\s*\/\/ Prevent toggle if clicking delete button\s*if \(\(e\.target as HTMLElement\)\.closest\('button\.delete-btn'\) \|\| \(e\.target as HTMLElement\)\.closest\('button\.info-btn'\)\) return;\s*const wasCompleted = quest\.completed;\s*onToggleQuest\(quest\.id\);\s*if \(!wasCompleted\) \{\s*const allWillBeCompleted = requiredQuests\.every\(q => q\.id === quest\.id \? true : q\.completed\);\s*if \(allWillBeCompleted\) \{\s*confetti\(\{\s*particleCount: 100,\s*spread: 70,\s*origin: \{ y: 0\.6 \},\s*colors: \['#10b981', '#34d399', '#059669'\]\s*\}\);\s*\}\s*try \{\s*const audio = new Audio\('https:\/\/assets\.mixkit\.co\/active_storage\/sfx\/2013\/2013-preview\.mp3'\);\s*audio\.volume = 0\.5;\s*audio\.play\(\);\s*\} catch\(e\) \{\}\s*showSystemToast\(lang === 'ru' \? '\[СИСТЕМА\] Задание выполнено' : '\[SYSTEM\] Quest Completed', 'success'\);\s*\}\s*\}\}\s*className=\{`group flex items-center p-5 rounded-2xl border transition-all cursor-pointer \$\{\s*quest\.completed\s*\? 'bg-emerald-900\/40 border-emerald-400\/60 shadow-\[0_0_15px_rgba\(16,185,129,0\.15\)\] hover:bg-emerald-900\/60'\s*: `bg-white\/\[0\.03\] border-white\/5 hover:\$\{theme\.border\}`\s*\}`\}\s*>\s*<div className=\{`w-10 h-10 rounded-xl flex items-center justify-center mr-4 border transition-colors \$\{\s*quest\.completed \? 'bg-emerald-500 text-white border-emerald-400 shadow-\[0_0_15px_rgba\(16,185,129,0\.5\)\]' : `bg-slate-800 text-slate-500 border-white\/10 group-hover:\$\{theme\.border\}`\s*\}`\}>\s*\{quest\.completed \? \(\s*<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"><\/path><\/svg>\s*\) : \(\s*<div className="w-4 h-4 rounded-full border-2 border-slate-700"><\/div>\s*\)\s*\}/;

const replacement = `{dailyQuests.map(quest => {
            const qData = getQuestData(quest);
            if (!qData) return null;
            
            const setsMatch = qData.desc ? qData.desc.en.match(/(\\d+)\\s*(?:x|х|sets?\\s*of)/i) : null;
            const maxSets = setsMatch ? parseInt(setsMatch[1], 10) : 1;
            const currentSets = quest.currentSets || 0;
            const hasSets = maxSets > 1;

            return (
            <motion.div
              key={quest.id}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('button.delete-btn') || (e.target as HTMLElement).closest('button.info-btn')) return;
                
                const wasCompleted = quest.completed;
                if (hasSets) {
                  onToggleQuest(quest.id, true, maxSets);
                  if (!wasCompleted && currentSets + 1 >= maxSets) {
                    const allWillBeCompleted = requiredQuests.every(q => q.id === quest.id ? true : q.completed);
                    if (allWillBeCompleted) {
                      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#34d399', '#059669'] });
                    }
                    try { const a = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'); a.volume=0.5; a.play(); } catch(e) {}
                    showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                  }
                } else {
                  onToggleQuest(quest.id, false, 1);
                  if (!wasCompleted) {
                    const allWillBeCompleted = requiredQuests.every(q => q.id === quest.id ? true : q.completed);
                    if (allWillBeCompleted) {
                      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#34d399', '#059669'] });
                    }
                    try { const a = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'); a.volume=0.5; a.play(); } catch(e) {}
                    showSystemToast(lang === 'ru' ? '[СИСТЕМА] Задание выполнено' : '[SYSTEM] Quest Completed', 'success');
                  }
                }
              }}
              className={\`group flex items-center p-5 rounded-2xl border transition-all cursor-pointer \${
                quest.completed 
                  ? 'bg-emerald-900/40 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:bg-emerald-900/60' 
                  : \`bg-white/[0.03] border-white/5 hover:\${theme.border}\`
              }\`}
            >
              <div className={\`w-12 h-12 rounded-xl flex flex-col items-center justify-center mr-4 border transition-colors \${
                quest.completed ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : \`bg-slate-800 text-slate-500 border-white/10 group-hover:\${theme.border}\`
              }\`}>
                {quest.completed ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                ) : hasSets ? (
                  <div className="flex flex-col items-center">
                    <Plus size={16} className="text-slate-400 mb-0.5 group-hover:text-white" />
                    <div className="text-[10px] font-bold leading-none text-slate-400 group-hover:text-white">{currentSets}/{maxSets}</div>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-700 group-hover:border-slate-500"></div>
                )}`;

fileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
