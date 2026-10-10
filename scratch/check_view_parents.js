const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const views = ['dashboard-view', 'courses-view', 'calendar-view', 'attendance-view', 'grades-view', 'faculty-view'];

views.forEach(v => {
  const idx = content.indexOf(`id="${v}"`);
  console.log(`\nView: ${v} at index ${idx}`);
  // Find last <div before idx
  const prevDivs = [];
  let searchPos = idx;
  for (let i = 0; i < 3; i++) {
    const lastOpen = content.lastIndexOf('<div', searchPos - 1);
    const lastClose = content.lastIndexOf('</div>', searchPos - 1);
    if (lastOpen > lastClose) {
      // Unclosed open div!
      const tagEnd = content.indexOf('>', lastOpen);
      prevDivs.push(content.substring(lastOpen, tagEnd + 1).replace(/\s+/g, ' '));
      searchPos = lastOpen;
    } else {
      break;
    }
  }
  console.log(`  Parent open divs:`, prevDivs);
});
