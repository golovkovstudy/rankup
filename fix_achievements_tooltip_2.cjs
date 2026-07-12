const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

const actLogOld = `        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
          {lang === 'ru' ? 'Активность' : 'Activity Log'}
        </h2>`;
const actLogNew = `        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
            {lang === 'ru' ? 'Активность' : 'Activity Log'}
          </h2>
          <div className="group relative flex items-center">
            <Info size={16} className="text-slate-500 cursor-pointer hover:text-emerald-400 transition-colors" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-800 border border-slate-600 rounded-xl text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center shadow-xl font-bold uppercase tracking-widest leading-relaxed">
              {lang === 'ru' ? 'Сетка активности показывает дни, когда вы выполняли задания. Чем ярче зеленый, тем больше заданий выполнено!' : 'Activity heatmap shows days you completed quests. Brighter green means more quests completed!'}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-600"></div>
            </div>
          </div>
        </div>`;

fileStr = fileStr.replace(actLogOld, actLogNew);

if(!fileStr.includes("import { Lock, Award, Shield, Trophy, Target, Info } from 'lucide-react';")) {
    fileStr = fileStr.replace("import { Lock, Award, Shield, Trophy, Target } from 'lucide-react';", "import { Lock, Award, Shield, Trophy, Target, Info } from 'lucide-react';");
}
fs.writeFileSync('src/components/Achievements.tsx', fileStr);
