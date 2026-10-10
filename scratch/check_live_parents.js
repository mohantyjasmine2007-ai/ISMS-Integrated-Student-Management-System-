const puppeteer = require('puppeteer-core');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/dashboard1.html?view=faculty', { waitUntil: 'networkidle0' });

  const parents = await page.evaluate(() => {
    const views = ['dashboard-view', 'courses-view', 'calendar-view', 'attendance-view', 'grades-view', 'faculty-view'];
    return views.map(id => {
      const el = document.getElementById(id);
      return {
        id,
        parentTag: el?.parentElement?.tagName,
        parentId: el?.parentElement?.id,
        parentClass: el?.parentElement?.className
      };
    });
  });

  console.log("Parents of views in live browser:", JSON.stringify(parents, null, 2));
  await browser.close();
}

test().catch(console.error);
