const fs = require('fs');
const { getMathModal } = require('./build_all_course_modals.js');

let html = fs.readFileSync('dashboard1.html', 'utf8');

const mathStart = html.indexOf('<!-- Applied Math Course Modal -->');
const adsaStart = html.indexOf('<!-- Advance Data Structure & Analysis Course Modal -->');

if (mathStart !== -1 && adsaStart !== -1) {
  html = html.substring(0, mathStart) + getMathModal() + '\n\n' + html.substring(adsaStart);
  fs.writeFileSync('dashboard1.html', html, 'utf8');
  console.log("Successfully replaced mathCourseModal with rich syllabus modal!");
} else {
  console.error("Math boundary still not found!", { mathStart, adsaStart });
}
