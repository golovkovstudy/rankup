const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { showSystemToast } from '../toast';",
  "import { showSystemToast } from '../toast';\nimport { getRankTheme } from '../utils';"
);

const rankColorFunc = `  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'F': return 'text-slate-400 border-slate-500/50 bg-slate-800';
      case 'E': return 'text-emerald-400 border-emerald-500/50 bg-slate-800';
      case 'D': return 'text-blue-400 border-blue-500/50 bg-slate-800';
      case 'C': return 'text-purple-400 border-purple-500/50 bg-slate-800';
      case 'B': return 'text-orange-400 border-orange-500/50 bg-slate-800';
      case 'A': return 'text-red-400 border-red-500/50 bg-slate-800';
      case 'S': return 'text-red-600 border-red-600/50 bg-slate-800';
      case 'SSR': return 'text-yellow-400 border-yellow-500/50 bg-slate-800';
      default: return 'text-emerald-400 border-emerald-500/50 bg-slate-800';
    }
  };`;

fileStr = fileStr.replace(rankColorFunc, "  const theme = getRankTheme(state.progress.currentRank);");

fileStr = fileStr.replace(
  `className={\`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest \${getRankColor(state.progress.currentRank)}\`}`,
  `className={\`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest \${theme.text} \${theme.border} bg-slate-800\`} style={{ boxShadow: \`0 0 15px \${theme.hex}33\` }}`
);

fileStr = fileStr.replace(
  `className="text-center p-4 border border-emerald-500/30 rounded-2xl bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]"`,
  `className={\`text-center p-4 border \${theme.border} rounded-2xl \${theme.bg} \${theme.glow}\`}`
);

fileStr = fileStr.replace(
  `? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]' 
                  : 'bg-white/[0.03] border-white/5 hover:border-emerald-500/30'`,
  `? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]' 
                  : \`bg-white/[0.03] border-white/5 hover:\${theme.border}\``
);

fileStr = fileStr.replace(
  `quest.completed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-500 border-white/10 group-hover:border-emerald-500/50'`,
  `quest.completed ? \`\${theme.bg} \${theme.text} \${theme.border}\` : \`bg-slate-800 text-slate-500 border-white/10 group-hover:\${theme.border}\``
);

fileStr = fileStr.replace(
  `<span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20">{t.completed}</span>`,
  `<span className={\`px-3 py-1 rounded \${theme.bg} \${theme.text} text-[10px] font-bold uppercase border \${theme.border}\`}>{t.completed}</span>`
);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
