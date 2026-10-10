const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');

function checkKeywords(id, keywords) {
  const start = content.indexOf(`id="${id}"`);
  const end = content.indexOf('</div>\n    </div>\n</div>', start) + 20;
  const snippet = content.substring(start, end);
  console.log(`\n=== Checking ${id} ===`);
  keywords.forEach(kw => {
    console.log(`  "${kw}": ${snippet.includes(kw) ? 'YES' : 'MISSING'}`);
  });
}

checkKeywords('adsaCourseModal', ['2343112', 'Sonia Aneesh', 'AVL trees', '0/1 knapsack', 'KMP algorithm', 'Cormen']);
checkKeywords('dbmsCourseModal', ['2343113', 'Shital Agarwal', 'Relational Model', 'BCNF', 'ACID Properties', 'Silberschatz']);
checkKeywords('miniProjectModal', ['2343611', 'Mandar Ganjapurkar', 'JWT', 'Employee', 'Docker', 'Spring Boot']);
checkKeywords('edCourseModal', ['2993511', 'Randeep Kaur Kahlon', 'Business Model Canvas', 'Figma', 'Pitch Deck']);
checkKeywords('evsCourseModal', ['2993512', 'Pranali Vhora', 'Rainwater Harvesting', 'E-waste', 'Solid Waste']);
