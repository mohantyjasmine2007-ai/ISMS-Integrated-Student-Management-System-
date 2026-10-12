const puppeteer = require('puppeteer-core');
const path = require('path');

const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let executablePath = null;
const fs = require('fs');
for (const p of edgePaths) {
    if (fs.existsSync(p)) {
        executablePath = p;
        break;
    }
}

if (!executablePath) {
    console.error('No Edge executable found');
    process.exit(1);
}

(async () => {
    const browser = await puppeteer.launch({
        executablePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 950 });

    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    page.on('pageerror', err => {
        errors.push(err.toString());
    });

    const filePath = 'file://' + path.resolve(__dirname, '../dashboard1.html').replace(/\\/g, '/');
    console.log('Navigating to:', filePath);
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Verify #dashboard-view is active by default
    const dashViewActive = await page.evaluate(() => {
        const dashPane = document.getElementById('dashboard-view');
        return dashPane && dashPane.classList.contains('active');
    });
    console.log('Dashboard home tab active by default:', dashViewActive);

    // Verify #aboutApsitDashSection is NOT in the DOM
    const hasAboutDashSection = await page.evaluate(() => {
        return !!document.getElementById('aboutApsitDashSection');
    });
    console.log('Has #aboutApsitDashSection on home page (expected false):', hasAboutDashSection);

    // Verify the upcoming calendar events block is present right after carousel
    const upcomingEventsPresent = await page.evaluate(() => {
        const grid = document.getElementById('dashUpcomingEventsGrid');
        return !!grid;
    });
    console.log('Upcoming Academic Calendar grid present on home page:', upcomingEventsPresent);

    // Verify academic overview stats are present
    const overviewStatsPresent = await page.evaluate(() => {
        return !!document.getElementById('dashEnrolledCoursesVal') && !!document.getElementById('dashAttendanceVal');
    });
    console.log('Academic overview cards present on home page:', overviewStatsPresent);

    // Capture screenshot of home page
    const dashScreenshotPath = path.resolve(__dirname, 'dash_home_clean.png');
    await page.screenshot({ path: dashScreenshotPath, fullPage: false });
    console.log('Captured screenshot of cleaned dashboard home page:', dashScreenshotPath);

    // Verify clicking About APSIT sidebar tab opens the dedicated About APSIT view
    await page.evaluate(() => {
        openAboutApsitTab();
    });
    await new Promise(r => setTimeout(r, 400));

    const aboutViewActive = await page.evaluate(() => {
        const aboutPane = document.getElementById('about-view');
        return aboutPane && aboutPane.classList.contains('active');
    });
    console.log('Dedicated About APSIT tab activated properly:', aboutViewActive);

    // Verify Help & Support still works
    await page.evaluate(() => {
        openHelpSupportTab();
    });
    await new Promise(r => setTimeout(r, 400));

    const helpViewActive = await page.evaluate(() => {
        const helpPane = document.getElementById('help-view');
        return helpPane && helpPane.classList.contains('active');
    });
    console.log('Help & Support tab activated properly:', helpViewActive);

    console.log('Console Errors count:', errors.length);
    if (errors.length > 0) {
        console.error('Errors:', errors);
    }

    await browser.close();

    if (!dashViewActive || hasAboutDashSection || !upcomingEventsPresent || !aboutViewActive || !helpViewActive) {
        console.error('TEST FAILED');
        process.exit(1);
    } else {
        console.log('ALL TESTS PASSED SUCCESSFULLY!');
    }
})();
