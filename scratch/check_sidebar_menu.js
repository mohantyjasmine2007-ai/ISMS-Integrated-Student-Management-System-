const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const idx = content.indexOf('id="sidebarMenu"');
console.log(content.substring(idx - 100, idx + 400));
