const fs = require('fs');
let fileStr = fs.readFileSync('src/data.ts', 'utf8');

// Rank F
fileStr = fileStr.replace(/quests: \[/, "quests: [\n      { id: 'f_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Walk', ru: 'Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' } },");
fileStr = fileStr.replace(/quests_f: \[/, "quests_f: [\n      { id: 'f_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Walk', ru: 'Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' } },");

// Rank E
fileStr = fileStr.replace(/title: \{ en: 'E - Trainee', ru: 'E - Стажер' \}.*?quests: \[/s, match => match + "\n      { id: 'e_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase3: { en: 'Fast pace', ru: 'Быстрый темп' } },");
fileStr = fileStr.replace(/title: \{ en: 'E - Trainee', ru: 'E - Стажер' \}.*?quests_f: \[/s, match => match + "\n      { id: 'e_cardio', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '3km Run / Walk', ru: 'Бег / Ходьба 3 км' }, desc: { en: 'Any pace', ru: 'Любой темп' }, desc_phase2: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase3: { en: 'Fast pace', ru: 'Быстрый темп' } },");

// Rank D
// replace scheduleDays: [2, 4, 6] with scheduleDays: [1, 2, 3, 4, 5, 6] for d_run_5k and d_run_5k_f
fileStr = fileStr.replace(/\{ id: 'd_run_5k', scheduleDays: \[2, 4, 6\]/g, "{ id: 'd_run_5k', scheduleDays: [1, 2, 3, 4, 5, 6]");
fileStr = fileStr.replace(/\{ id: 'd_run_5k_f', scheduleDays: \[2, 4, 6\]/g, "{ id: 'd_run_5k_f', scheduleDays: [1, 2, 3, 4, 5, 6]");

// Rank C
fileStr = fileStr.replace(/\{ id: 'c_run', scheduleDays: \[2, 4, 6\]/g, "{ id: 'c_run', scheduleDays: [1, 2, 3, 4, 5, 6]");
fileStr = fileStr.replace(/\{ id: 'c_run_f', scheduleDays: \[2, 4, 6\]/g, "{ id: 'c_run_f', scheduleDays: [1, 2, 3, 4, 5, 6]");

// Rank B
fileStr = fileStr.replace(/title: \{ en: 'B - Elite', ru: 'B - Элита' \}.*?quests: \[/s, match => match + "\n      { id: 'b_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '8km Run', ru: 'Бег 8 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },");
fileStr = fileStr.replace(/title: \{ en: 'B - Elite', ru: 'B - Элита' \}.*?quests_f: \[/s, match => match + "\n      { id: 'b_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '8km Run', ru: 'Бег 8 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },");

// Rank A
fileStr = fileStr.replace(/title: \{ en: 'A - Master', ru: 'A - Мастер' \}.*?quests: \[/s, match => match + "\n      { id: 'a_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },");
fileStr = fileStr.replace(/title: \{ en: 'A - Master', ru: 'A - Мастер' \}.*?quests_f: \[/s, match => match + "\n      { id: 'a_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Steady pace', ru: 'Ровный темп' }, desc_phase2: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase3: { en: 'Personal Best pace', ru: 'Максимальный темп' } },");

// Rank S
fileStr = fileStr.replace(/title: \{ en: 'S - Grandmaster', ru: 'S - Грандмастер' \}.*?quests: \[/s, match => match + "\n      { id: 's_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase2: { en: 'Weighted (+5kg)', ru: 'С доп. весом (+5кг)' }, desc_phase3: { en: 'Weighted (+10kg)', ru: 'С доп. весом (+10кг)' } },");
fileStr = fileStr.replace(/title: \{ en: 'S - Grandmaster', ru: 'S - Грандмастер' \}.*?quests_f: \[/s, match => match + "\n      { id: 's_run', scheduleDays: [1, 2, 3, 4, 5, 6], title: { en: '10km Run', ru: 'Бег 10 км' }, desc: { en: 'Fast pace', ru: 'Быстрый темп' }, desc_phase2: { en: 'Weighted (+5kg)', ru: 'С доп. весом (+5кг)' }, desc_phase3: { en: 'Weighted (+10kg)', ru: 'С доп. весом (+10кг)' } },");

fs.writeFileSync('src/data.ts', fileStr);
