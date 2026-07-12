import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { subscribeToasts } from '../toast';

export function SystemToasts() {
  const [toasts, setToasts] = useState<{id: number, message: string, type: string}[]>([]);

  useEffect(() => {
    const unsub = subscribeToasts((toast) => {
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 3000);
    });
    return unsub;
  }, []);

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[90%] max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
            className={`px-4 py-4 rounded-xl border backdrop-blur-md shadow-2xl flex items-center gap-3 ${
              t.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' :
              t.type === 'level_up' ? 'bg-amber-950/80 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]' :
              'bg-blue-950/80 border-blue-500/50 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
            }`}
          >
            <div className="font-bold tracking-widest text-xs uppercase flex-1 text-center">
              {t.message}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
