const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

// Search in style tags
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let m;
while ((m = styleRegex.exec(content)) !== null) {
  const css = m[1];
  const lines = css.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('tab-pane') || l.includes('calendar-view') || l.includes('attendance-view') || l.includes('grades-view') || l.includes('courses-view') || l.includes('faculty-view') || l.includes('.tab-content')) {
      console.log(`CSS line: ${l.trim()}`);
    }
  });
}
