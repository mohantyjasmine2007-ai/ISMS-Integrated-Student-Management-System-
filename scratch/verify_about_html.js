const fs = require('fs');

const html = fs.readFileSync('dashboard1.html', 'utf8');

// Check that about-view exists
const hasAboutView = html.includes('id="about-view"');
const hasAboutTab = html.includes('id="about-tab"');
const hasAboutDash = html.includes('id="aboutApsitDashSection"');

console.log('hasAboutView:', hasAboutView);
console.log('hasAboutTab:', hasAboutTab);
console.log('hasAboutDash:', hasAboutDash);

// Check div open and close balance
const opens = (html.match(/<div(\s|>)/gi) || []).length;
const closes = (html.match(/<\/div>/gi) || []).length;
console.log(`div open: ${opens}, div close: ${closes}`);

if (opens !== closes) {
    console.warn(`WARNING: div mismatch! diff = ${opens - closes}`);
} else {
    console.log('Div tags are perfectly balanced!');
}
