const fs = require('fs');
let fileStr = fs.readFileSync('src/components/ExerciseModal.tsx', 'utf8');

const regexVars = /const \[mediaError, setMediaError\] = useState\(false\);\n\s*useEffect\(\(\) => \{\n\s*setMediaError\(false\);\n\s*\}, \[quest\]\);/s;

const newVars = `const mediaId = quest.originalId || quest.id;
  const genderSuffix = state.user?.gender === 'female' ? '_f' : '_m';
  const [mediaSrc, setMediaSrc] = useState(\`/media/\${mediaId}\${genderSuffix}.mp4\`);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    setMediaSrc(\`/media/\${mediaId}\${genderSuffix}.mp4\`);
    setMediaError(false);
  }, [mediaId, genderSuffix]);

  const handleMediaError = () => {
    if (mediaSrc.includes(genderSuffix)) {
       setMediaSrc(\`/media/\${mediaId}.mp4\`);
    } else {
       setMediaError(true);
    }
  };`;

fileStr = fileStr.replace(regexVars, newVars);

const mediaIdRegex = /\s*\/\/ ID to use for looking up video\/gif\n\s*const mediaId = quest\.originalId \|\| quest\.id;/s;
fileStr = fileStr.replace(mediaIdRegex, "");

fileStr = fileStr.replace(/src=\{\`\/media\/\$\{mediaId\}\.mp4\`\}/, "src={mediaSrc}");
fileStr = fileStr.replace(/onError=\{\(\) => setMediaError\(true\)\}/, "onError={handleMediaError}");
fileStr = fileStr.replace(/<code className="text-indigo-400 bg-indigo-500\/10 px-2 py-1 rounded mt-2 inline-block">\/public\/media\/\{mediaId\}\.mp4<\/code>/, `<code className="text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded mt-2 inline-block">/public/media/{mediaId}{genderSuffix}.mp4</code>`);

fs.writeFileSync('src/components/ExerciseModal.tsx', fileStr);
