const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

const start = content.indexOf('id="automataCourseModal"');
const end = content.indexOf('id="openElectiveModal"');
console.log(content.substring(start, end));
