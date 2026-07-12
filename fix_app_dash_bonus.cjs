const fs = require('fs');

// Update App.tsx
let appStr = fs.readFileSync('src/App.tsx', 'utf8');
appStr = appStr.replace(/addCustomQuest/g, 'addBonusQuest');
appStr = appStr.replace(/onAddCustomQuest=\{addBonusQuest\}/, 'onAddBonusQuest={addBonusQuest}');
fs.writeFileSync('src/App.tsx', appStr);

// Update Dashboard.tsx
let dashStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

dashStr = dashStr.replace(/onAddCustomQuest: \(title: string\) => void;/, 'onAddBonusQuest: () => void;');
dashStr = dashStr.replace(/onAddCustomQuest, onDeleteCustomQuest/, 'onAddBonusQuest, onDeleteCustomQuest');
dashStr = dashStr.replace(/onAddCustomQuest, onDeleteCustomQuest/, 'onAddBonusQuest, onDeleteCustomQuest');

// Remove customTaskInput state
dashStr = dashStr.replace(/  const \[customTaskInput, setCustomTaskInput\] = useState\(''\);\n/, '');

// Fix getQuestData logic
const oldGetQuestData = `  const getQuestData = (quest: any) => {
    const id = quest.id;
    if (quest.isCustom) {
      return {
        id: quest.id,
        title: { en: quest.customTitle, ru: quest.customTitle },
        desc: { en: 'Optional Custom Task', ru: 'Дополнительное кастомное задание' },
        isCustom: true
      };
    }`;

const newGetQuestData = `  const getQuestData = (quest: any) => {
    const id = quest.originalId || quest.id;
    if (id === 'rest_day_quest') {
      return {
        id: 'rest_day_quest',
        title: { en: t.rest_quest_title, ru: t.rest_quest_title },
        desc: null,
        isCustom: quest.isCustom
      };
    }
    if (isSSR) {
      const challenge = SSR_CHALLENGES.find((c: any) => c.id === id);
      return challenge ? { id: challenge.id, title: challenge.title, desc: challenge.desc, isCustom: quest.isCustom } : null;
    }
    const qData = currentRankConfig.quests.find(q => q.id === id);
    if (!qData) return null;
    let currentDesc = qData.desc;
    if (phase === 'III' && qData.desc_phase3) currentDesc = qData.desc_phase3;
    else if ((phase === 'II' || phase === 'III') && qData.desc_phase2) currentDesc = qData.desc_phase2;
    
    let title = { ...qData.title };
    if (state.user?.gender === 'female') {
      if (id.includes('pushups') || title.en.toLowerCase().includes('pushup')) {
        title = { en: title.en.replace('Push-ups', 'Knee Push-ups').replace('push-ups', 'knee push-ups'), ru: title.ru.replace('Отжимания', 'Отжимания с колен').replace('отжимания', 'отжимания с колен') };
      }
      if (id.includes('pullups') || title.en.toLowerCase().includes('pull-up')) {
        title = { en: title.en.replace('Pull-ups', 'Australian Pull-ups').replace('pull-ups', 'Australian pull-ups'), ru: title.ru.replace('Подтягивания', 'Австралийские подтягивания').replace('подтягивания', 'австралийские подтягивания') };
      }
    }
    
    return {
      id: quest.id,
      title: title,
      desc: currentDesc,
      isCustom: quest.isCustom
    };
  };`;

// replace getQuestData completely (this requires matching the whole old func)
dashStr = dashStr.replace(/  const getQuestData = \(quest: any\) => \{[\s\S]*?    return \{ \.\.\.qData, title, desc: currentDesc \};\n  \};/, newGetQuestData);

// Remove the text input form and replace with a "Get random bonus task" button
const oldForm = `          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (customTaskInput.trim()) {
                onAddCustomQuest(customTaskInput.trim());
                setCustomTaskInput('');
              }
            }}
            className="flex items-center mt-2 group"
          >
            <input 
              type="text" 
              value={customTaskInput}
              onChange={e => setCustomTaskInput(e.target.value)}
              placeholder={lang === 'ru' ? '+ Добавить свое задание (по желанию)...' : '+ Add custom task (optional)...'}
              className="flex-1 bg-white/[0.02] border border-white/5 rounded-l-2xl p-5 text-sm outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-white placeholder-slate-600"
            />
            <button 
              type="submit"
              disabled={!customTaskInput.trim()}
              className="bg-slate-800 border-y border-r border-white/5 p-5 rounded-r-2xl text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <Plus size={20} />
            </button>
          </form>`;

const newForm = `          {!isSSR && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onAddBonusQuest}
              className="w-full flex items-center justify-center gap-2 p-4 mt-2 rounded-2xl bg-white/[0.02] border border-white/5 border-dashed text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
            >
              <Plus size={18} />
              <span className="text-sm font-bold tracking-widest uppercase">{lang === 'ru' ? 'Получить доп. задание' : 'Get bonus quest'}</span>
            </motion.button>
          )}`;

dashStr = dashStr.replace(oldForm, newForm);
fs.writeFileSync('src/components/Dashboard.tsx', dashStr);

