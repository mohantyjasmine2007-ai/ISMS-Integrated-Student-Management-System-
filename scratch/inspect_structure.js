const fs = require('fs');
const content = fs.readFileSync('dashboard1.html', 'utf8');
const lines = content.split('\n');

console.log('--- TAB PANES & MODALS ---');
lines.forEach((l, idx) => {
  const trimmed = l.trim();
  if (trimmed.includes('class="tab-pane') || (trimmed.startsWith('<div class="modal') || trimmed.includes('class="modal fade'))) {
    console.log(`${idx + 1}: ${trimmed.substring(0, 100)}`);
  }
});

console.log('--- AROUND SCRIPT TAGS (lines 4055-4075) ---');
for (let i = 4055; i < 4075 && i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

console.log('--- END OF FILE (lines 4755-4767) ---');
for (let i = 4755; i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
