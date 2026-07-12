const fs = require('fs');
let fileStr = fs.readFileSync('src/components/DebugMenu.tsx', 'utf8');

fileStr = fileStr.replace(
  "import React, { useRef } from 'react';",
  "import React, { useRef, useState } from 'react';"
);

fileStr = fileStr.replace(
  "  const fileInputRef = useRef<HTMLInputElement>(null);",
  "  const fileInputRef = useRef<HTMLInputElement>(null);\n  const [showConfirm, setShowConfirm] = useState(false);"
);

const resetFunction = `  const handleResetConfirm = () => {
    if (confirm(t.confirm_reset)) {
      onReset();
    }
  };`;

fileStr = fileStr.replace(resetFunction, "");

const resetButtonUI = `<button 
              onClick={handleResetConfirm}
              className="w-full bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-400 font-bold p-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest"
            >
              <Trash2 size={16} />
              {t.reset_progress}
            </button>`;

const newResetButtonUI = `{!showConfirm ? (
              <button 
                onClick={() => setShowConfirm(true)}
                className="w-full bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-400 font-bold p-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-xs tracking-widest"
              >
                <Trash2 size={16} />
                {t.reset_progress}
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-xs text-red-400 text-center">{t.confirm_reset}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 font-bold p-3 rounded-xl transition-colors text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setShowConfirm(false);
                      onReset();
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-500 font-bold p-3 rounded-xl transition-colors text-xs"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}`;

fileStr = fileStr.replace(resetButtonUI, newResetButtonUI);

fs.writeFileSync('src/components/DebugMenu.tsx', fileStr);
