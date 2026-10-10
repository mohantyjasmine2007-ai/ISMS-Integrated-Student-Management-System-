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

    await page.evaluate(() => applyTheme('dark', false));
    await page.click('#attendance-tab');
    await new Promise(r => setTimeout(r, 400));

    const thInfo = await page.evaluate(() => {
        const th = document.querySelector('#personalSubjectTable thead th');
        const style = window.getComputedStyle(th);
        return {
            bg: style.backgroundColor,
            color: style.color,
            tableBgVar: style.getPropertyValue('--bs-table-bg'),
            tableColorVar: style.getPropertyValue('--bs-table-color')
        };
    });

    console.log('TH Info:', thInfo);
    await browser.close();
})();
