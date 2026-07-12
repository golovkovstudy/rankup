const fs = require('fs');
let fileStr = fs.readFileSync('src/components/LevelUpChallenge.tsx', 'utf8');

const targetRender = `                onClick={() => incrementTask(task.id, task.count)}
                className={\`group flex items-center p-4 rounded-2xl border transition-all \${
                  hasStarted ? 'cursor-pointer active:scale-[0.98]' : 'opacity-50'
                } \${
                  isCompleted 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]'
                }\`}
              >
                <div className="flex-1">
                  <div className={\`font-bold text-lg \${isCompleted ? 'text-emerald-400 opacity-70' : 'text-slate-100'}\`}>
                    {task.title[lang]}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    {lang === 'ru' ? 'Цель:' : 'Target:'} {task.count}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black italic tracking-tighter">
                    <span className={isCompleted ? 'text-emerald-400' : 'text-white'}>{currentCount}</span>
                    <span className="text-slate-600">/{task.count}</span>
                  </div>
                  {isCompleted && (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                  )}
                </div>
              </div>`;

const replaceRender = `                className={\`group p-4 rounded-2xl border transition-all \${
                  hasStarted ? '' : 'opacity-50 pointer-events-none'
                } \${
                  isCompleted 
                    ? 'bg-emerald-500/10 border-emerald-500/20' 
                    : 'bg-white/[0.03] border-white/5'
                }\`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className={\`font-bold text-lg \${isCompleted ? 'text-emerald-400 opacity-70' : 'text-slate-100'}\`}>
                      {task.title[lang]}
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                      {lang === 'ru' ? 'Цель:' : 'Target:'} {task.count}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-black italic tracking-tighter">
                      <span className={isCompleted ? 'text-emerald-400' : 'text-white'}>{currentCount}</span>
                      <span className="text-slate-600">/{task.count}</span>
                    </div>
                    {isCompleted && (
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                      </div>
                    )}
                  </div>
                </div>
                {!isCompleted && hasStarted && (
                  <div className="flex gap-2">
                    {[1, 5, 10, 25].map(inc => {
                      if (task.count > 10 && inc === 1 && task.count > 50) return null;
                      if (inc > task.count) return null;
                      return (
                        <button
                          key={inc}
                          onClick={(e) => {
                            e.stopPropagation();
                            for(let i=0; i<inc; i++) incrementTask(task.id, task.count);
                          }}
                          className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 text-xs font-bold transition-colors active:scale-95"
                        >
                          +{inc}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>`;

fileStr = fileStr.replace(targetRender, replaceRender);

// Also we need to fix incrementTask to take value directly
const targetInc = `  const incrementTask = (taskId: string, targetCount: number) => {
    if (!hasStarted) return;
    setTaskCounts(prev => {
      const current = prev[taskId] || 0;
      if (current >= targetCount) return prev;
      return { ...prev, [taskId]: current + 1 };
    });
  };`;

const replaceInc = `  const incrementTask = (taskId: string, targetCount: number, amount: number = 1) => {
    if (!hasStarted) return;
    setTaskCounts(prev => {
      const current = prev[taskId] || 0;
      if (current >= targetCount) return prev;
      return { ...prev, [taskId]: Math.min(current + amount, targetCount) };
    });
  };`;

fileStr = fileStr.replace(targetInc, replaceInc);
fileStr = fileStr.replace(/for\(let i=0; i<inc; i\+\+\) incrementTask\(task.id, task.count\);/, "incrementTask(task.id, task.count, inc);");

fs.writeFileSync('src/components/LevelUpChallenge.tsx', fileStr);
