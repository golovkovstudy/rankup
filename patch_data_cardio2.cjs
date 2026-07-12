const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

// Rank E
fileStr = fileStr.replace(/E: \{\s*minDays: 28,\s*requiredInventoryForNext:.*?quests: \[/s, match => match + "\n      { id: 'e_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase3: { en: 'Fast pace', ru: 'Быстрый темп' } },");
fileStr = fileStr.replace(/E: \{.*?quests_f: \[/s, match => match + "\n      { id: 'e_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase3: { en: 'Fast pace', ru: 'Быстрый темп' } },");

// Rank B
fileStr = fileStr.replace(/B: \{\s*minDays: 42,\s*requiredInventoryForNext:.*?quests: \[/s, match => match + "\n      { id: 'b_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '8km Run', ru: 'Бег 8 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },");
fileStr = fileStr.replace(/B: \{.*?quests_f: \[/s, match => match + "\n      { id: 'b_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '8km Run', ru: 'Бег 8 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },");

// Rank A
fileStr = fileStr.replace(/A: \{\s*minDays: 56,\s*requiredInventoryForNext:.*?quests: \[/s, match => match + "\n      { id: 'a_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },");
fileStr = fileStr.replace(/A: \{.*?quests_f: \[/s, match => match + "\n      { id: 'a_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },");

// Rank S
fileStr = fileStr.replace(/S: \{\s*minDays: 90,\s*requiredInventoryForNext:.*?quests: \[/s, match => match + "\n      { id: 's_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase2: { en: 'Weighted (+5kg)', ru: 'С доп. весом (+5кг)' }, desc_phase3: { en: 'Weighted (+10kg)', ru: 'С доп. весом (+10кг)' } },");
fileStr = fileStr.replace(/S: \{.*?quests_f: \[/s, match => match + "\n      { id: 's_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase2: { en: 'Weighted (+5kg)', ru: 'С доп. весом (+5кг)' }, desc_phase3: { en: 'Weighted (+10kg)', ru: 'С доп. весом (+10кг)' } },");

fs.writeFileSync('src/data.ts', fileStr);
