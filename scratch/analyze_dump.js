const fs = require('fs');

const dump = fs.readFileSync('C:/Users/Jasmini Mohanty/.gemini/antigravity-ide/brain/4358cec1-87e7-4b59-bb5c-54cc5c243ae0/scratch/dump_faculty.html', 'utf8');

console.log("Dump length:", dump.length);

// Check classes on dashboard-view and faculty-view
const dashViewMatch = dump.match(/<div[^>]*id="dashboard-view"[^>]*>/i);
console.log("dashboard-view tag in DOM:", dashViewMatch ? dashViewMatch[0] : 'NOT FOUND');

const facViewMatch = dump.match(/<div[^>]*id="faculty-view"[^>]*>/i);
console.log("faculty-view tag in DOM:", facViewMatch ? facViewMatch[0] : 'NOT FOUND');

const facNavMatch = dump.match(/<li[^>]*id="sidebarFacultyNavItem"[^>]*>/i);
console.log("sidebarFacultyNavItem tag in DOM:", facNavMatch ? facNavMatch[0] : 'NOT FOUND');

const facTabMatch = dump.match(/<a[^>]*id="faculty-tab"[^>]*>/i);
console.log("faculty-tab tag in DOM:", facTabMatch ? facTabMatch[0] : 'NOT FOUND');
