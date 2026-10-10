const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const facViewIdx = content.indexOf('id="faculty-view"');
// Look for where faculty-view ends
const endIdx = content.indexOf('id="idCardModal"');
console.log(content.substring(endIdx - 400, endIdx));
