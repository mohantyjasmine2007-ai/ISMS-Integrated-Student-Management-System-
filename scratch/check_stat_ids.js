const fs = require('fs');
const c = fs.readFileSync('dashboard1.html', 'utf8');

const ids = [
  'facultyPortalTitle',
  'facultyPortalSubtitle',
  'activeFacultySubjectInfo',
  'facStatConducted',
  'facStatType',
  'facColSubjectAtt',
  'facultyRosterTableBody',
  'facultyRosterSearch',
  'facultyAttendanceFilter',
  'facStatAvgPct',
  'facStatEligibleCount',
  'facStatDefaulterCount',
  'facRosterCountBadge',
  'activeFacultyNameDisplay',
  'activeFacultyEmailDisplay',
  'facultyCourseControlContainer'
];

ids.forEach(id => {
  console.log(`id="${id}": ${c.includes(`id="${id}"`) ? 'EXISTS' : '>>> MISSING <<<'}`);
});
