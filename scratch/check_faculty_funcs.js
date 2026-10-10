const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const idx1 = content.indexOf('function initFacultyPortal');
const idx2 = content.indexOf('function renderFacultyRoster');
const idx3 = content.indexOf('function updateFacultyHeaderInfo');

console.log('initFacultyPortal:');
console.log(content.substring(idx1, idx1 + 1200));

console.log('\nupdateFacultyHeaderInfo:');
console.log(content.substring(idx3, idx3 + 800));
