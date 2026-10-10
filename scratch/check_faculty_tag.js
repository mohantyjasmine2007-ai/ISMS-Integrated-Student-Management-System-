const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const idx = content.indexOf('id="faculty-view"');
console.log(content.substring(idx - 50, idx + 100));
