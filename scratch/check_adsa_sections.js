const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

const start = content.indexOf('id="adsaCourseModal"');
const end = content.indexOf('id="dbmsCourseModal"');
const adsaContent = content.substring(start, end);

// Find headers or sections inside adsaCourseModal
const lines = adsaContent.split('\n');
lines.forEach(l => {
  if (l.includes('<h5') || l.includes('<h6') || l.includes('class="modal-title') || l.includes('class="fs-5')) {
    console.log(l.trim());
  }
});
