const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { SettingsModal } from './components/SettingsModal';",
  "import { SettingsModal } from './components/SettingsModal';\nimport { showSystemToast } from './toast';"
);

const levelUpSuccess = `  const handleChallengeSuccess = (newRank: Rank) => {
    levelUp(newRank);
    setShowChallenge(false);
  };`;

const newLevelUpSuccess = `  const handleChallengeSuccess = (newRank: Rank) => {
    levelUp(newRank);
    setShowChallenge(false);
    showSystemToast(state.language === 'ru' ? \`[СИСТЕМА] Ранг повышен до \${newRank}\` : \`[SYSTEM] Rank up to \${newRank}\`, 'level_up');
  };`;

fileStr = fileStr.replace(levelUpSuccess, newLevelUpSuccess);

fs.writeFileSync('src/App.tsx', fileStr);
