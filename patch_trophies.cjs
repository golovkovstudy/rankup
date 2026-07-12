const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

const regex = /export const TROPHIES = \[\s*\{ id: 't_calories_1'.*?\n\];/s;

const newTrophies = `export const TROPHIES = [
  { id: 't_calories_1', tier: 'wood', title: { en: 'Spark', ru: 'Искра' }, desc: { en: 'Burn 1,000 kcal', ru: 'Сжечь 1,000 ккал' }, req: { type: 'calories', count: 1000 } },
  { id: 't_calories_2', tier: 'iron', title: { en: 'Furnace', ru: 'Печь' }, desc: { en: 'Burn 10,000 kcal', ru: 'Сжечь 10,000 ккал' }, req: { type: 'calories', count: 10000 } },
  { id: 't_calories_3', tier: 'silver', title: { en: 'Human Torch', ru: 'Человек-Факел' }, desc: { en: 'Burn 50,000 kcal', ru: 'Сжечь 50,000 ккал' }, req: { type: 'calories', count: 50000 } },
  { id: 't_calories_4', tier: 'gold', title: { en: 'Supernova', ru: 'Сверхновая' }, desc: { en: 'Burn 100,000 kcal', ru: 'Сжечь 100,000 ккал' }, req: { type: 'calories', count: 100000 } },
  { id: 't_calories_5', tier: 'diamond', title: { en: 'Star Core', ru: 'Ядро Звезды' }, desc: { en: 'Burn 250,000 kcal', ru: 'Сжечь 250,000 ккал' }, req: { type: 'calories', count: 250000 } },
  { id: 't_calories_6', tier: 'legend', title: { en: 'Big Bang', ru: 'Большой Взрыв' }, desc: { en: 'Burn 1,000,000 kcal', ru: 'Сжечь 1,000,000 ккал' }, req: { type: 'calories', count: 1000000 } },
  { id: 't_bmi_1', tier: 'bronze', title: { en: 'Optimal Shape', ru: 'Оптимальная Форма' }, desc: { en: 'Reach Normal BMI (18.5 - 24.9)', ru: 'Достичь Нормального ИМТ (18.5 - 24.9)' }, req: { type: 'bmi_normal' } },

  { id: 't_wood_1', tier: 'wood', title: { en: 'First Blood', ru: 'Первая кровь' }, desc: { en: 'Complete your first workout', ru: 'Сделать 1 тренировку' }, req: { type: 'workouts', count: 1 } },
  { id: 't_wood_2', tier: 'wood', title: { en: 'Awakening', ru: 'Пробуждение' }, desc: { en: 'Reach Rank E', ru: 'Достичь ранга E' }, req: { type: 'rank', rank: 'E' } },
  { id: 't_wood_3', tier: 'wood', title: { en: 'Half Marathon', ru: 'Полумарафон' }, desc: { en: 'Run 21 km total', ru: 'Пробежать 21 км суммарно' }, req: { type: 'run_km', count: 21 } },
  
  { id: 't_copper_1', tier: 'copper', title: { en: 'Consistency', ru: 'Постоянство' }, desc: { en: 'Reach a 7-day streak', ru: 'Стрик 7 дней' }, req: { type: 'streak', count: 7 } },
  { id: 't_copper_2', tier: 'copper', title: { en: 'Pedometer', ru: 'Шагомер' }, desc: { en: 'Run 50 km total', ru: '50 км суммарно' }, req: { type: 'run_km', count: 50 } },
  { id: 't_copper_3', tier: 'copper', title: { en: 'Rising Star', ru: 'Восходящая звезда' }, desc: { en: 'Reach Rank D', ru: 'Достичь ранга D' }, req: { type: 'rank', rank: 'D' } },

  { id: 't_iron_1', tier: 'iron', title: { en: 'Month in Game', ru: 'Месяц в игре' }, desc: { en: 'Reach a 30-day streak', ru: 'Стрик 30 дней' }, req: { type: 'streak', count: 30 } },
  { id: 't_iron_2', tier: 'iron', title: { en: 'Iron Chest', ru: 'Стальная броня' }, desc: { en: '1000 pushups total', ru: '1000 отжиманий суммарно' }, req: { type: 'pushups', count: 1000 } },
  { id: 't_iron_3', tier: 'iron', title: { en: 'Serious Business', ru: 'Серьезный настрой' }, desc: { en: 'Reach Rank C', ru: 'Достичь ранга C' }, req: { type: 'rank', rank: 'C' } },

  { id: 't_bronze_1', tier: 'bronze', title: { en: 'Warrior', ru: 'Воин' }, desc: { en: 'Reach Rank B', ru: 'Достичь ранга B' }, req: { type: 'rank', rank: 'B' } },
  { id: 't_bronze_2', tier: 'bronze', title: { en: 'Gravity', ru: 'Сила притяжения' }, desc: { en: '500 pullups total', ru: '500 подтягиваний суммарно' }, req: { type: 'pullups', count: 500 } },

  { id: 't_silver_1', tier: 'silver', title: { en: 'Steel Will', ru: 'Стальная воля' }, desc: { en: 'Reach a 100-day streak', ru: 'Стрик 100 дней' }, req: { type: 'streak', count: 100 } },
  { id: 't_silver_2', tier: 'silver', title: { en: 'Runner', ru: 'Бегун' }, desc: { en: 'Run 500 km total', ru: '500 км суммарно' }, req: { type: 'run_km', count: 500 } },

  { id: 't_gold_1', tier: 'gold', title: { en: 'Body Mastery', ru: 'Мастерство тела' }, desc: { en: 'Reach Rank A', ru: 'Достичь ранга A' }, req: { type: 'rank', rank: 'A' } },
  { id: 't_gold_2', tier: 'gold', title: { en: 'Sparta', ru: 'Спарта' }, desc: { en: '10,000 pushups total', ru: '10,000 отжиманий суммарно' }, req: { type: 'pushups', count: 10000 } },

  { id: 't_platinum_1', tier: 'platinum', title: { en: 'Year without Excuses', ru: 'Год без отговорок' }, desc: { en: 'Reach a 365-day streak', ru: 'Стрик 365 дней' }, req: { type: 'streak', count: 365 } },

  { id: 't_diamond_1', tier: 'diamond', title: { en: 'Grandmaster', ru: 'Грандмастер' }, desc: { en: 'Reach Rank S', ru: 'Достичь ранга S' }, req: { type: 'rank', rank: 'S' } },
  { id: 't_diamond_2', tier: 'diamond', title: { en: 'Equator', ru: 'Экватор' }, desc: { en: 'Run 1000 km total', ru: '1000 км суммарно' }, req: { type: 'run_km', count: 1000 } },

  { id: 't_legend_1', tier: 'legend', title: { en: 'Path to the River', ru: 'Путь к реке' }, desc: { en: 'Run 10,000 km total', ru: '10,000 км суммарно' }, req: { type: 'run_km', count: 10000 } },
  { id: 't_legend_2', tier: 'legend', title: { en: 'Anti-Gravity', ru: 'Анти-Гравитация' }, desc: { en: '100,000 pushups total', ru: '100,000 отжиманий суммарно' }, req: { type: 'pushups', count: 100000 } },
  { id: 't_legend_3', tier: 'legend', title: { en: 'Absolute', ru: 'Абсолют' }, desc: { en: 'Complete all 5 SSR challenges', ru: 'Выполнить ВСЕ 5 случайных SSR-испытаний' }, req: { type: 'ssr_all' } },
  { id: 't_legend_4', tier: 'legend', title: { en: 'God of Calisthenics', ru: 'Бог Калистеники' }, desc: { en: 'Reach Rank SSR', ru: 'Достичь ранга SSR' }, req: { type: 'rank', rank: 'SSR' } }
];`;

fileStr = fileStr.replace(regex, newTrophies);
fs.writeFileSync('src/data.ts', fileStr);
