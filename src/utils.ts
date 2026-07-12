import { Rank } from './types';

export const getRankTheme = (rank: Rank) => {
  switch (rank) {
    case 'F': return { text: 'text-slate-400', border: 'border-slate-500/50', bg: 'bg-slate-500/20', glow: 'shadow-[0_0_15px_rgba(148,163,184,0.2)]', hex: '#94a3b8' };
    case 'E': return { text: 'text-zinc-400', border: 'border-zinc-500/50', bg: 'bg-zinc-500/20', glow: 'shadow-[0_0_15px_rgba(161,161,170,0.2)]', hex: '#a1a1aa' };
    case 'D': return { text: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-500/20', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]', hex: '#10b981' };
    case 'C': return { text: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-500/20', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]', hex: '#3b82f6' };
    case 'B': return { text: 'text-purple-400', border: 'border-purple-500/50', bg: 'bg-purple-500/20', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]', hex: '#a855f7' };
    case 'A': return { text: 'text-orange-400', border: 'border-orange-500/50', bg: 'bg-orange-500/20', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]', hex: '#f97316' };
    case 'S': return { text: 'text-red-500', border: 'border-red-500/50', bg: 'bg-red-500/20', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]', hex: '#ef4444' };
    case 'SSR': return { text: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-500/20', glow: 'shadow-[0_0_25px_rgba(245,158,11,0.4)]', hex: '#f59e0b' };
    default: return { text: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-500/20', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]', hex: '#10b981' };
  }
};
