const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const targetGrid = `              } else if (day.status === 'full') {
                classes += \`\${theme.bg} shadow-[0_0_10px_rgba(16,185,129,0.3)] border \${theme.border} transform hover:scale-110 z-10\`;
              }`;

const replaceGrid = `              } else if (day.status === 'full') {
                classes += "bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)] border border-emerald-400 transform hover:scale-110 z-10";
              }`;

const targetLegend = `             <div className="flex items-center gap-1.5">
                <div className={\`w-2.5 h-2.5 rounded-[2px] \${theme.bg} border \${theme.border}\`}></div>
                <span className={theme.text}>{lang === 'ru' ? 'Успех' : 'Success'}</span>
             </div>`;

const replaceLegend = `             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500/80 border border-emerald-400"></div>
                <span className="text-emerald-500">{lang === 'ru' ? 'Успех' : 'Success'}</span>
             </div>`;

fileStr = fileStr.replace(targetGrid, replaceGrid);
fileStr = fileStr.replace(targetLegend, replaceLegend);

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
