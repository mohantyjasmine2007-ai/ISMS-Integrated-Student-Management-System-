const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const tabContentIdx = content.indexOf('id="sidebarTabsContent"');
const dashboardViewIdx = content.indexOf('id="dashboard-view"');
const coursesViewIdx = content.indexOf('id="courses-view"');

const snippet = content.substring(dashboardViewIdx, coursesViewIdx);
const lines = snippet.split('\n');

let depth = 1; // starts inside dashboard-view
lines.forEach((line, idx) => {
  const lineNum = 458 + idx; // approx line in file
  // Count open divs
  const opens = (line.match(/<div(?:\s|>)/gi) || []).length;
  const closes = (line.match(/<\/div>/gi) || []).length;
  depth += opens - closes;
  if (depth <= 0) {
    console.log(`EXTRA CLOSING DIV at line ${idx + 1} of snippet: "${line.trim()}" (depth=${depth})`);
  }
});
console.log("Final depth at end of dashboard-view snippet:", depth);
