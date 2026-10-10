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
    await page.click('#courses-tab');
    await new Promise(r => setTimeout(r, 400));

    // Open first course modal: Applied Mathematics
    const btn = await page.$('button[data-bs-target="#mathModal"], a[data-bs-target="#mathModal"], [onclick*="mathModal"]');
    if (btn) await btn.click();
    else {
        // Find syllabus button
        await page.evaluate(() => {
            const firstBtn = Array.from(document.querySelectorAll('#courses-view .btn')).find(b => b.innerText.includes('Syllabus'));
            if (firstBtn) firstBtn.click();
        });
    }

    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'scratch/dark_modal.png', fullPage: false });

    console.log('Course modal screenshot saved!');
    await browser.close();
})();
