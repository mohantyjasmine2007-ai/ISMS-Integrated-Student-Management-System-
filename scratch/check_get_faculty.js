const fs = require('fs');

const content = fs.readFileSync('studentsData.js', 'utf8');

const idx = content.indexOf('function getCurrentFaculty');
console.log(content.substring(idx, idx + 800));
