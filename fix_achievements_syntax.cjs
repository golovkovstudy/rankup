const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Achievements.tsx', 'utf8');

fileStr = fileStr.replace(
  "</section>\n    </div>\n      {/* Activity Heatmap */}",
  "</section>\n\n      {/* Activity Heatmap */}"
);

fs.writeFileSync('src/components/Achievements.tsx', fileStr);
