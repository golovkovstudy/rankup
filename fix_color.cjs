const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Fix 1: Colorful completed quests
const oldCard = `              className={\`group flex items-center p-5 rounded-2xl border transition-all cursor-pointer \${
                quest.completed 
                  ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]' 
                  : \`bg-white/[0.03] border-white/5 hover:\${theme.border}\`
              }\`}`;

const newCard = `              className={\`group flex items-center p-5 rounded-2xl border transition-all cursor-pointer \${
                quest.completed 
                  ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20' 
                  : \`bg-white/[0.03] border-white/5 hover:\${theme.border}\`
              }\`}`;
fileStr = fileStr.replace(oldCard, newCard);

const oldIcon = `              <div className={\`w-10 h-10 rounded-xl flex items-center justify-center mr-4 border transition-colors \${
                quest.completed ? \`\${theme.bg} \${theme.text} \${theme.border}\` : \`bg-slate-800 text-slate-500 border-white/10 group-hover:\${theme.border}\`
              }\`}>`;

const newIcon = `              <div className={\`w-10 h-10 rounded-xl flex items-center justify-center mr-4 border transition-colors \${
                quest.completed ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : \`bg-slate-800 text-slate-500 border-white/10 group-hover:\${theme.border}\`
              }\`}>`;
fileStr = fileStr.replace(oldIcon, newIcon);

const oldTitle = `                <h4 className={\`font-bold \${quest.completed ? 'opacity-70 line-through' : ''}\`}>{qData.title[lang]}</h4>`;
const newTitle = `                <h4 className={\`font-bold \${quest.completed ? 'text-emerald-400 opacity-90' : 'text-white'}\`}>{qData.title[lang]}</h4>`;
fileStr = fileStr.replace(oldTitle, newTitle);

const oldBadge = `              {quest.completed ? (
                <span className={\`px-3 py-1 rounded \${theme.bg} \${theme.text} text-[10px] font-bold uppercase border \${theme.border}\`}>{t.completed}</span>
              ) : null}`;
const newBadge = `              {quest.completed ? (
                <span className={\`px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30\`}>{t.completed}</span>
              ) : null}`;
fileStr = fileStr.replace(oldBadge, newBadge);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
