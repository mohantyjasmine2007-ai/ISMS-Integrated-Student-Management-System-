const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

const modalIds = [
  'adsaCourseModal',
  'dbmsCourseModal',
  'miniProjectModal',
  'edCourseModal',
  'evsCourseModal'
];

modalIds.forEach(mId => {
  const start = content.indexOf(`id="${mId}"`);
  const end = content.indexOf('<!-- Modal', start + 10);
  const mContent = content.substring(start, end !== -1 ? end : start + 15000);
  const tabRegex = /id="([^"]+)"\s+role="tabpanel"/g;
  let t;
  const tabs = [];
  while ((t = tabRegex.exec(mContent)) !== null) {
    tabs.push(t[1]);
  }
  console.log(`${mId} tabs:`, tabs);
});
