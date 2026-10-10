const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const lines = content.split('\n');
console.log("Total lines in dashboard1.html:", lines.length);

lines.forEach((l, i) => {
  if (l.match(/^(\s*)function\s+([a-zA-Z0-9_]+)/)) {
    console.log(`Line ${i + 1}: ${l.trim()}`);
  }
});
