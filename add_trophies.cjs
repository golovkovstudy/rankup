const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

const newTrophies = `  { id: 't_calories_1', tier: 'wood', title: { en: 'Spark', ru: 'Искра' }, desc: { en: 'Burn 1,000 kcal', ru: 'Сжечь 1,000 ккал' }, req: { type: 'calories', count: 1000 } },
  { id: 't_calories_2', tier: 'iron', title: { en: 'Furnace', ru: 'Печь' }, desc: { en: 'Burn 10,000 kcal', ru: 'Сжечь 10,000 ккал' }, req: { type: 'calories', count: 10000 } },
  { id: 't_calories_3', tier: 'silver', title: { en: 'Human Torch', ru: 'Человек-Факел' }, desc: { en: 'Burn 50,000 kcal', ru: 'Сжечь 50,000 ккал' }, req: { type: 'calories', count: 50000 } },
  { id: 't_bmi_1', tier: 'bronze', title: { en: 'Optimal Shape', ru: 'Оптимальная Форма' }, desc: { en: 'Reach Normal BMI (18.5 - 24.9)', ru: 'Достичь Нормального ИМТ (18.5 - 24.9)' }, req: { type: 'bmi_normal' } },
`;

fileStr = fileStr.replace(
  "export const TROPHIES = [",
  "export const TROPHIES = [\n" + newTrophies
);

fs.writeFileSync('src/data.ts', fileStr);
