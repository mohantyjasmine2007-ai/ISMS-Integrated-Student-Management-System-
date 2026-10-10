const puppeteer = require('puppeteer-core');

async function testStudent() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

  // Student login
  await page.type('#studentId', '24104068');
  await page.type('#studentPassword', '24104068@Apsit');
  await page.click('#studentSubmitBtn');

  await new Promise(r => setTimeout(r, 1500));

  console.log('Student Current URL:', page.url());

  const studentState = await page.evaluate(() => {
    return {
      studentName: document.getElementById('navStudentName')?.textContent,
      facultyNavVisible: document.getElementById('sidebarFacultyNavItem')?.style.display,
      dashboardActive: document.getElementById('dashboard-view')?.classList.contains('active'),
      facultyViewVisible: document.getElementById('faculty-view')?.style.display
    };
  });

  console.log('Student State in Browser:', studentState);

  await page.screenshot({ path: 'C:/Users/Jasmini Mohanty/.gemini/antigravity-ide/brain/4358cec1-87e7-4b59-bb5c-54cc5c243ae0/scratch/student_screen.png' });
  console.log('Saved student screenshot to scratch/student_screen.png');

  await browser.close();
}

testStudent().catch(console.error);
