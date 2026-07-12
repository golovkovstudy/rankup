const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

fileStr = fileStr.replace(
  "import React from 'react';",
  "import React, { useState } from 'react';"
);

fileStr = fileStr.replace(
  "const lang = state.language;",
  "const [guideQuestId, setGuideQuestId] = useState<string | null>(null);\n  const lang = state.language;"
);

// Add the info button next to the title
const questItem = `              <div className="flex-1">
                <h4 className={\`font-bold \${quest.completed ? 'opacity-70 line-through' : ''}\`}>{qData.title[lang]}</h4>
                {qData.desc && (
                  <p className={\`text-xs mt-1 \${quest.completed ? 'text-slate-500 line-through' : 'text-slate-400'}\`}>
                    {qData.desc[lang]}
                  </p>
                )}
              </div>`;

const questItemWithGuide = `              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className={\`font-bold \${quest.completed ? 'opacity-70 line-through' : ''}\`}>{qData.title[lang]}</h4>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setGuideQuestId(qData.id); }}
                    className="text-slate-500 hover:text-emerald-400 p-1 rounded-full hover:bg-slate-800 transition-colors"
                  >
                    <Info size={14} />
                  </button>
                </div>
                {qData.desc && (
                  <p className={\`text-xs mt-1 \${quest.completed ? 'text-slate-500 line-through' : 'text-slate-400'}\`}>
                    {qData.desc[lang]}
                  </p>
                )}
              </div>`;

fileStr = fileStr.replace(questItem, questItemWithGuide);

// Add the modal component at the end of the return statement
const modalStr = `      {guideQuestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setGuideQuestId(null)}></div>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-sm w-full relative z-10"
          >
            <h3 className="text-xl font-bold uppercase mb-4 text-emerald-400 border-b border-white/10 pb-4">
              {lang === 'ru' ? 'Техника выполнения' : 'Execution Guide'}
            </h3>
            <div className="space-y-4 text-sm text-slate-300">
              {guideQuestId.includes('pushup') ? (
                <p>{lang === 'ru' ? 'Держите тело ровно. Опускайтесь до касания грудью пола. Локти под углом 45 градусов к телу. Если тяжело — выполняйте с колен или от скамьи.' : 'Keep body straight. Lower until chest touches the floor. Elbows at 45 degrees. If too hard, do knee pushups or incline pushups.'}</p>
              ) : guideQuestId.includes('pullup') ? (
                <p>{lang === 'ru' ? 'Полная амплитуда: подбородок выше турника, внизу руки прямые. Если не получается — используйте резину или делайте австралийские подтягивания (тяги).' : 'Full range: chin over bar, dead hang at bottom. If unable, use a resistance band or do bodyweight rows.'}</p>
              ) : guideQuestId.includes('run') ? (
                <p>{lang === 'ru' ? 'Держите ровный темп. Не стартуйте слишком быстро. Следите за пульсом, дышите ритмично.' : 'Keep an even pace. Do not start too fast. Monitor heart rate, breathe rhythmically.'}</p>
              ) : guideQuestId.includes('squat') ? (
                <p>{lang === 'ru' ? 'Спина прямая, колени не выходят за носки (или слегка выходят, если позволяет мобильность). Приседайте ниже параллели.' : 'Keep back straight, squat below parallel. Engage your core.'}</p>
              ) : (
                <p>{lang === 'ru' ? 'Следите за техникой, не спешите. Качество важнее количества.' : 'Focus on technique, do not rush. Quality over quantity.'}</p>
              )}
            </div>
            <button 
              onClick={() => setGuideQuestId(null)}
              className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold p-3 rounded-xl transition-colors uppercase text-xs tracking-widest"
            >
              {lang === 'ru' ? 'Понятно' : 'Understood'}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );`;

fileStr = fileStr.replace(/    <\/div>\s*<\/div>\s*\);\s*}\s*$/g, "    </div>\n" + modalStr + "\n}");

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
