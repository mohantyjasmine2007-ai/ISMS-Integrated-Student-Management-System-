const fs = require('fs');

const htmlContent = fs.readFileSync('dashboard1.html', 'utf8');

// Extract all <script> contents from dashboard1.html
const scriptRegex = /<script(?:\s+src="([^"]*)")?>([\s\S]*?)<\/script>/gi;
let m;
while ((m = scriptRegex.exec(htmlContent)) !== null) {
  if (m[1]) {
    console.log(`Script src: ${m[1]}`);
  } else {
    console.log(`Inline script length: ${m[2].length}`);
    try {
      new Function(m[2]);
      console.log("  Syntax: OK");
    } catch (e) {
      console.error("  SYNTAX ERROR:", e);
    }
  }
}
