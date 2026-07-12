const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { SettingsModal } from './components/SettingsModal';",
  "import { SettingsModal } from './components/SettingsModal';\nimport { CalibrationModal } from './components/CalibrationModal';"
);

fileStr = fileStr.replace(
  "const [isSettingsOpen, setIsSettingsOpen] = useState(false);",
  "const [isSettingsOpen, setIsSettingsOpen] = useState(false);\n  const [showCalibration, setShowCalibration] = useState(false);"
);

const oldOnboarding = `  if (!state.user) {
    return <Onboarding onComplete={completeOnboarding} state={state} onSetLanguage={setLanguage} />;
  }`;

const newOnboarding = `  const handleOnboardingComplete = (user: any) => {
    completeOnboarding(user);
    setShowCalibration(true);
  };

  if (!state.user) {
    return <Onboarding onComplete={handleOnboardingComplete} state={state} onSetLanguage={setLanguage} />;
  }`;

fileStr = fileStr.replace(oldOnboarding, newOnboarding);

const newModal = `      <CalibrationModal 
        isOpen={showCalibration} 
        onClose={() => setShowCalibration(false)} 
        state={state} 
        onComplete={(rank) => {
          forceRank(rank);
          setShowCalibration(false);
        }} 
      />`;

fileStr = fileStr.replace(
  "</Layout>",
  `</Layout>\n${newModal}`
);

fs.writeFileSync('src/App.tsx', fileStr);
