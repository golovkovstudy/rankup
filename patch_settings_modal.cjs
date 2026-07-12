const fs = require('fs');
let fileStr = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');

const target1 = `  onSetRestDay: (day: number) => void;
}`;
const replacement1 = `  onSetRestDay: (day: number) => void;
  onUpdateInventory: (inventory: string[]) => void;
}`;
fileStr = fileStr.replace(target1, replacement1);

const target2 = `export function SettingsModal({ isOpen, onClose, state, onSetLanguage, onImport, onReset, onSetRestDay, onStartCalibration }: SettingsModalProps & { onStartCalibration?: () => void }) {`;
const replacement2 = `export function SettingsModal({ isOpen, onClose, state, onSetLanguage, onImport, onReset, onSetRestDay, onUpdateInventory, onStartCalibration }: SettingsModalProps & { onStartCalibration?: () => void }) {`;
fileStr = fileStr.replace(target2, replacement2);

fs.writeFileSync('src/components/SettingsModal.tsx', fileStr);
