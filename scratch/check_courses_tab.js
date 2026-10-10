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
        applyTheme('dark', false);
    });

    const res = await page.evaluate(() => {
        const el = document.getElementById('courses-tab');
        const computed = window.getComputedStyle(el);
        return {
            appTextMuted: computed.getPropertyValue('--app-text-muted'),
            colorValue: computed.color,
            sheetHref: Array.from(document.styleSheets).map(s => s.href),
            rulesMatching: Array.from(document.styleSheets).flatMap(sheet => {
                try {
                    return Array.from(sheet.cssRules).filter(r => r.selectorText && el.matches(r.selectorText)).map(r => ({
                        sel: r.selectorText,
                        color: r.style.color,
                        priority: r.style.getPropertyPriority('color'),
                        sheet: sheet.href
                    }));
                } catch(e) { return []; }
            })
        };
    });
    console.log(JSON.stringify(res, null, 2));
    await browser.close();
})();
