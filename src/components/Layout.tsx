import React, { useState } from 'react';
import { Home, Trophy, BarChart2, Settings as SettingsIcon, User } from 'lucide-react';
import { AppState } from '../types';
import { UI } from '../data';
import { getRankTheme } from '../utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'achievements' | 'statistics' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'achievements' | 'statistics' | 'settings') => void;
  state: AppState;
  setLanguage: (lang: 'en' | 'ru') => void;
  onOpenSettings?: () => void;
}

export function Layout({ children, activeTab, setActiveTab, state, setLanguage, onOpenSettings }: LayoutProps) {
  const lang = state.language;
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const t = UI[lang];
  const theme = getRankTheme(state.progress.currentRank);

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 font-sans flex flex-col max-w-md mx-auto relative overflow-hidden selection:bg-emerald-500/30">
      <header className="px-6 py-6 border-b border-white/5 bg-slate-900/20 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
        <button 
          onClick={onOpenSettings}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <User size={24} />
        </button>
        <h1 className={`font-black italic text-3xl uppercase tracking-tighter leading-none ${theme.text}`} style={{ textShadow: `0 0 20px ${theme.hex}66` }}>
          RankUp
        </h1>
        <button 
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
        </button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-28">
        {children}
      </main>
      {showPinPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-xs shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Enter PIN</h3>
            <input 
              type="password" 
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              className={`w-full bg-slate-800 border border-slate-600 rounded-xl p-3 text-center text-2xl tracking-widest text-white outline-none focus:${theme.border} mb-4`}
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
      )}

      <nav className="border-t border-white/5 bg-slate-900/80 backdrop-blur-md pb-4 pt-2 px-6 fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 z-20 flex justify-around items-center h-20">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 p-2 w-20 transition-all ${activeTab === 'dashboard' ? `${theme.text} scale-110` : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Home size={24} />
          <span className="text-[10px] uppercase tracking-widest font-bold">{t.home}</span>
        </button>
        <button 
          onClick={() => setActiveTab('statistics')}
          className={`flex flex-col items-center gap-1 p-2 w-20 transition-all ${activeTab === 'statistics' ? `${theme.text} scale-110` : 'text-slate-500 hover:text-slate-300'}`}
        >
          <BarChart2 size={24} />
          <span className="text-[10px] uppercase tracking-widest font-bold">{t.statistics}</span>
        </button>
        <button 
          onClick={() => setActiveTab('achievements')}
          className={`flex flex-col items-center gap-1 p-2 w-20 transition-all ${activeTab === 'achievements' ? `${theme.text} scale-110` : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Trophy size={24} />
          <span className="text-[10px] uppercase tracking-widest font-bold">{t.trophies}</span>
        </button>
      </nav>
    </div>
  );
}
