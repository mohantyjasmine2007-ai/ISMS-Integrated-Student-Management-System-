const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

const start = content.indexOf('id="openElectiveModal"');
const end = content.indexOf('id="adsaLabModal"');
console.log(content.substring(start, end));
