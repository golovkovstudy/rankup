/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from './store';
import { Onboarding } from './components/Onboarding';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Statistics } from './components/Statistics';
import { Achievements } from './components/Achievements';
import { DebugMenu } from './components/DebugMenu';
import { SettingsModal } from './components/SettingsModal';
import { RestTimer } from './components/RestTimer';
import { CalibrationModal } from './components/CalibrationModal';
import { UpdateBodyModal } from './components/UpdateBodyModal';
import { showSystemToast } from './toast';
import { SystemToasts } from './components/SystemToasts';
import { LevelUpChallenge } from './components/LevelUpChallenge';
import { Rank } from './types';
import { UI } from './data';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { 
    state, 
    completeOnboarding, 
    toggleQuest, 
    levelUp, 
    setFailedChallenge,
    importData,
    setRestDay,
    updateInventory,
    resetData,
    setLanguage,
    clearPenaltyAlert,
    forceRank,
    forcePhase,
    setDebugDayOverride,
    generateSSRChallenge,
    addBonusQuest,
    deleteCustomQuest,
    updateBodyMetrics,
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'achievements' | 'statistics' | 'settings'>('dashboard');
  const [showChallenge, setShowChallenge] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showCalibration, setShowCalibration] = useState(false);  const [showUpdateBody, setShowUpdateBody] = useState(false);  useEffect(() => {    if (showCalibration) {      setIsSettingsOpen(false);    }  }, [showCalibration]);  useEffect(() => {    const handleOpenUpdateBody = () => setShowUpdateBody(true);
    document.addEventListener('open-update-body', handleOpenUpdateBody);
    return () => document.removeEventListener('open-update-body', handleOpenUpdateBody);
  }, []);

  const t = UI[state.language];

  // If no user profile exists, show onboarding
  const handleOnboardingComplete = (user: any) => {
    completeOnboarding(user);
    setShowCalibration(true);
  };

  if (!state.user) {
    return <Onboarding onComplete={handleOnboardingComplete} state={state} onSetLanguage={setLanguage} />;
  }

  const handleChallengeSuccess = (newRank: Rank) => {
    levelUp(newRank);
    setShowChallenge(false);
    showSystemToast(state.language === 'ru' ? `[СИСТЕМА] Ранг повышен до ${newRank}` : `[SYSTEM] Rank up to ${newRank}`, 'level_up');
  };

  const handleChallengeFail = () => {
    setFailedChallenge();
    setShowChallenge(false);
  };

  const handleTestChallenge = () => {
    setActiveTab('dashboard');
    setShowChallenge(true);
  };

  return (
    <>
      <SystemToasts />
      <Layout activeTab={activeTab} setActiveTab={setActiveTab} state={state} setLanguage={setLanguage} onOpenSettings={() => setIsSettingsOpen(true)}>
        {activeTab === 'dashboard' && (
          <Dashboard 
            state={state} 
            onToggleQuest={toggleQuest} 
            onStartChallenge={() => setShowChallenge(true)} 
            onGenerateSSRChallenge={generateSSRChallenge}
            onAddBonusQuest={addBonusQuest}
            onDeleteCustomQuest={deleteCustomQuest}
          />
        )}
        {activeTab === 'achievements' && <Achievements state={state} />}
        {activeTab === 'statistics' && <Statistics state={state} />}
        {activeTab === 'settings' && (
          <DebugMenu 
            state={state} 
            onImport={importData} 
            onReset={resetData} 
            onSetLanguage={setLanguage}
            onForceRank={forceRank}
            onForcePhase={forcePhase}
            onTestChallenge={handleTestChallenge}
            onSetDebugDay={setDebugDayOverride}
          />
        )}
      </Layout>
      <UpdateBodyModal
        isOpen={showUpdateBody}
        onClose={() => setShowUpdateBody(false)}
        state={state}
        onUpdate={updateBodyMetrics}
      />
      <CalibrationModal 
        isOpen={showCalibration} 
        onClose={() => setShowCalibration(false)} 
        state={state} 
        onComplete={(rank) => {
          forceRank(rank);
          setShowCalibration(false);
        }} 
      />
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        state={state} 
        onSetLanguage={setLanguage} 
        onImport={importData} 
        onReset={resetData} 
        onSetRestDay={setRestDay}
        onUpdateInventory={updateInventory}
         onStartCalibration={() => setShowCalibration(true)} 
      />

      {showChallenge && (
        <LevelUpChallenge 
          state={state} 
          onSuccess={handleChallengeSuccess} 
          onFail={handleChallengeFail}
          onCancel={() => setShowChallenge(false)} 
        />
      )}

      <AnimatePresence>
        {state.penaltyAlert && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 bg-red-950/90 backdrop-blur-md border border-red-500/50 rounded-2xl p-4 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-500/20 rounded-full text-red-400">
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-widest">{t.penalty_title}</h4>
                <p className="text-xs text-red-200/70 mt-1">
                  {state.penaltyAlert === 'full' ? t.penalty_full : t.penalty_partial}
                </p>
              </div>
              <button onClick={clearPenaltyAlert} className="text-red-400 hover:text-red-300">
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
