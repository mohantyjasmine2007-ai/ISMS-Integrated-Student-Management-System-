const fs = require('fs');
const path = require('path');

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'scratch' || file === '.system_generated') return;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Don't search backend java files for react-dashboard
      if (file !== 'backend') searchFiles(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('react-dashboard.html')) {
        console.log(`Found react-dashboard.html in: ${fullPath}`);
      }
    }
  });
}

searchFiles(process.cwd());
