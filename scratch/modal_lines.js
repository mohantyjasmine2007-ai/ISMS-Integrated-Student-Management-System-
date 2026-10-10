const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

const lines = content.split('\n');

function findLine(str) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(str)) return i + 1;
  }
  return -1;
}

console.log('mathCourseModal starts at line:', findLine('id="mathCourseModal"'));
console.log('adsaCourseModal starts at line:', findLine('id="adsaCourseModal"'));
console.log('dbmsCourseModal starts at line:', findLine('id="dbmsCourseModal"'));
console.log('automataCourseModal starts at line:', findLine('id="automataCourseModal"'));
console.log('openElectiveModal starts at line:', findLine('id="openElectiveModal"'));
console.log('adsaLabModal starts at line:', findLine('id="adsaLabModal"'));
console.log('sqlLabModal starts at line:', findLine('id="sqlLabModal"'));
console.log('miniProjectModal starts at line:', findLine('id="miniProjectModal"'));
console.log('edCourseModal starts at line:', findLine('id="edCourseModal"'));
console.log('evsCourseModal starts at line:', findLine('id="evsCourseModal"'));
console.log('facultyEditAttendanceModal starts at line:', findLine('id="facultyEditAttendanceModal"'));
