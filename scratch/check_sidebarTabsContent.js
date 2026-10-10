const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');
const lines = content.split('\n');

let openDivs = 0;
let insideSidebarTabsContent = false;
let startLine = 0;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('id="sidebarTabsContent"')) {
    insideSidebarTabsContent = true;
    startLine = i + 1;
    openDivs = 1;
    console.log(`Found sidebarTabsContent at line ${startLine}`);
    continue;
  }
  if (insideSidebarTabsContent) {
    const opens = (l.match(/<div(\s|>)/g) || []).length;
    const closes = (l.match(/<\/div>/g) || []).length;
    openDivs += opens - closes;
    if (openDivs <= 0) {
      console.log(`sidebarTabsContent closed at line ${i + 1}. Remaining openDivs: ${openDivs}`);
      insideSidebarTabsContent = false;
    }
  }
}
