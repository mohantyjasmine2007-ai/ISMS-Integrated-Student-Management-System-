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
    await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

    // Login as faculty
    await page.click('#tabFacultyBtn');
    await page.type('#facultyNameInput', 'Puja Chavan');
    await page.type('#facultyPassword', 'Puja Chavan@Apsit');
    await page.click('#facultySubmitBtn');
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {});

    // Set dark theme
    await page.evaluate(() => applyTheme('dark', false));
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: 'scratch/dark_faculty.png', fullPage: false });
    console.log('Faculty dark mode screenshot saved!');
    await browser.close();
})();
