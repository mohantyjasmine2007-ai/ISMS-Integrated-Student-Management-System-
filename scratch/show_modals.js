const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

function showModal(id) {
  const start = content.indexOf(`id="${id}"`);
  if (start === -1) {
    console.log(`=== ${id} NOT FOUND ===`);
    return;
  }
  const end = content.indexOf('</div>\n    </div>\n</div>', start) + 25;
  console.log(`\n================ ${id} ================`);
  console.log(content.substring(start, start + 3000));
}

showModal('mathCourseModal');
showModal('automataCourseModal');
showModal('openElectiveModal');
showModal('adsaLabModal');
showModal('sqlLabModal');
