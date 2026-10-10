const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const idx = content.indexOf('id="faculty-tab"');
console.log(content.substring(idx - 600, idx + 400));
