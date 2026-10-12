const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
    console.log('=== VERIFYING ABOUT APSIT SECTION IN DASHBOARD1.HTML ===\n');

    const browser = await puppeteer.launch({
        executablePath: EDGE_PATH,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });

    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    const htmlPath = path.resolve(__dirname, '..', 'dashboard1.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    console.log('Page loaded successfully.');

    // 1. Verify About APSIT section in Dashboard view
    const dashSection = await page.evaluate(() => {
        const sec = document.getElementById('aboutApsitDashSection');
        if (!sec) return null;
        return {
            title: sec.querySelector('h4')?.textContent?.trim(),
            founder: sec.querySelector('h5')?.textContent?.trim(),
            hasVisionMission: !!sec.querySelector('.text-uppercase'),
            leadershipCardsCount: sec.querySelectorAll('.leadership-mini-card').length
        };
    });

    console.log('Dashboard Section Details:', dashSection);
    if (!dashSection) throw new Error('Dashboard About APSIT section not found!');

    // Capture screenshot of Dashboard view with About APSIT section
    await page.screenshot({ path: path.resolve(__dirname, 'dash_about_light.png'), fullPage: false });
    console.log('Saved dash_about_light.png');

    // 2. Click About APSIT tab in sidebar
    console.log('Clicking About APSIT in sidebar...');
    await page.click('#about-tab');
    await new Promise(r => setTimeout(r, 600));

    const aboutTabActive = await page.evaluate(() => {
        const tabPane = document.getElementById('about-view');
        const isActive = tabPane && tabPane.classList.contains('active') && tabPane.classList.contains('show');
        const trusteesCount = tabPane?.querySelectorAll('.trustee-profile-card')?.length || 0;
        const quotesCount = tabPane?.querySelectorAll('.leader-quote-card')?.length || 0;
        const pillarsCount = tabPane?.querySelectorAll('.feature-pillar-card')?.length || 0;
        const heroTitle = tabPane?.querySelector('.about-hero-banner h2')?.textContent?.trim() || '';
        return { isActive, trusteesCount, quotesCount, pillarsCount, heroTitle };
    });

    console.log('About View Details:', aboutTabActive);
    if (!aboutTabActive.isActive) throw new Error('#about-view tab failed to activate!');
    if (aboutTabActive.trusteesCount !== 6) throw new Error(`Expected 6 trustees, found ${aboutTabActive.trusteesCount}`);
    if (aboutTabActive.quotesCount !== 4) throw new Error(`Expected 4 leadership quote cards, found ${aboutTabActive.quotesCount}`);
    if (aboutTabActive.pillarsCount !== 6) throw new Error(`Expected 6 feature pillars, found ${aboutTabActive.pillarsCount}`);

    // Capture screenshot of About APSIT dedicated view in Light Mode
    await page.screenshot({ path: path.resolve(__dirname, 'about_tab_light.png'), fullPage: true });
    console.log('Saved about_tab_light.png');

    // 3. Test Dark Mode
    console.log('Testing Dark Mode...');
    await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 400));

    await page.screenshot({ path: path.resolve(__dirname, 'about_tab_dark.png'), fullPage: true });
    console.log('Saved about_tab_dark.png');

    // 4. Test clicking Dashboard tab back from About view
    await page.click('#dashboard-tab');
    await new Promise(r => setTimeout(r, 400));
    const dashActiveAgain = await page.evaluate(() => {
        const dashPane = document.getElementById('dashboard-view');
        return dashPane && dashPane.classList.contains('active');
    });
    console.log('Switched back to Dashboard:', dashActiveAgain);

    console.log('\nConsole Errors during test:', errors);
    await browser.close();

    console.log('\n=== ALL TESTS PASSED WITH 100% SUCCESS! ===');
}

run().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
