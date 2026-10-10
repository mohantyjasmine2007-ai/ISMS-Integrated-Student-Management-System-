const fs = require('fs');
const path = require('path');
const puppeteer = require('c:/Users/Jasmini Mohanty/OneDrive/Documents/Project/node_modules/puppeteer-core');

const EDGE_PATH = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
].find(p => fs.existsSync(p));

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: EDGE_PATH,
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1400, height: 900 });

        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        page.on('pageerror', err => {
            consoleErrors.push(err.toString());
        });

        // 1. Load Student Dashboard
        await page.goto('http://localhost:3000/dashboard1.html', { waitUntil: 'networkidle0' });

        // Evaluate checks
        const checkResult = await page.evaluate(() => {
            const forecasterRoot = document.getElementById('react-attendance-forecaster-root');
            const pageText = document.body.innerText;
            const hasForecasterTitle = pageText.includes('Attendance Compliance & What-If Forecaster');
            const hasReactBadge = pageText.includes('React Live Forecaster');
            const welcomeCard = document.querySelector('.welcome-card');
            const carousel = document.getElementById('collegeCarousel');

            return {
                forecasterRootExists: !!forecasterRoot,
                hasForecasterTitle,
                hasReactBadge,
                welcomeCardExists: !!welcomeCard,
                carouselExists: !!carousel
            };
        });

        console.log('DOM Checks Result:', JSON.stringify(checkResult, null, 2));
        console.log('Console Errors:', consoleErrors);

        if (checkResult.forecasterRootExists) {
            throw new Error('FAILED: #react-attendance-forecaster-root still exists in DOM!');
        }
        if (checkResult.hasForecasterTitle || checkResult.hasReactBadge) {
            throw new Error('FAILED: Forecaster text/badge still found on page!');
        }
        if (!checkResult.welcomeCardExists || !checkResult.carouselExists) {
            throw new Error('FAILED: Welcome card or Carousel missing!');
        }
        if (consoleErrors.length > 0) {
            throw new Error('FAILED: Console errors encountered: ' + consoleErrors.join(', '));
        }

        // Take a screenshot of the updated dashboard
        const screenshotPath = path.join(__dirname, 'student_dash_without_forecaster.png');
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log('SUCCESS: Forecaster removed cleanly and screenshot saved to', screenshotPath);

    } catch (err) {
        console.error('Error during test:', err);
        process.exitCode = 1;
    } finally {
        if (browser) await browser.close();
    }
})();
