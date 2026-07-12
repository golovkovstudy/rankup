const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

const replacement = `export const SSR_CHALLENGES = [
  {
    id: 'murph',
    title: { en: 'Murph', ru: 'Мерф' },
    desc: { en: '1 mile run, 100 pull-ups, 200 pushups, 300 squats, 1 mile run (with vest)', ru: '1 миля бег, 100 подтягиваний, 200 отжиманий, 300 приседаний, 1 миля бег (в жилете)' },
    quests: [
      { id: 'murph_run1', title: { en: '1 Mile Run', ru: '1 Миля Бег' }, desc: { en: 'With vest', ru: 'В жилете' } },
      { id: 'murph_pullups', title: { en: 'Pull-ups', ru: 'Подтягивания' }, desc: { en: '100 reps', ru: '100 повторений' } },
      { id: 'murph_pushups', title: { en: 'Push-ups', ru: 'Отжимания' }, desc: { en: '200 reps', ru: '200 повторений' } },
      { id: 'murph_squats', title: { en: 'Squats', ru: 'Приседания' }, desc: { en: '300 reps', ru: '300 повторений' } },
      { id: 'murph_run2', title: { en: '1 Mile Run', ru: '1 Миля Бег' }, desc: { en: 'With vest', ru: 'В жилете' } }
    ],
    quests_f: [
      { id: 'murph_run1', title: { en: '1 Mile Run', ru: '1 Миля Бег' }, desc: { en: 'Without vest', ru: 'Без жилета' } },
      { id: 'murph_pullups_f', title: { en: 'Australian Pull-ups', ru: 'Австралийские подтягивания' }, desc: { en: '100 reps', ru: '100 повторений' } },
      { id: 'murph_pushups_f', title: { en: 'Knee Push-ups', ru: 'Отжимания с колен' }, desc: { en: '200 reps', ru: '200 повторений' } },
      { id: 'murph_squats', title: { en: 'Squats', ru: 'Приседания' }, desc: { en: '300 reps', ru: '300 повторений' } },
      { id: 'murph_run2', title: { en: '1 Mile Run', ru: '1 Миля Бег' }, desc: { en: 'Without vest', ru: 'Без жилета' } }
    ]
  },
  {
    id: 'no_gravity',
    title: { en: 'No Gravity', ru: 'Гравитации нет' },
    desc: { en: '50 muscle-ups in one workout', ru: '50 выходов силой на две руки за тренировку' },
    quests: [
      { id: 'no_gravity_mu', title: { en: 'Muscle-ups', ru: 'Выходы силой' }, desc: { en: '50 reps', ru: '50 повторений' } }
    ],
    quests_f: [
      { id: 'no_gravity_pullups_f', title: { en: 'Strict Pull-ups', ru: 'Строгие подтягивания' }, desc: { en: '50 reps', ru: '50 повторений' } }
    ]
  },
  {
    id: 'iron_legs',
    title: { en: 'Iron Legs', ru: 'Железные ноги' },
    desc: { en: '10 km run (outdoors) + 100 pistol squats', ru: '10 км бег (на улице) + 100 приседаний "пистолетиком"' },
    quests: [
      { id: 'iron_legs_run', title: { en: '10 km run', ru: 'Бег 10 км' }, desc: { en: 'Outdoors', ru: 'На улице' } },
      { id: 'iron_legs_pistols', title: { en: 'Pistol Squats', ru: 'Пистолетики' }, desc: { en: '100 reps', ru: '100 повторений' } }
    ]
  },
  {
    id: 'spartan',
    title: { en: 'Spartan', ru: 'Спартанец' },
    desc: { en: '300 spartan pushups, 10 min L-sit hold total', ru: '300 спартанских отжиманий, 10 минут удержание L-sit (в сумме)' },
    quests: [
      { id: 'spartan_pushups', title: { en: 'Spartan Push-ups', ru: 'Спартанские отжимания' }, desc: { en: '300 reps', ru: '300 повторений' } },
      { id: 'spartan_lsit', title: { en: 'L-sit', ru: 'Уголок (L-sit)' }, desc: { en: '10 minutes total', ru: '10 минут в сумме' } }
    ]
  },
  {
    id: 'never_stop',
    title: { en: 'Never Stop', ru: 'Не останавливайся' },
    desc: { en: '21km run', ru: 'Полумарафон 21 км' },
    quests: [
      { id: 'never_stop_run', title: { en: 'Half Marathon', ru: 'Полумарафон 21 км' }, desc: { en: 'Continuous run', ru: 'Без остановок' } }
    ]
  }
];`;

fileStr = fileStr.replace(/export const SSR_CHALLENGES = \[.*?\];/s, replacement);

fs.writeFileSync('src/data.ts', fileStr);
