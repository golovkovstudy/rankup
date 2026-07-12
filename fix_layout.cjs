const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Layout.tsx', 'utf8');

fileStr = fileStr.replace(
  "import React from 'react';",
  "import React, { useState } from 'react';"
);

fileStr = fileStr.replace(
  "const lang = state.language;",
  "const lang = state.language;\n  const [showPinPrompt, setShowPinPrompt] = useState(false);\n  const [pinInput, setPinInput] = useState('');"
);

const oldButton = `<button 
          onClick={() => {
            if (activeTab !== 'settings') {
              const pin = prompt('Enter Developer PIN:');
              if (pin === '7777') {
                setActiveTab('settings');
              } else if (pin !== null) {
                alert('Invalid PIN');
              }
            } else {
              setActiveTab('dashboard');
            }
          }}
          className="text-slate-500 hover:text-emerald-400 transition-colors"
        >
          <SettingsIcon size={24} />
        </button>`;

const newButton = `<button 
          onClick={() => {
            if (activeTab !== 'settings') {
              setShowPinPrompt(true);
            } else {
              setActiveTab('dashboard');
            }
          }}
          className="text-slate-500 hover:text-emerald-400 transition-colors"
        >
          <SettingsIcon size={24} />
        </button>`;

fileStr = fileStr.replace(oldButton, newButton);

const pinDialog = `{showPinPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-xs shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Enter PIN</h3>
            <input 
              type="password" 
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-center text-2xl tracking-widest text-white outline-none focus:border-emerald-500 mb-4"
              placeholder="****"
              autoFocus
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (pinInput === '7777') {
                    setActiveTab('settings');
                    setShowPinPrompt(false);
                    setPinInput('');
                  } else {
                    setPinInput('');
                  }
                }
              }}
            />
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setShowPinPrompt(false);
                  setPinInput('');
                }}
                className="flex-1 py-3 rounded-xl font-bold text-slate-400 bg-slate-800 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (pinInput === '7777') {
                    setActiveTab('settings');
                    setShowPinPrompt(false);
                    setPinInput('');
                  } else {
                    setPinInput('');
                  }
                }}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}`;

fileStr = fileStr.replace('</main>', `</main>\n      ${pinDialog}`);

fs.writeFileSync('src/components/Layout.tsx', fileStr);
