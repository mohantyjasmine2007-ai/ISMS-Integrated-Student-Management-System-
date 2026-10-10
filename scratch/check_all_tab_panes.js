const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const regex = /<div[^>]*class="tab-pane[^"]*"[^>]*id="([^"]+)"[^>]*>/gi;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(`Matched tab-pane: ${m[0]}`);
}
