const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

fileStr = fileStr.replace(
  /ru: 'Разведение с эспандером'/g,
  "ru: 'Разведение с эспандером перед собой'"
);

fileStr = fileStr.replace(
  /ru: 'Лодочка'/g,
  "ru: 'Удержание позиции Лодочка'"
);

fileStr = fileStr.replace(
  /ru: 'Ролик с колен'/g,
  "ru: 'Выкатывания с роликом с колен'"
);

fileStr = fileStr.replace(
  /ru: 'Гиперэкстензия на полу'/g,
  "ru: 'Гиперэкстензия на полу (Супермен)'"
);

fileStr = fileStr.replace(
  /ru: 'Отжимания уголком'/g,
  "ru: 'Отжимания уголком (Pike Pushups)'"
);

fileStr = fileStr.replace(
  /ru: 'Подтягивания с резинкой'/g,
  "ru: 'Подтягивания с резинкой'"
);

fileStr = fileStr.replace(
  /ru: 'Отжимания узким хватом'/g,
  "ru: 'Алмазные отжимания узким хватом'"
);

fileStr = fileStr.replace(
  /ru: 'Выпады в прыжке'/g,
  "ru: 'Выпады со сменой ног в прыжке'"
);

fileStr = fileStr.replace(
  /ru: 'Подводящие к выходу силой'/g,
  "ru: 'Подводящие к выходу силой на две руки'"
);

fileStr = fileStr.replace(
  /ru: 'Отжимания в стойке'/g,
  "ru: 'Отжимания в стойке на руках у стены (HSPU)'"
);

fileStr = fileStr.replace(
  /ru: 'Выходы на кольцах'/g,
  "ru: 'Выходы силой на кольцах'"
);

fileStr = fileStr.replace(
  /ru: 'Пистолетики с весом'/g,
  "ru: 'Приседания Пистолетиком с весом'"
);

fileStr = fileStr.replace(
  /ru: 'Подтягивания на кольцах'/g,
  "ru: 'Горизонтальные подтягивания на кольцах'"
);

fileStr = fileStr.replace(
  /ru: 'Брусья с весом'/g,
  "ru: 'Отжимания на брусьях с доп. весом'"
);

fileStr = fileStr.replace(
  /ru: 'Подтягивания с весом/g,
  "ru: 'Подтягивания на турнике с доп. весом"
);

fs.writeFileSync('src/data.ts', fileStr);
