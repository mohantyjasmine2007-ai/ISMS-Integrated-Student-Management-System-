const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

const start = content.indexOf('id="adsaCourseModal"');
console.log(content.substring(start, start + 2500));
