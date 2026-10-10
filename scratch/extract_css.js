const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>');

if (styleStart === -1 || styleEnd === -1) {
  console.error("Could not find style tags!");
  process.exit(1);
}

const css = content.substring(styleStart + 7, styleEnd).trim();
console.log('Extracted CSS length:', css.length);
console.log('First 200 chars:', css.slice(0, 200));
console.log('Last 200 chars:', css.slice(-200));

fs.writeFileSync('dashboard1.css', css + '\n', 'utf8');
console.log('Saved dashboard1.css successfully!');
