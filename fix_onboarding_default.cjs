const fs = require('fs');
let fileStr = fs.readFileSync('src/components/Onboarding.tsx', 'utf8');

// 1. Initial State
fileStr = fileStr.replace(
  "    gender: 'male',\n    inventory: []\n  });",
  "    gender: 'male',\n    inventory: [],\n    trainingDays: []\n  });"
);

// 2. Remove treadmill from step 3
const treadmillStr = "                { id: 'treadmill', label: t.treadmill },\n";
fileStr = fileStr.replace(treadmillStr, "");

// 3. Fix step 4 logic
const oldIsSelected = "                const isSelected = formData.trainingDays?.includes(day.id) || (!formData.trainingDays && day.id !== formData.restDay);";
const newIsSelected = "                const isSelected = formData.trainingDays?.includes(day.id) || false;";
fileStr = fileStr.replace(oldIsSelected, newIsSelected);

const oldCurrentDays = "                      let currentDays = formData.trainingDays || [1,2,3,4,5,6];";
const newCurrentDays = "                      let currentDays = formData.trainingDays || [];";
fileStr = fileStr.replace(oldCurrentDays, newCurrentDays);

// Remove the if (currentDays.length > 1) restriction since default is empty now
const oldToggleLogic = `                      if (isSelected) {
                        if (currentDays.length > 1) {
                          setFormData({ ...formData, trainingDays: currentDays.filter(d => d !== day.id).sort() });
                        }
                      } else {
                        setFormData({ ...formData, trainingDays: [...currentDays, day.id].sort() });
                      }`;

const newToggleLogic = `                      if (isSelected) {
                        setFormData({ ...formData, trainingDays: currentDays.filter(d => d !== day.id).sort() });
                      } else {
                        setFormData({ ...formData, trainingDays: [...currentDays, day.id].sort() });
                      }`;

fileStr = fileStr.replace(oldToggleLogic, newToggleLogic);

fs.writeFileSync('src/components/Onboarding.tsx', fileStr);
