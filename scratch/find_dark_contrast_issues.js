const fs = require('fs');
const puppeteer = require('c:/Users/Jasmini Mohanty/OneDrive/Documents/Project/node_modules/puppeteer-core');

const EDGE_PATH = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
].find(p => fs.existsSync(p));

(async () => {
    const browser = await puppeteer.launch({
        executablePath: EDGE_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });

    await page.goto('http://localhost:3000/dashboard1.html', { waitUntil: 'networkidle0' });

    // Enable dark mode
    await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    });

    // Take screenshot in dark mode
    await page.screenshot({ path: 'scratch/dash_dark_mode_initial.png', fullPage: true });

    // Find elements with poor contrast or camouflage
    const badContrastElements = await page.evaluate(() => {
        function getRgb(colorStr) {
            const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (!match) return null;
            return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
        }

        function getLuminance(rgb) {
            if (!rgb) return 0;
            const a = [rgb.r, rgb.g, rgb.b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        }

        function getContrastRatio(rgb1, rgb2) {
            const lum1 = getLuminance(rgb1);
            const lum2 = getLuminance(rgb2);
            const brightest = Math.max(lum1, lum2);
            const darkest = Math.min(lum1, lum2);
            return (brightest + 0.05) / (darkest + 0.05);
        }

        function getEffectiveBgColor(el) {
            let cur = el;
            while (cur && cur !== document.documentElement) {
                const style = window.getComputedStyle(cur);
                const bg = style.backgroundColor;
                const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (match) {
                    const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
                    if (alpha > 0.1) {
                        return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
                    }
                }
                cur = cur.parentElement;
            }
            return { r: 33, g: 37, b: 41 }; // Default dark theme bg
        }

        const results = [];
        const all = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, div, th, td, label, li, small, strong, b');

        all.forEach(el => {
            // Only inspect elements with direct text content
            const directText = Array.from(el.childNodes)
                .filter(n => n.nodeType === Node.TEXT_NODE)
                .map(n => n.textContent.trim())
                .join(' ');

            if (!directText || directText.length < 2) return;

            // Check if element is visible
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) return;

            const textRgb = getRgb(style.color);
            const bgRgb = getEffectiveBgColor(el);

            if (textRgb && bgRgb) {
                const ratio = getContrastRatio(textRgb, bgRgb);
                if (ratio < 3.0) { // WCAG AA minimum is 4.5:1, 3:1 for large text
                    results.push({
                        tag: el.tagName,
                        id: el.id,
                        className: el.className,
                        text: directText.substring(0, 50),
                        color: style.color,
                        bgColor: `rgb(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b})`,
                        ratio: ratio.toFixed(2),
                        parentClass: el.parentElement?.className || ''
                    });
                }
            }
        });

        return results;
    });

    console.log(`Found ${badContrastElements.length} low contrast elements in dark mode!`);
    console.log(JSON.stringify(badContrastElements.slice(0, 30), null, 2));

    await browser.close();
})();
