const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testFacultyDisplay() {
  console.log('=== VERIFYING FACULTY DASHBOARD DOES NOT DISPLAY STUDENT INFORMATION ===\n');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // 1. Faculty Login
  console.log('--- 1. Logging in as Prof. Puja Chavan ---');
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.click('#tabFacultyBtn');
  await page.type('#facultyNameInput', 'Puja Chavan');
  await page.type('#facultyPassword', 'Puja Chavan@Apsit');
  await page.click('#facultySubmitBtn');

  await new Promise(r => setTimeout(r, 1800));
  console.log('Current URL after faculty login:', page.url());

  // 2. Click on "Dashboard" tab in sidebar to view Dashboard view
  console.log('Switching to Dashboard view tab...');
  await page.click('#dashboard-tab');
  await new Promise(r => setTimeout(r, 600));

  // 3. Inspect elements on the Dashboard tab
  const dashData = await page.evaluate(() => {
    const welcomeName = document.getElementById('dashStudentName')?.textContent?.trim();
    const welcomeSub = document.getElementById('dashStudentSubtitle')?.textContent?.trim();
    const roleBadge = document.getElementById('dashRoleBadge')?.textContent?.trim();
    const overallBadge = document.getElementById('dashOverallAttendanceBadge')?.textContent?.trim();
    const overviewTitle = document.getElementById('dashOverviewTitle')?.textContent?.trim();
    const enrolledVal = document.getElementById('dashEnrolledCoursesVal')?.textContent?.trim();
    const theoryVal = document.getElementById('dashTheoryAttended')?.textContent?.trim();
    const card1Label = document.getElementById('dashCard1Label')?.textContent?.trim();
    const card2Label = document.getElementById('dashCard2Label')?.textContent?.trim();
    
    // Check React widget on Dashboard tab
    const reactForecasterText = document.getElementById('react-attendance-forecaster-root')?.innerText || '';
    
    // Check Dashboard view specifically for Jasmine or student ID
    const dashViewText = document.getElementById('dashboard-view')?.innerText || '';
    const mentionsJasmineOnDash = dashViewText.includes('Jasmine') || dashViewText.includes('JASMINE') || dashViewText.includes('IT-2026-38') || dashViewText.includes('25104021');

    // Check navbar
    const navName = document.getElementById('navStudentName')?.textContent?.trim();
    const navBadge = document.getElementById('navMoodleBadge')?.textContent?.trim();

    return {
      welcomeName,
      welcomeSub,
      roleBadge,
      overallBadge,
      overviewTitle,
      enrolledVal,
      theoryVal,
      card1Label,
      card2Label,
      reactForecasterText: reactForecasterText.substring(0, 150),
      mentionsJasmineOnDash,
      navName,
      navBadge
    };
  });

  console.log('Dashboard Data for Faculty:', dashData);

  if (dashData.welcomeName !== 'Prof. Puja Chavan') {
    throw new Error(`FAIL: Welcome name is "${dashData.welcomeName}", expected "Prof. Puja Chavan"!`);
  }
  console.log('[PASS] Welcome name correctly displays "Prof. Puja Chavan"');

  if (dashData.roleBadge !== 'FACULTY IN-CHARGE') {
    throw new Error(`FAIL: Role badge is "${dashData.roleBadge}", expected "FACULTY IN-CHARGE"!`);
  }
  console.log('[PASS] Role badge correctly displays "FACULTY IN-CHARGE"');

  if (dashData.navName !== 'Prof. Puja Chavan' || dashData.navBadge !== 'Faculty In-Charge') {
    throw new Error(`FAIL: Navbar displays "${dashData.navName} - ${dashData.navBadge}"!`);
  }
  console.log('[PASS] Navbar displays "Prof. Puja Chavan - Faculty In-Charge"');

  if (dashData.mentionsJasmineOnDash) {
    throw new Error('FAIL: Student Jasmine Mohanty found on the Faculty Dashboard view!');
  }
  console.log('[PASS] Zero mentions of student Jasmine Mohanty on Faculty Dashboard view!');

  // Check ID Card Modal for Faculty
  console.log('\n--- 2. Checking Faculty ID Card Modal ---');
  await page.evaluate(() => {
    const link = document.querySelector('[data-bs-target="#idCardModal"]');
    if (link) link.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const idCardData = await page.evaluate(() => {
    const strip = document.getElementById('idCardHeaderStrip')?.textContent?.trim();
    const name = document.getElementById('idCardName')?.textContent?.trim();
    const role = document.getElementById('idCardRole')?.textContent?.trim();
    const code = document.getElementById('idCardRoll')?.textContent?.trim();
    const course = document.getElementById('idCardCourse')?.textContent?.trim();
    return { strip, name, role, code, course };
  });

  console.log('Faculty ID Card Data:', idCardData);

  if (!idCardData.strip.includes('FACULTY')) {
    throw new Error(`FAIL: ID card strip is "${idCardData.strip}", expected FACULTY IDENTITY CARD!`);
  }
  console.log('[PASS] ID card strip displays "FACULTY IDENTITY CARD"');

  if (idCardData.name !== 'PROF. PUJA CHAVAN') {
    throw new Error(`FAIL: ID card name is "${idCardData.name}", expected "PROF. PUJA CHAVAN"!`);
  }
  console.log('[PASS] ID card name displays "PROF. PUJA CHAVAN"');

  // Close ID Card modal
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // Take screenshot of Faculty Dashboard
  await page.screenshot({ path: path.join(__dirname, 'faculty_dashboard_clean.png') });
  console.log('[PASS] Saved faculty dashboard screenshot to scratch/faculty_dashboard_clean.png');

  // 4. Test Student Login again to make sure student still works perfectly
  console.log('\n--- 3. Verifying Student Login still works correctly ---');
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });
  await page.type('#studentId', '25104021');
  await page.type('#studentPassword', '25104021@Apsit');
  await page.click('#studentSubmitBtn');

  await new Promise(r => setTimeout(r, 1800));

  const studentData = await page.evaluate(() => {
    const welcomeName = document.getElementById('dashStudentName')?.textContent?.trim();
    const roleBadge = document.getElementById('dashRoleBadge')?.textContent?.trim();
    const navName = document.getElementById('navStudentName')?.textContent?.trim();
    return { welcomeName, roleBadge, navName };
  });

  console.log('Student Dashboard Data:', studentData);
  if (studentData.welcomeName !== 'Jasmine Mohanty' || studentData.roleBadge !== 'SE IT DIV B') {
    throw new Error('FAIL: Student dashboard did not load Jasmine Mohanty correctly!');
  }
  console.log('[PASS] Student dashboard correctly loads student name Jasmine Mohanty & role SE IT DIV B');

  await browser.close();
  console.log('\n=== ALL VERIFICATIONS PASSED 100%! ===');
}

testFacultyDisplay().catch(err => {
  console.error('TEST ERROR:', err);
  process.exit(1);
});
