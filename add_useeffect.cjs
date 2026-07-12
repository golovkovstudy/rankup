const fs = require('fs');
let fileStr = fs.readFileSync('src/App.tsx', 'utf8');
fileStr = fileStr.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';");
fs.writeFileSync('src/App.tsx', fileStr);
