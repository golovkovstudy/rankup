import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Timer, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function RestTimer({ lang }: { lang: 'ru' | 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(90); // default 90s
  const [isActive, setIsActive] = useState(false);
  const [initialTime, setInitialTime] = useState(90);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(seconds => seconds - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setIsActive(false);
      // Play a sound when timer finishes
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(initialTime);
  };

  const adjustTime = (amount: number) => {
    const newTime = Math.max(10, initialTime + amount);
    setInitialTime(newTime);
    if (!isActive) {
      setSecondsLeft(newTime);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime - secondsLeft) / initialTime) * 100;

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl w-64"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'ru' ? 'Отдых' : 'Rest'}
              </span>
              <div className="flex gap-2">
                <button onClick={() => adjustTime(-15)} className="p-1 bg-slate-800 rounded text-slate-400 hover:text-white">-15s</button>
                <button onClick={() => adjustTime(15)} className="p-1 bg-slate-800 rounded text-slate-400 hover:text-white">+15s</button>
              </div>
            </div>

            <div className="relative w-full h-32 flex items-center justify-center mb-4">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" r="45%" fill="none" stroke="currentColor" className="text-slate-800" strokeWidth="8" />
                <circle 
                  cx="50%" cy="50%" r="45%" 
                  fill="none" 
                  stroke="currentColor" 
                  className={secondsLeft === 0 ? 'text-red-500' : 'text-emerald-500'} 
                  strokeWidth="8" 
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="text-4xl font-black text-white font-mono z-10">
                {formatTime(secondsLeft)}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={toggleTimer} className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${isActive ? 'bg-orange-500' : 'bg-emerald-500'}`}>
                {isActive ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>
              <button onClick={resetTimer} className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white">
                <Square size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${isOpen || isActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'}`}
      >
        <Timer size={24} />
      </button>
    </div>
  );
}
