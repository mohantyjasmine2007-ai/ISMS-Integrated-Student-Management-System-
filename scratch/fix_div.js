const fs = require('fs');

let content = fs.readFileSync('dashboard1.html', 'utf8');

// Find the end of courses-view
const target = '</div></div>\n                </div>\n\n                <!-- Academic Calendar Tab Content -->';
console.log('Target found:', content.includes(target));

if (content.includes(target)) {
  content = content.replace(target, '</div>\n                </div>\n\n                <!-- Academic Calendar Tab Content -->');
  fs.writeFileSync('dashboard1.html', content, 'utf8');
  console.log('Fixed extra closing div at end of courses-view!');
}
