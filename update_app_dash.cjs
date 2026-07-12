const fs = require('fs');

// Update App.tsx
let appStr = fs.readFileSync('src/App.tsx', 'utf8');

const dashPropsOld = `<Dashboard 
            state={state} 
            onToggleQuest={toggleQuest} 
            onStartChallenge={() => setShowChallenge(true)} 
            onGenerateSSRChallenge={generateSSRChallenge}
          />`;

const dashPropsNew = `<Dashboard 
            state={state} 
            onToggleQuest={toggleQuest} 
            onStartChallenge={() => setShowChallenge(true)} 
            onGenerateSSRChallenge={generateSSRChallenge}
            onAddCustomQuest={addCustomQuest}
            onDeleteCustomQuest={deleteCustomQuest}
          />`;
appStr = appStr.replace(dashPropsOld, dashPropsNew);

const destructureOld = `const { 
    state, 
    toggleQuest, 
    completeOnboarding, 
    levelUp, 
    setFailedChallenge, 
    importData, 
    resetData, 
    setLanguage, 
    clearPenaltyAlert,
    setRestDay,
    forceRank,
    forcePhase,
    setDebugDayOverride,
    generateSSRChallenge,
  } = useStore();`;

const destructureNew = `const { 
    state, 
    toggleQuest, 
    completeOnboarding, 
    levelUp, 
    setFailedChallenge, 
    importData, 
    resetData, 
    setLanguage, 
    clearPenaltyAlert,
    setRestDay,
    forceRank,
    forcePhase,
    setDebugDayOverride,
    generateSSRChallenge,
    addCustomQuest,
    deleteCustomQuest
  } = useStore();`;
appStr = appStr.replace(destructureOld, destructureNew);

fs.writeFileSync('src/App.tsx', appStr);

// Update Dashboard.tsx
let dashStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const propsOld = `interface DashboardProps {
  state: AppState;
  onToggleQuest: (id: string) => void;
  onStartChallenge: () => void;
  onGenerateSSRChallenge: () => void;
}`;

const propsNew = `interface DashboardProps {
  state: AppState;
  onToggleQuest: (id: string) => void;
  onStartChallenge: () => void;
  onGenerateSSRChallenge: () => void;
  onAddCustomQuest: (title: string) => void;
  onDeleteCustomQuest: (id: string) => void;
}`;
dashStr = dashStr.replace(propsOld, propsNew);

const declOld = `export function Dashboard({ state, onToggleQuest, onStartChallenge, onGenerateSSRChallenge }: DashboardProps) {`;
const declNew = `export function Dashboard({ state, onToggleQuest, onStartChallenge, onGenerateSSRChallenge, onAddCustomQuest, onDeleteCustomQuest }: DashboardProps) {`;
dashStr = dashStr.replace(declOld, declNew);

const logicOld = `  const allQuestsCompleted = dailyQuests.length > 0 && dailyQuests.every(q => q.completed);`;
const logicNew = `  const requiredQuests = dailyQuests.filter(q => !q.isCustom);
  const allQuestsCompleted = requiredQuests.length > 0 && requiredQuests.every(q => q.completed);`;
dashStr = dashStr.replace(logicOld, logicNew);

fs.writeFileSync('src/components/Dashboard.tsx', dashStr);
