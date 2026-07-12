const fs = require('fs');
let content = fs.readFileSync('src/components/Onboarding.tsx', 'utf8');

// Change handleNext
content = content.replace(
  /if \(step < 3\) \{\s*setStep\(step \+ 1\);\s*\} else \{\s*onComplete\(formData as UserProfile\);\s*\}/,
  "if (step < 2) { setStep(step + 1); } else { onComplete(formData as UserProfile); }"
);

// Remove step 3 UI
const step3Start = content.indexOf('{step === 3 && (');
if (step3Start !== -1) {
  const nextSection = content.indexOf('<button', step3Start);
  content = content.slice(0, step3Start) + content.slice(nextSection);
}

// Fix button text and disabled condition
content = content.replace(
  /disabled=\{\(step === 1 && \(\!formData\.age \|\| \!formData\.height \|\| \!formData\.weight\)\) \|\| \(step === 3 && \(\!formData\.trainingDays \|\| formData\.trainingDays\.length === 0\)\)\}/,
  "disabled={(step === 1 && (!formData.age || !formData.height || !formData.weight))}"
);

content = content.replace(
  /\{step === 3 \? t\.initialize : t\.proceed\}/,
  "{step === 2 ? t.initialize : t.proceed}"
);

content = content.replace(
  /\{\[1, 2, 3\]\.map\(i => \(/,
  "{[1, 2].map(i => ("
);

fs.writeFileSync('src/components/Onboarding.tsx', content);
