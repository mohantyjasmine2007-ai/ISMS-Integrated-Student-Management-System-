const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/Jasmini Mohanty/.gemini/antigravity-ide/brain/4358cec1-87e7-4b59-bb5c-54cc5c243ae0/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('npm install') || line.includes('npm i') || line.includes('puppeteer-core')) {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      console.log(obj.step_index, JSON.stringify(obj.tool_calls.map(tc => tc.name === 'run_command' ? tc.args.CommandLine : tc.name)));
    }
  }
});
