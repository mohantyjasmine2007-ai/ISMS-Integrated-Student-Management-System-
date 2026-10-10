const fs = require('fs');

// Read studentsData.js in a mock browser environment
const window = {
  location: { search: '?view=faculty', pathname: '/dashboard1.html' },
  scrollTo: () => {}
};
const sessionStorage = {
  data: {
    'apsit_auth_role': 'faculty',
    'apsit_isms_active_faculty': JSON.stringify({
      id: 'fac_math_1',
      name: 'Puja Chavan',
      title: 'Prof. Puja Chavan',
      subjectKey: 'appliedMath',
      subjectName: 'Applied Mathematics Thinking-I',
      type: 'Theory',
      email: 'pujachavan@apsit.edu.in'
    })
  },
  getItem(k) { return this.data[k] || null; },
  setItem(k, v) { this.data[k] = v; },
  removeItem(k) { delete this.data[k]; }
};
const localStorage = {
  data: {},
  getItem(k) { return this.data[k] || null; },
  setItem(k, v) { this.data[k] = v; },
  removeItem(k) { delete this.data[k]; }
};

// Evaluate studentsData.js
const code = fs.readFileSync('studentsData.js', 'utf8');
eval(code);

console.log("isFacultyRole():", isFacultyRole());
console.log("getCurrentFaculty():", getCurrentFaculty());
console.log("getLiveStudents() length:", getLiveStudents().length);
console.log("SUBJECT_INFO keys:", Object.keys(SUBJECT_INFO));

const fac = getCurrentFaculty();
const subjKey = fac.subjectKey;
console.log("Faculty subjKey:", subjKey);
console.log("SUBJECT_INFO[subjKey]:", SUBJECT_INFO[subjKey]);
const students = getLiveStudents();
students.slice(0, 3).forEach(s => {
  initializeStudentGrades(s);
  console.log(`Student ${s.name} att for ${subjKey}:`, s.attendance[subjKey]);
  console.log(`Student ${s.name} grades for ${subjKey}:`, s.grades[subjKey]);
});
