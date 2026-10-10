const fs = require('fs');
const puppeteer = require('c:/Users/Jasmini Mohanty/OneDrive/Documents/Project/node_modules/puppeteer-core');

const EDGE_PATH = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
].find(p => fs.existsSync(p));

(async () => {
    const browser = await puppeteer.launch({ executablePath: EDGE_PATH, headless: 'new' });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/dashboard1.html', { waitUntil: 'networkidle0' });

    await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    });

    const debug = await page.evaluate(() => {
        const el = document.getElementById('courses-tab');
        const style = window.getComputedStyle(el);

        const overviewCard = document.querySelector('.card.section-card');
        const overviewCardStyle = overviewCard ? window.getComputedStyle(overviewCard) : null;

        const overviewH5 = overviewCard ? overviewCard.querySelector('h5') : null;
        const overviewH5Style = overviewH5 ? window.getComputedStyle(overviewH5) : null;

        return {
            coursesTab: {
                color: style.color,
                bgColor: style.backgroundColor
            },
            overviewCard: {
                bg: overviewCardStyle ? overviewCardStyle.backgroundColor : null,
                bgImage: overviewCardStyle ? overviewCardStyle.backgroundImage : null
            },
            overviewH5: {
                color: overviewH5Style ? overviewH5Style.color : null
            }
        };
    });

    console.log('DEBUG:', JSON.stringify(debug, null, 2));
    await browser.close();
})();
