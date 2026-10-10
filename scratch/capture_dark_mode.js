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

    // Enable dark theme
    await page.evaluate(() => {
        applyTheme('dark', false);
    });
    await new Promise(r => setTimeout(r, 500));

    // 1. Overview screenshot
    await page.screenshot({ path: 'scratch/dark_overview.png', fullPage: false });

    // 2. Courses tab screenshot
    await page.click('#courses-tab');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/dark_courses.png', fullPage: false });

    // 3. Attendance tab screenshot
    await page.click('#attendance-tab');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/dark_attendance.png', fullPage: false });

    // 4. Calendar tab screenshot
    await page.click('#calendar-tab');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/dark_calendar.png', fullPage: false });

    // 5. Grades tab screenshot
    await page.click('#grades-tab');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/dark_grades.png', fullPage: false });

    // 6. Account Settings Modal
    await page.click('#navStudentDropdown');
    await new Promise(r => setTimeout(r, 200));
    await page.click('a[data-bs-target="#settingsModal"]');
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'scratch/dark_settings.png', fullPage: false });

    console.log('All dark mode screenshots captured successfully!');
    await browser.close();
})();
