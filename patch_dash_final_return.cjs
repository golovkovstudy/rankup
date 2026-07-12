const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const target = `    return {
      id: quest.id,
      title: title,
      desc: currentDesc,
      isCustom: quest.isCustom
    };`;

const replacement = `    return {
      id: quest.id,
      title: scaleLocalized(title),
      desc: scaleLocalized(currentDesc),
      isCustom: quest.isCustom
    };`;

fileStr = fileStr.replace(target, replacement);
fs.writeFileSync('src/components/Dashboard.tsx', fileStr);
