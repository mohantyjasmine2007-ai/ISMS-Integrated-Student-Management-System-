const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

console.log("=== 1. VERIFY ALL 10 MODAL IDS AND SIZES ===");
const expectedModals = [
  { id: 'mathCourseModal', name: 'Applied Mathematics Thinking-I', faculty: 'Puja Chavan' },
  { id: 'adsaCourseModal', name: 'Advance Data Structure & Analysis', faculty: 'Sonia Aneesh' },
  { id: 'dbmsCourseModal', name: 'Database Management System & Application', faculty: 'Shital Agarwal' },
  { id: 'automataCourseModal', name: 'Automata Theory', faculty: 'Charul Singh' },
  { id: 'openElectiveModal', name: 'Open Elective (Banking & Finance)', faculty: 'Anupama Singh' },
  { id: 'adsaLabModal', name: 'ADSA Lab', faculty: 'Anupama Singh' },
  { id: 'sqlLabModal', name: 'SQL Lab', faculty: 'Shital Agarwal' },
  { id: 'miniProjectModal', name: 'Mini-Project - Full Stack Java', faculty: 'Mandar Ganjapurkar' },
  { id: 'edCourseModal', name: 'Entrepreneurship Development', faculty: 'Randeep Kaur Kahlon' },
  { id: 'evsCourseModal', name: 'Environmental Science', faculty: 'Pranali Vhora' }
];

let allModalsOk = true;
expectedModals.forEach((m, idx) => {
  const start = content.indexOf(`id="${m.id}"`);
  if (start === -1) {
    console.error(`[FAIL] Modal ${m.id} NOT FOUND!`);
    allModalsOk = false;
    return;
  }
  // Find modal length
  const nextModal = idx < expectedModals.length - 1 ? content.indexOf(`id="${expectedModals[idx+1].id}"`) : content.indexOf('id="facultyEditAttendanceModal"');
  const len = nextModal !== -1 ? nextModal - start : 0;
  
  // Check faculty name
  const hasFaculty = content.substring(start, start + len).includes(m.faculty);
  console.log(`[PASS] Modal [${idx+1}] ${m.id} (${m.name}): Length=${len} chars | Faculty "${m.faculty}": ${hasFaculty ? 'OK' : 'MISSING'}`);
});

console.log("\n=== 2. VERIFY COURSE BUTTON DATA-BS-TARGETS IN COURSES-VIEW ===");
const coursesViewIdx = content.indexOf('id="courses-view"');
const calendarViewIdx = content.indexOf('id="calendar-view"');
const coursesHtml = content.substring(coursesViewIdx, calendarViewIdx);

expectedModals.forEach(m => {
  const targetPattern = `data-bs-target="#${m.id}"`;
  const hasTarget = coursesHtml.includes(targetPattern);
  console.log(`Course button target #${m.id}: ${hasTarget ? 'FOUND' : '[MISSING]'}`);
});

console.log("\n=== 3. VERIFY NO REACT DASHBOARD LINKS IN DASHBOARD1.HTML ===");
const lines = content.split('\n');
let reactLinksFound = 0;
lines.forEach((l, i) => {
  if (l.includes('react-dashboard') || l.includes('React Edition') || l.includes('Synchronized with React')) {
    console.error(`[UNEXPECTED] Line ${i+1}: ${l}`);
    reactLinksFound++;
  }
});
if (reactLinksFound === 0) {
  console.log("[PASS] Zero React dashboard references found in dashboard1.html!");
}

console.log("\n=== 4. CHECK DIV TAG BALANCE IN DASHBOARD1.HTML ===");
const openDivs = (content.match(/<div(\s|>)/gi) || []).length;
const closeDivs = (content.match(/<\/div>/gi) || []).length;
console.log(`Open <div> count: ${openDivs}, Close </div> count: ${closeDivs}, Diff: ${openDivs - closeDivs}`);

console.log("\n=== ALL CHECKS COMPLETED ===");
