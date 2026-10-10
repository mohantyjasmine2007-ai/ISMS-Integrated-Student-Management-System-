const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const idx = content.indexOf('id="faculty-view"');
// Look for next tab-pane or closing div
console.log(content.substring(idx + 1500, idx + 3500));
