const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

console.log("Checking faculty-tab:");
const tabIdx = content.indexOf('id="faculty-tab"');
console.log("faculty-tab index:", tabIdx);
if (tabIdx !== -1) {
  console.log(content.substring(tabIdx - 100, tabIdx + 300));
}

console.log("\nChecking faculty-view:");
const viewIdx = content.indexOf('id="faculty-view"');
console.log("faculty-view index:", viewIdx);
if (viewIdx !== -1) {
  console.log(content.substring(viewIdx - 100, viewIdx + 300));
}

console.log("\nChecking sidebarFacultyNavItem:");
const navItemIdx = content.indexOf('id="sidebarFacultyNavItem"');
console.log("sidebarFacultyNavItem index:", navItemIdx);
if (navItemIdx !== -1) {
  console.log(content.substring(navItemIdx - 100, navItemIdx + 300));
}
