const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const idx = content.indexOf('function renderFacultyRoster');
console.log('renderFacultyRoster index:', idx);
if (idx !== -1) {
  console.log(content.substring(idx, idx + 2500));
}
