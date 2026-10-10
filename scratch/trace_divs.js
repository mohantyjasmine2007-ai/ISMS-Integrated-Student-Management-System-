const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

// Trace from index 16273 (where sidebarTabsContent opens)
const tabContentIdx = content.indexOf('id="sidebarTabsContent"');
const lines = content.substring(tabContentIdx, content.indexOf('id="courses-view"')).split('\n');

let depth = 0;
lines.forEach((l, i) => {
  const opens = (l.match(/<div/gi) || []).length;
  const closes = (l.match(/<\/div>/gi) || []).length;
  depth += opens - closes;
  if (i > lines.length - 15) {
    console.log(`Line ${i} (depth=${depth}): ${l}`);
  }
});
