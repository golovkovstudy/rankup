const fs = require('fs');

let fileStr = fs.readFileSync('src/data.ts', 'utf8');

const uiStartIndex = fileStr.indexOf('export const UI');

// We will just replace everything from export const UI to the end of the file with a clean version.
const newUI = `export const TROPHIES = [
  { id: 't_wood_1', tier: 'wood', title: { en: 'First Blood', ru: 'Первая кровь' }, desc: { en: 'Complete your first workout', ru: 'Сделать 1 тренировку' }, req: { type: 'workouts', count: 1 } },
  { id: 't_copper_1', tier: 'copper', title: { en: 'Consistency', ru: 'Постоянство' }, desc: { en: 'Reach a 7-day streak', ru: 'Стрик 7 дней' }, req: { type: 'streak', count: 7 } },
  { id: 't_copper_2', tier: 'copper', title: { en: 'Pedometer', ru: 'Шагомер' }, desc: { en: 'Run 50 km total', ru: '50 км на дорожке суммарно' }, req: { type: 'run_km', count: 50 } },
  { id: 't_iron_1', tier: 'iron', title: { en: 'Month in Game', ru: 'Месяц в игре' }, desc: { en: 'Reach a 30-day streak', ru: 'Стрик 30 дней' }, req: { type: 'streak', count: 30 } },
  { id: 't_iron_2', tier: 'iron', title: { en: 'Chest Out', ru: 'Грудь колесом' }, desc: { en: '1000 pushups total', ru: '1000 отжиманий суммарно' }, req: { type: 'pushups', count: 1000 } },
  { id: 't_bronze_1', tier: 'bronze', title: { en: 'Half Marathon', ru: 'Полумарафон' }, desc: { en: 'Pass Level Up to Rank D', ru: 'Пройти Level Up в ранг D' }, req: { type: 'rank', rank: 'D' } },
  { id: 't_bronze_2', tier: 'bronze', title: { en: 'Gravity', ru: 'Сила притяжения' }, desc: { en: '500 pullups total', ru: '500 подтягиваний суммарно' }, req: { type: 'pullups', count: 500 } },
  { id: 't_silver_1', tier: 'silver', title: { en: 'Steel Will', ru: 'Стальная воля' }, desc: { en: 'Reach a 100-day streak', ru: 'Стрик 100 дней' }, req: { type: 'streak', count: 100 } },
  { id: 't_silver_2', tier: 'silver', title: { en: 'Runner', ru: 'Бегун' }, desc: { en: 'Run 500 km total', ru: '500 км суммарно' }, req: { type: 'run_km', count: 500 } },
  { id: 't_gold_1', tier: 'gold', title: { en: 'Master of Body', ru: 'Властелин своего тела' }, desc: { en: 'Reach Rank A', ru: 'Достичь ранга A' }, req: { type: 'rank', rank: 'A' } },
  { id: 't_gold_2', tier: 'gold', title: { en: 'Sparta', ru: 'Спарта' }, desc: { en: '10,000 pushups total', ru: '10,000 отжиманий суммарно' }, req: { type: 'pushups', count: 10000 } },
  { id: 't_platinum_1', tier: 'platinum', title: { en: 'Year without Excuses', ru: 'Год без отговорок' }, desc: { en: 'Reach a 365-day streak', ru: 'Стрик 365 дней' }, req: { type: 'streak', count: 365 } },
  { id: 't_diamond_1', tier: 'diamond', title: { en: 'Grandmaster', ru: 'Грандмастер' }, desc: { en: 'Reach Rank S', ru: 'Достичь ранга S' }, req: { type: 'rank', rank: 'S' } },
  { id: 't_diamond_2', tier: 'diamond', title: { en: 'Equator', ru: 'Экватор' }, desc: { en: 'Run 1000 km total', ru: '1000 км суммарно' }, req: { type: 'run_km', count: 1000 } },
  { id: 't_legend_1', tier: 'legend', title: { en: 'Going to the River', ru: 'Идущий к реке' }, desc: { en: 'Run 10,000 km total', ru: '10,000 км суммарно' }, req: { type: 'run_km', count: 10000 } },
  { id: 't_legend_2', tier: 'legend', title: { en: 'Anti-Gravity', ru: 'Анти-Гравитация' }, desc: { en: '100,000 pushups total', ru: '100,000 отжиманий суммарно' }, req: { type: 'pushups', count: 100000 } },
  { id: 't_legend_3', tier: 'legend', title: { en: 'Absolute', ru: 'Абсолют' }, desc: { en: 'Complete all 5 SSR challenges', ru: 'Выполнить ВСЕ 5 случайных SSR-испытаний' }, req: { type: 'ssr_all' } }
];\n\n` + fileStr.slice(uiStartIndex);

const result = fileStr.slice(0, uiStartIndex) + newUI;
fs.writeFileSync('src/data.ts', result);
