const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { RANKS, UI, SSR_CHALLENGES } from '../data';",
  "import { RANKS, UI, SSR_CHALLENGES } from '../data';\nimport { getRankTheme } from '../utils';"
);

const oldRankColor = `  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'F': return 'text-slate-400 border-slate-500/50 bg-slate-800';
      case 'E': return 'text-emerald-400 border-emerald-500/50 bg-slate-800';
      case 'D': return 'text-blue-400 border-blue-500/50 bg-slate-800';
      case 'C': return 'text-purple-400 border-purple-500/50 bg-slate-800';
      case 'B': return 'text-pink-400 border-pink-500/50 bg-slate-800';
      case 'A': return 'text-red-500 border-red-500/50 bg-slate-800';
      case 'S': return 'text-orange-400 border-orange-500/50 bg-slate-800';
      case 'SS': return 'text-orange-400 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.5)] bg-slate-800';
      case 'SSR': return 'text-white border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.8)] bg-slate-800';
      default: return 'text-emerald-400 border-emerald-500/50 bg-slate-800';
    }
  };

  const rankStyle = getRankColor(progress.currentRank);`;

fileStr = fileStr.replace(oldRankColor, `  const theme = getRankTheme(progress.currentRank);
  const rankStyle = \`\${theme.text} \${theme.border} \${theme.bg} \${theme.glow}\`;`);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
