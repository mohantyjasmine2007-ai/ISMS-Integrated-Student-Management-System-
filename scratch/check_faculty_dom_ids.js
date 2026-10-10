const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

// Find all DOM elements referenced in initFacultyPortal, updateFacultyHeaderInfo, renderFacultyRoster
const funcStart = content.indexOf('function initFacultyPortal');
const funcEnd = content.indexOf('// Switch to Faculty Portal tab');
const facultyScript = content.substring(funcStart, funcEnd !== -1 ? funcEnd : funcStart + 10000);

const getElementRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let m;
const elemIds = new Set();
while ((m = getElementRegex.exec(facultyScript)) !== null) {
  elemIds.add(m[1]);
}

console.log("DOM IDs checked in faculty scripts:");
elemIds.forEach(id => {
  const exists = content.includes(`id="${id}"`);
  console.log(`  #${id}: ${exists ? 'EXISTS' : '>>> MISSING <<<'}`);
});
