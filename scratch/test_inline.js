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

    const res = await page.evaluate(() => {
        const el = document.getElementById('courses-tab');
        el.style.cssText = 'color: red !important; font-size: 50px !important;';
        return {
            styleAttr: el.getAttribute('style'),
            computedColor: window.getComputedStyle(el).color,
            computedFontSize: window.getComputedStyle(el).fontSize
        };
    });

    console.log(res);
    await browser.close();
})();
