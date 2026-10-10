const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('react-dashboard') || line.includes('React Edition') || line.includes('Synchronized with React')) {
    console.log(`index.html Line ${idx + 1}: ${line}`);
  }
});
