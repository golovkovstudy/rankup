const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// ACHIEVEMENTS
data = data.replace(
  "title: { en: 'Unstoppable', ru: 'Неудержимый' }",
  "title: { en: 'Unstoppable', ru: 'Неудержимость' }"
);

// TROPHIES
data = data.replace(
  "title: { en: 'Chest Out', ru: 'Грудь колесом' }",
  "title: { en: 'Iron Chest', ru: 'Стальная броня' }"
);

data = data.replace(
  "title: { en: 'Master of Body', ru: 'Властелин своего тела' }",
  "title: { en: 'Body Mastery', ru: 'Мастерство тела' }"
);

data = data.replace(
  "title: { en: 'Going to the River', ru: 'Идущий к реке' }",
  "title: { en: 'Path to the River', ru: 'Путь к реке' }"
);

fs.writeFileSync('src/data.ts', data);
