const fs = require('fs');
let dataStr = fs.readFileSync('src/data.ts', 'utf8');

const enInsert = `    treadmill: 'Treadmill',
    pullup_bar: 'Pull-up Bar',
    dip_station: 'Dip Station',
    dumbbells: 'Dumbbells / Kettlebells',
    rings: 'Gymnastic Rings',
    resistance_bands: 'Resistance Bands',
    jump_rope: 'Jump Rope',
    weight_vest: 'Weight Vest',
    ab_roller: 'Ab Roller',
    yoga_mat: 'Yoga Mat',`;

const ruInsert = `    treadmill: 'Беговая дорожка',
    pullup_bar: 'Турник',
    dip_station: 'Брусья',
    dumbbells: 'Гантели / Гири',
    rings: 'Кольца гимнастические',
    resistance_bands: 'Фитнес-резинки (Эспандеры)',
    jump_rope: 'Скакалка',
    weight_vest: 'Утяжелительный жилет',
    ab_roller: 'Ролик для пресса',
    yoga_mat: 'Коврик для фитнеса',`;

dataStr = dataStr.replace(/    treadmill: 'Treadmill',\n    pullup_bar: 'Pull-up Bar',\n    dumbbells: 'Dumbbells',\n    rings: 'Rings',/g, enInsert);
dataStr = dataStr.replace(/    treadmill: 'Беговая дорожка',\n    pullup_bar: 'Турник',\n    dumbbells: 'Гантели\/Гири',\n    rings: 'Кольца',/g, ruInsert);

fs.writeFileSync('src/data.ts', dataStr);
