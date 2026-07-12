const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');

fileStr = fileStr.replace(
  "import { CalibrationModal } from './components/CalibrationModal';",
  "import { CalibrationModal } from './components/CalibrationModal';\nimport { UpdateBodyModal } from './components/UpdateBodyModal';"
);

fileStr = fileStr.replace(
  "  const [showCalibration, setShowCalibration] = useState(false);",
  "  const [showCalibration, setShowCalibration] = useState(false);\n  const [showUpdateBody, setShowUpdateBody] = useState(false);\n\n  useEffect(() => {\n    const handleOpenUpdateBody = () => setShowUpdateBody(true);\n    document.addEventListener('open-update-body', handleOpenUpdateBody);\n    return () => document.removeEventListener('open-update-body', handleOpenUpdateBody);\n  }, []);"
);

// Destructure updateBodyMetrics from useAppStore
fileStr = fileStr.replace(
  "    generateSSRChallenge\n  } = useAppStore();",
  "    generateSSRChallenge,\n    updateBodyMetrics\n  } = useAppStore();"
);

// Render UpdateBodyModal
const targetRender = `      <CalibrationModal 
        isOpen={showCalibration} `;
        
const replaceRender = `      <UpdateBodyModal
        isOpen={showUpdateBody}
        onClose={() => setShowUpdateBody(false)}
        state={state}
        onUpdate={updateBodyMetrics}
      />
      <CalibrationModal 
        isOpen={showCalibration} `;

fileStr = fileStr.replace(targetRender, replaceRender);

fs.writeFileSync('src/App.tsx', fileStr);
