const fs = require('fs');
let fileStr = fs.readFileSync('src/components/SettingsModal.tsx', 'utf8');

fileStr = fileStr.replace(
  "export function SettingsModal({ isOpen, onClose, state, onSetLanguage, onImport, onReset, onSetRestDay }: SettingsModalProps) {",
  "export function SettingsModal({ isOpen, onClose, state, onSetLanguage, onImport, onReset, onSetRestDay, onStartCalibration }: SettingsModalProps & { onStartCalibration?: () => void }) {"
);

fileStr = fileStr.replace(
  "import { X, Download, Upload, Trash2 } from 'lucide-react';",
  "import { X, Download, Upload, Trash2, Target } from 'lucide-react';"
);

const btnStr = `            {/* Calibration */}
            <div>
              <h3 className="text-[10px] text-emerald-500 uppercase tracking-tighter mb-3 border-b border-white/5 pb-2">{lang === 'ru' ? 'Калибровка' : 'Calibration'}</h3>
              <button 
                onClick={() => {
                  if (onStartCalibration) {
                    onClose();
                    onStartCalibration();
                  }
                }}
                className="w-full bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-400 font-bold p-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest border border-emerald-900/50"
              >
                <Target size={16} />
                {lang === 'ru' ? 'Пересдать тест' : 'Retake Test'}
              </button>
            </div>
            
            {/* Danger Zone */}`;

fileStr = fileStr.replace("{/* Danger Zone */}", btnStr);

fs.writeFileSync('src/components/SettingsModal.tsx', fileStr);
