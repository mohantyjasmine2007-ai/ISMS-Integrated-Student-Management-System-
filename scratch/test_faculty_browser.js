const puppeteer = require('puppeteer-core');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.message);
  });

  console.log('Navigating to http://localhost:3000/index.html...');
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

  // Switch to faculty tab
  await page.click('#tabFacultyBtn');
  await page.type('#facultyNameInput', 'Puja Chavan');
  await page.type('#facultyPassword', 'Puja Chavan@Apsit');
  
  console.log('Submitting faculty login form...');
  await page.click('#facultySubmitBtn');

  // Wait for navigation
  await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 }).catch(e => console.log('Navigation wait timeout or completed'));

  console.log('Current URL:', page.url());
  console.log('Console logs on page:');
  consoleLogs.forEach(l => console.log('  ', l));

  // Check tab pane classes and display styles
  const tabStates = await page.evaluate(() => {
    const panes = Array.from(document.querySelectorAll('.tab-pane')).map(p => ({
      id: p.id,
      className: p.className,
      displayStyle: p.style.display,
      computedDisplay: window.getComputedStyle(p).display,
      computedOpacity: window.getComputedStyle(p).opacity,
      computedVisibility: window.getComputedStyle(p).visibility,
      scrollHeight: p.scrollHeight,
      clientHeight: p.clientHeight
    }));
    return {
      bodyHeight: document.body.scrollHeight,
      panes: panes,
      sidebarFacultyDisplay: document.getElementById('sidebarFacultyNavItem')?.style.display
    };
  });

  console.log('\nPage Tab States in Browser:');
  console.log(JSON.stringify(tabStates, null, 2));

  // Save screenshot
  await page.screenshot({ path: 'C:/Users/Jasmini Mohanty/.gemini/antigravity-ide/brain/4358cec1-87e7-4b59-bb5c-54cc5c243ae0/scratch/faculty_screen.png' });
  console.log('Saved screenshot to scratch/faculty_screen.png');

  await browser.close();
}

test().catch(console.error);
