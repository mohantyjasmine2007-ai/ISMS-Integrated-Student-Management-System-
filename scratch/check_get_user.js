const fs = require('fs');

const content = fs.readFileSync('studentsData.js', 'utf8');

const idx = content.indexOf('function getCurrentUser');
console.log(content.substring(idx, idx + 800));
