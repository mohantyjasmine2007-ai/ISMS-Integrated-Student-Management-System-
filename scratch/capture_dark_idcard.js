const fs = require('fs');
const puppeteer = require('c:/Users/Jasmini Mohanty/OneDrive/Documents/Project/node_modules/puppeteer-core');

const EDGE_PATH = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
].find(p => fs.existsSync(p));

(async () => {
    const browser = await puppeteer.launch({ executablePath: EDGE_PATH, headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto('http://localhost:3000/dashboard1.html', { waitUntil: 'networkidle0' });

    await page.evaluate(() => applyTheme('dark', false));
    await page.click('#navStudentDropdown');
    await new Promise(r => setTimeout(r, 200));
    await page.click('a[data-bs-target="#idCardModal"]');
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({ path: 'scratch/dark_idcard.png', fullPage: false });
    console.log('ID Card screenshot saved!');
    await browser.close();
})();
