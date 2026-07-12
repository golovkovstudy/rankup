const fs = require('fs');
let fileStr = fs.readFileSync('src/components/ExerciseModal.tsx', 'utf8');

const replacement = `const mediaId = quest?.originalId || quest?.id || '';
  const genderSuffix = state.user?.gender === 'female' ? '_f' : '_m';
  const [mediaSrc, setMediaSrc] = useState(\`/media/\${mediaId}\${genderSuffix}.mp4\`);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    if (mediaId) {
      setMediaSrc(\`/media/\${mediaId}\${genderSuffix}.mp4\`);
      setMediaError(false);
    }
  }, [mediaId, genderSuffix]);`;

fileStr = fileStr.replace(/const mediaId = quest\.originalId \|\| quest\.id;\n.*?\n  \}, \[mediaId, genderSuffix\]\);/s, replacement);

fs.writeFileSync('src/components/ExerciseModal.tsx', fileStr);
