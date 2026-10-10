const fs = require('fs');

const content = fs.readFileSync('studentsData.js', 'utf8');

const idx = content.indexOf('const isPassValid = v');
console.log(content.substring(idx, idx + 1000));
