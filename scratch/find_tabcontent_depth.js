const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const tabContentIdx = content.indexOf('id="sidebarTabsContent"');
const coursesViewIdx = content.indexOf('id="courses-view"');

const snippet = content.substring(tabContentIdx, coursesViewIdx);
const lines = snippet.split('\n');

let depth = 0;
lines.forEach((line, idx) => {
  const opens = (line.match(/<div(?:\s|>)/gi) || []).length;
  const closes = (line.match(/<\/div>/gi) || []).length;
  depth += opens - closes;
  if (depth < 1) {
    console.log(`Line ${idx + 1} drops depth to ${depth}: ${line.trim()}`);
  }
});
console.log("Final depth at end of snippet:", depth);
