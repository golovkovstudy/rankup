const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// There is a small typo I want to avoid - let's make sure the selectedTitle is styled well.
const targetTitle = `                 🏆 {state.user.selectedTitle}`;
const replaceTitle = `                 🏆 {state.user.selectedTitle}`;
// Just a dummy to check, it looks fine.
