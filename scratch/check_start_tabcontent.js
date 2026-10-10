const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const tabContentIdx = content.indexOf('id="sidebarTabsContent"');
console.log(content.substring(tabContentIdx - 200, tabContentIdx + 400));
