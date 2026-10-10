const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const tabIdx = content.indexOf('id="faculty-tab"');
const ulStart = content.lastIndexOf('<ul', tabIdx);
console.log(content.substring(ulStart, ulStart + 500));
