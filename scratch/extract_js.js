const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const scriptStart = content.indexOf('<script>\n    let activeFacultyObj = null;');
const scriptEnd = content.lastIndexOf('</script>');

if (scriptStart === -1 || scriptEnd === -1) {
  console.error("Could not find inline script bounds!");
  process.exit(1);
}

const js = content.substring(scriptStart + 8, scriptEnd).trim();
console.log('Extracted JS length:', js.length);
console.log('First 200 chars:\n', js.slice(0, 200));
console.log('Last 200 chars:\n', js.slice(-200));

fs.writeFileSync('dashboard1.js', js + '\n', 'utf8');
console.log('Saved dashboard1.js successfully!');
