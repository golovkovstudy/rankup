import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Info, CheckCircle2 } from 'lucide-react';
import { AppState } from '../types';
import { getExerciseTips } from '../utils/exerciseTips';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  quest: any | null;
  state: AppState;
}

export function ExerciseModal({ isOpen, onClose, quest, state }: ExerciseModalProps) {
  const mediaId = quest?.originalId || quest?.id || '';
  const genderSuffix = state.user?.gender === 'female' ? '_f' : '_m';
  const [mediaSrc, setMediaSrc] = useState(`/media/${mediaId}${genderSuffix}.mp4`);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    if (mediaId) {
      setMediaSrc(`/media/${mediaId}${genderSuffix}.mp4`);
      setMediaError(false);
    }
  }, [mediaId, genderSuffix]);

  const handleMediaError = () => {
    if (mediaSrc.includes(genderSuffix)) {
       setMediaSrc(`/media/${mediaId}.mp4`);
    } else {
       setMediaError(true);
    }
  };

  if (!isOpen || !quest) return null;
  const lang = state.language;
  const tips = getExerciseTips(quest.originalId || quest.id, lang);
  
  const title = quest.customTitle ? quest.customTitle[lang] : (quest.title ? quest.title[lang] : '');
  const desc = quest.customDesc ? quest.customDesc[lang] : (quest.desc ? quest.desc[lang] : '');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0A0A0F] border border-white/10 rounded-3xl w-full max-w-md relative overflow-hidden flex flex-col max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full text-slate-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          {/* Media Section */}
          <div className="w-full aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
            {!mediaError ? (
              <video 
                src={mediaSrc}
                autoPlay loop muted playsInline
                onError={handleMediaError}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Play className="text-white/10 mb-3" size={48} />
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">
                  {lang === 'ru' ? 'Медиа не найдено' : 'Media Not Found'}
                </p>
                <p className="text-[10px] text-white/30">
                  {lang === 'ru' ? 'Загрузите сгенерированное Veo видео/GIF:' : 'Upload Veo generated video/GIF:'} <br/>
                  <code className="text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded mt-2 inline-block">/public/media/{mediaId}{genderSuffix}.mp4</code>
                </p>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-xl font-black text-white">{title}</h2>
              {desc && <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">{desc}</p>}
            </div>
          </div>

          {/* Tips Section */}
          <div className="p-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
               <Info size={16} className="text-indigo-400" />
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                 {lang === 'ru' ? 'Техника и Фокус' : 'Form & Focus'}
               </h3>
            </div>
            <ul className="space-y-3">
               {tips.map((tip, idx) => (
                 <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-300">{tip}</span>
                 </li>
               ))}
            </ul>
            
            <button 
              onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent((title || 'calisthenics') + (lang === 'ru' ? ' как правильно делать' : ' proper form'))}`, '_blank')}
              className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 transition-colors"
            >
              <Play size={14} />
              {lang === 'ru' ? 'Найти туториал на YouTube' : 'Find Tutorial on YouTube'}
            </button>
          </div>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
