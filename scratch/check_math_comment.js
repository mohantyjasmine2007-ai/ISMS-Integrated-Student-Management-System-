const fs = require('fs');
const content = fs.readFileSync('dashboard1.html.bak', 'utf8');

const mathPos = content.indexOf('id="mathCourseModal"');
console.log('mathPos:', mathPos);
console.log('Context before mathPos:', content.substring(mathPos - 120, mathPos + 30));
