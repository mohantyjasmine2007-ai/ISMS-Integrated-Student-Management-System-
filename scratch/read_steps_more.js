const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/Jasmini Mohanty/.gemini/antigravity-ide/brain/4358cec1-87e7-4b59-bb5c-54cc5c243ae0/.system_generated/logs/transcript_full.jsonl'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  if (line.includes('"step_index":147') || line.includes('"step_index":148')) {
    const obj = JSON.parse(line);
    if (obj.tool_calls) {
      console.log(obj.step_index, JSON.stringify(obj.tool_calls.map(tc => ({ name: tc.name, args: tc.args }))));
    }
  }
});
