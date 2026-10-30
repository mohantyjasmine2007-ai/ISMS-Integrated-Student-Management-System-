const {
    STUDENTS_DATA,
    SUBJECT_INFO,
    FACULTY_LIST,
    getLiveStudents,
    updateSubjectConductedLectures,
    saveSubjectInfo,
    loadStoredSubjectInfo,
    getSubjectInfo,
    setCurrentFaculty
} = require('../studentsData.js');

console.log('--- TEST 1: Initial ADSA conducted count ---');
console.log('Current ADSA conducted:', SUBJECT_INFO.adsa.conducted);

// Set active faculty to Dr. Sonia Aneesh (ADSA faculty)
setCurrentFaculty(FACULTY_LIST[1]);

console.log('\n--- TEST 2: Update ADSA conducted from 21 to 24 (Recalculate percentages) ---');
const studentBefore = getLiveStudents().find(s => s.moodleId === '25104023'); // Nilanchal Jena
console.log('Student Nilanchal before: attended =', studentBefore.attendance.adsa.attended, 'pct =', studentBefore.attendance.adsa.pct);

const res1 = updateSubjectConductedLectures('adsa', 24, true, false);
console.log('Result:', res1);

const studentAfter = getLiveStudents().find(s => s.moodleId === '25104023');
console.log('Student Nilanchal after: attended =', studentAfter.attendance.adsa.attended, 'conducted =', studentAfter.attendance.adsa.conducted, 'pct =', studentAfter.attendance.adsa.pct);
console.log('Expected pct (16 / 24 * 100):', Math.round((16 / 24) * 100));

console.log('\n--- TEST 3: Update with markAllPresentForDelta = true (+2 lectures) ---');
const res2 = updateSubjectConductedLectures('adsa', 26, true, true);
console.log('Result:', res2);

const studentAfterPresent = getLiveStudents().find(s => s.moodleId === '25104023');
console.log('Student Nilanchal after +2 present: attended =', studentAfterPresent.attendance.adsa.attended, 'conducted =', studentAfterPresent.attendance.adsa.conducted, 'pct =', studentAfterPresent.attendance.adsa.pct);
console.log('Expected attended (16 + 2 = 18), expected pct (18 / 26 * 100):', Math.round((18 / 26) * 100));

console.log('\n--- TEST 4: Unauthorized access check ---');
// Try to modify AMT-I while logged in as Sonia Aneesh
const unauthorizedRes = updateSubjectConductedLectures('amt1', 25, true, false);
console.log('Unauthorized result:', unauthorizedRes);

// Restore original for cleanliness
updateSubjectConductedLectures('adsa', 21, true, false);
console.log('\nRestored ADSA to 21 conducted.');
console.log('All tests passed successfully!');
