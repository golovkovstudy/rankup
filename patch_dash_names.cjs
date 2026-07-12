const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const regex = /if \(state\.user\?\.gender === 'female'\) \{\s*if \(id\.includes\('pushups'\) \|\| title\.en\.toLowerCase\(\)\.includes\('pushup'\)\) \{\s*title = \{ en: title\.en\.replace\('Push-ups', 'Knee Push-ups'\)\.replace\('push-ups', 'knee push-ups'\), ru: title\.ru\.replace\('Отжимания', 'Отжимания с колен'\)\.replace\('отжимания', 'отжимания с колен'\) \};\s*\}\s*if \(id\.includes\('pullups'\) \|\| title\.en\.toLowerCase\(\)\.includes\('pull-up'\)\) \{\s*title = \{ en: title\.en\.replace\('Pull-ups', 'Australian Pull-ups'\)\.replace\('pull-ups', 'Australian pull-ups'\), ru: title\.ru\.replace\('Подтягивания', 'Австралийские подтягивания'\)\.replace\('подтягивания', 'австралийские подтягивания'\) \};\s*\}\s*\}/s;

const replacement = `if (state.user?.gender === 'female') {
      if ((id.includes('pushups') || title.en.toLowerCase().includes('pushup')) && !title.en.toLowerCase().includes('knee') && !title.ru.toLowerCase().includes('с колен')) {
        title = { en: title.en.replace('Push-ups', 'Knee Push-ups').replace('push-ups', 'knee push-ups').replace('Pushups', 'Knee Pushups'), ru: title.ru.replace('Отжимания', 'Отжимания с колен').replace('отжимания', 'отжимания с колен') };
      }
      if ((id.includes('pullups') || title.en.toLowerCase().includes('pull-up')) && !title.en.toLowerCase().includes('australian') && !title.ru.toLowerCase().includes('австрал')) {
        title = { en: title.en.replace('Pull-ups', 'Australian Pull-ups').replace('pull-ups', 'Australian pull-ups').replace('Pullups', 'Australian Pullups'), ru: title.ru.replace('Подтягивания', 'Австралийские подтягивания').replace('подтягивания', 'австралийские подтягивания') };
      }
    }`;

fileStr = fileStr.replace(regex, replacement);

fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
