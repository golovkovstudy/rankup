const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { CheckCircle2, Circle, Flame, Award, ChevronRight } from 'lucide-react';",
  "import { CheckCircle2, Circle, Flame, Award, ChevronRight, Info } from 'lucide-react';"
);

const getQuestDataOld = `    const qData = currentRankConfig.quests.find(q => q.id === id);
    if (!qData) return null;
    let currentDesc = qData.desc;
    if (phase === 'III' && qData.desc_phase3) currentDesc = qData.desc_phase3;
    else if ((phase === 'II' || phase === 'III') && qData.desc_phase2) currentDesc = qData.desc_phase2;
    return { ...qData, desc: currentDesc };`;

const getQuestDataNew = `    const qData = currentRankConfig.quests.find(q => q.id === id);
    if (!qData) return null;
    let currentDesc = qData.desc;
    if (phase === 'III' && qData.desc_phase3) currentDesc = qData.desc_phase3;
    else if ((phase === 'II' || phase === 'III') && qData.desc_phase2) currentDesc = qData.desc_phase2;
    
    let title = { ...qData.title };
    if (state.user?.gender === 'female') {
      if (id.includes('pushups') || title.en.toLowerCase().includes('pushup')) {
        title = { en: title.en + ' (Knee/Incline)', ru: title.ru + ' (С колен/От скамьи)' };
      }
      if (id.includes('pullups') || title.en.toLowerCase().includes('pullup')) {
        title = { en: title.en.replace('Pullups', 'Bodyweight Rows').replace('Pull-ups', 'Rows'), ru: title.ru.replace('Подтягивания', 'Австралийские подтягивания') };
      }
    }
    return { ...qData, title, desc: currentDesc };`;

fileStr = fileStr.replace(getQuestDataOld, getQuestDataNew);

fileStr = fileStr.replace(
  "const [activeTab, setActiveTab] = useState<'dashboard' | 'achievements' | 'settings'>('dashboard');",
  "const [activeTab, setActiveTab] = useState<'dashboard' | 'achievements' | 'settings'>('dashboard');\n  const [guideQuestId, setGuideQuestId] = useState<string | null>(null);"
);

// We need to pass setGuideQuestId if we had it in Dashboard... Wait, Dashboard is a component.
// Dashboard state needs to be modified.

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
