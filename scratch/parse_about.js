const fs = require('fs');

const html = fs.readFileSync('scratch/about_us.html', 'utf8');

// Strip scripts and styles
const cleaned = html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<nav[\s\S]*?<\/nav>/gi, '')
  .replace(/<header[\s\S]*?<\/header>/gi, '')
  .replace(/<footer[\s\S]*?<\/footer>/gi, '');

// Extract paragraphs, headings, list items
const tags = cleaned.match(/<(h[1-6]|p|li|td|th)[^>]*>([\s\S]*?)<\/\1>/gi) || [];

const texts = tags
  .map(t => t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .filter(t => t.length > 30);

fs.writeFileSync('scratch/about_us_extracted.txt', texts.join('\n\n'));
console.log(`Extracted ${texts.length} text segments.`);
