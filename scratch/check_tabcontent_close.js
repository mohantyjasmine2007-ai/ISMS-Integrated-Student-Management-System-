const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const tabContentIdx = content.indexOf('id="sidebarTabsContent"');
console.log("tabContent open at index:", tabContentIdx);

// Count open and close divs from tabContentIdx
let depth = 0;
let idx = tabContentIdx;
const regex = /<\/?div/gi;
regex.lastIndex = tabContentIdx;

let m;
while ((m = regex.exec(content)) !== null) {
  if (m[0].toLowerCase() === '<div') {
    depth++;
  } else {
    depth--;
  }
  
  if (depth === 0) {
    console.log("tabContent CLOSED at index:", m.index);
    console.log("Context around close:");
    console.log(content.substring(m.index - 100, m.index + 100));
    break;
  }
}
