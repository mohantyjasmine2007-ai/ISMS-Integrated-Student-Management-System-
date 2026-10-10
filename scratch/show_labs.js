const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

const start = content.indexOf('id="adsaLabModal"');
const end = content.indexOf('id="miniProjectModal"');
console.log(content.substring(start, end));
