const fs = require('fs');
let storeStr = fs.readFileSync('src/store.ts', 'utf8');

const targetExercises = `      // Random generation logic
      const exercises = [
        { type: 'pushups', name: { en: 'Push-ups', ru: 'Отжимания' } },
        { type: 'squats', name: { en: 'Squats', ru: 'Приседания' } },
        { type: 'plank', name: { en: 'Plank Hold', ru: 'Планка' } },
        { type: 'run', name: { en: 'Light Jog', ru: 'Легкий бег' } },
        { type: 'burpees', name: { en: 'Burpees', ru: 'Бёрпи' } }
      ];
      
      if (rank === 'D' || rank === 'C' || rank === 'B' || rank === 'A' || rank === 'S') {
         exercises.push({ type: 'pullups', name: { en: 'Pull-ups', ru: 'Подтягивания' } });
      }`;

const replaceExercises = `      // Random generation logic
      const isFemale = prev.user?.gender === 'female';
      const exercises = [
        { type: 'pushups', name: isFemale ? { en: 'Knee Push-ups', ru: 'Отжимания с колен' } : { en: 'Push-ups', ru: 'Отжимания' } },
        { type: 'squats', name: { en: 'Squats', ru: 'Приседания' } },
        { type: 'plank', name: { en: 'Plank Hold', ru: 'Планка' } },
        { type: 'run', name: { en: 'Light Jog', ru: 'Легкий бег' } },
        { type: 'burpees', name: { en: 'Burpees', ru: 'Бёрпи' } }
      ];
      
      if (rank === 'D' || rank === 'C' || rank === 'B' || rank === 'A' || rank === 'S') {
         exercises.push({ type: 'pullups', name: isFemale ? { en: 'Australian Pull-ups', ru: 'Австралийские подтягивания' } : { en: 'Pull-ups', ru: 'Подтягивания' } });
      }`;

storeStr = storeStr.replace(targetExercises, replaceExercises);
fs.writeFileSync('src/store.ts', storeStr);
