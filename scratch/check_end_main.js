const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const facViewIdx = content.indexOf('id="faculty-view"');
// Look at the end of faculty-view and before <main> closes or modals start
const mathModalIdx = content.indexOf('id="mathCourseModal"');
console.log(content.substring(mathModalIdx - 500, mathModalIdx));
