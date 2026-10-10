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
    await new Promise(r => setTimeout(r, 400));

    // Attendance screenshot
    await page.click('#attendance-tab');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/dark_attendance_now.png', fullPage: false });

    // Grades screenshot
    await page.click('#grades-tab');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/dark_grades_now.png', fullPage: false });

    // Calendar screenshot
    await page.click('#calendar-tab');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/dark_calendar_now.png', fullPage: false });

    console.log('Screenshots saved!');
    await browser.close();
})();
