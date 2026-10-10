const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('id="courses-view"')) {
    console.log(`id="courses-view" at line ${idx + 1}`);
  }
  if (line.includes('id="attendance-view"')) {
    console.log(`id="attendance-view" at line ${idx + 1}`);
  }
});
