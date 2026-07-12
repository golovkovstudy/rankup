const fs = require('fs');
let fileStr = fs.readFileSync('src/components/ExerciseModal.tsx', 'utf8');

const youtubeCode = "https://www.youtube.com/results?search_query=${encodeURIComponent(title + (lang === 'ru' ? ' техника выполнения' : ' exercise form'))}";
const replacement = "https://www.youtube.com/results?search_query=${encodeURIComponent((title || 'calisthenics') + (lang === 'ru' ? ' как правильно делать' : ' proper form'))}";

fileStr = fileStr.split(youtubeCode).join(replacement);

fs.writeFileSync('src/components/ExerciseModal.tsx', fileStr);
