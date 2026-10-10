const fs = require('fs');

const content = fs.readFileSync('dashboard1.html', 'utf8');

const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>') + 8;
const styleContent = content.substring(styleStart, styleEnd);
console.log('CSS Style block:', styleContent.length, 'chars');

const scriptStart = content.indexOf('<script>\n    let activeFacultyObj = null;');
const scriptEnd = content.lastIndexOf('</script>') + 9;
const scriptContent = content.substring(scriptStart, scriptEnd);
console.log('JS Script block:', scriptContent.length, 'chars');
