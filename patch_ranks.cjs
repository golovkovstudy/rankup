const fs = require('fs');

function patchFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /const rankCfg = RANKS\[(.*?)\];/g, 
    "const rankCfg = RANKS[$1] || RANKS['F'];"
  );
  fs.writeFileSync(file, content);
}

patchFile('src/components/Dashboard.tsx');
patchFile('src/store.ts');
