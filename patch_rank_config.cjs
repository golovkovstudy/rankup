const fs = require('fs');

function patchFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /const currentRankConfig = RANKS\[(.*?)\];/g, 
    "const currentRankConfig = RANKS[$1] || RANKS['F'];"
  );
  fs.writeFileSync(file, content);
}

patchFile('src/components/Dashboard.tsx');
patchFile('src/components/LevelUpChallenge.tsx');
patchFile('src/store.ts');
