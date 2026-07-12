const fs = require('fs');

let fileStr = fs.readFileSync('src/components/DebugMenu.tsx', 'utf8');

fileStr = fileStr.replace('export function Settings', 'export function DebugMenu');
fileStr = fileStr.replace('interface SettingsProps', 'interface DebugMenuProps');
fileStr = fileStr.replace('DebugMenuProps {', 'DebugMenuProps {');
fileStr = fileStr.replace('DebugMenu({ state, onImport, onReset, onSetLanguage, onForceRank, onForcePhase, onTestChallenge, onSetDebugDay }: SettingsProps)', 'DebugMenu({ state, onImport, onReset, onSetLanguage, onForceRank, onForcePhase, onTestChallenge, onSetDebugDay }: DebugMenuProps)');

// Remove the import/export stuff from DebugMenu as they belong to user settings.
// Actually, let's just create a new SettingsModal and keep DebugMenu mostly as is, just stripping out Language/Import/Export/Danger Zone.
fs.writeFileSync('src/components/DebugMenu.tsx', fileStr);
