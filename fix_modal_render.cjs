const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

if (!fileStr.includes('ExerciseModal')) {
  fileStr = "import { ExerciseModal } from './ExerciseModal';\n" + fileStr;
  fileStr = fileStr.replace(
    "import { Trophy, ArrowRight, Activity, Calendar, Lock, Flame, CheckCircle2, ChevronRight, X, Trash2 } from 'lucide-react';",
    "import { Trophy, ArrowRight, Activity, Calendar, Lock, Flame, CheckCircle2, ChevronRight, X, Trash2, Info } from 'lucide-react';"
  );

  fileStr = fileStr.replace(
    "const rankStyle = `${theme.text} ${theme.border} ${theme.bg} ${theme.glow}`;",
    "const rankStyle = `${theme.text} ${theme.border} ${theme.bg} ${theme.glow}`;\n  const [infoQuest, setInfoQuest] = useState<any>(null);"
  );

  fileStr = fileStr.replace(
    "if ((e.target as HTMLElement).closest('button.delete-btn')) return;",
    "if ((e.target as HTMLElement).closest('button.delete-btn') || (e.target as HTMLElement).closest('button.info-btn')) return;"
  );

  const targetBadges = `              <div className="flex items-center gap-2">
                {quest.completed ? (
                  <span className={\`px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30\`}>{t.completed}</span>
                ) : null}`;

  const replaceBadges = `              <div className="flex items-center gap-2">
                <button 
                  className="info-btn p-2 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                  onClick={() => setInfoQuest(quest)}
                >
                  <Info size={18} />
                </button>
                {quest.completed ? (
                  <span className={\`px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30\`}>{t.completed}</span>
                ) : null}`;

  fileStr = fileStr.replace(targetBadges, replaceBadges);

  fileStr = fileStr.replace(
    "    </div>\n  );\n}",
    "      <ExerciseModal isOpen={!!infoQuest} onClose={() => setInfoQuest(null)} quest={infoQuest} state={state} />\n    </div>\n  );\n}"
  );
  
  fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
}
