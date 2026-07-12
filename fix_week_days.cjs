const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

fileStr = fileStr.replace(
  "week_days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']",
  "week_days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']"
);

fileStr = fileStr.replace(
  "week_days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']",
  "week_days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']"
);

fs.writeFileSync('src/data.ts', fileStr);
