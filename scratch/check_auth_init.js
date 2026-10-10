const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');
const lines = content.split('\n');

console.log("=== Searching for login checks / auth checks in dashboard1.html ===");
lines.forEach((line, idx) => {
  if (line.includes('isFacultyRole') || line.includes('getCurrentStudent') || line.includes('location.href') || line.includes('index.html') || line.includes('sessionStorage') || line.includes('apsit_current_user')) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
  }
});
