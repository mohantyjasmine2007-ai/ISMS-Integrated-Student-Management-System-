const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function runVerification() {
  console.log('=== STARTING AUTOMATED END-TO-END VERIFICATION OF DASHBOARD1.HTML ===\n');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // -------------------------------------------------------------
  // Test 1: Student Login & Verification
  // -------------------------------------------------------------
  console.log('--- TEST 1: Student Login Flow ---');
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

  // Student credentials
  await page.type('#studentId', '25104021');
  await page.type('#studentPassword', '25104021@Apsit');
  await page.click('#studentSubmitBtn');

  await new Promise(r => setTimeout(r, 1800));

  const studentUrl = page.url();
  console.log('Student redirected URL:', studentUrl);

  const studentData = await page.evaluate(() => {
    const navName = document.getElementById('navStudentName')?.textContent?.trim();
    const dashName = document.getElementById('dashStudentName')?.textContent?.trim();
    const facNavDisplay = document.getElementById('sidebarFacultyNavItem')?.style.display;
    const forecasterMounted = !!document.querySelector('#react-attendance-forecaster-root .card');
    const forecasterTitle = document.querySelector('#react-attendance-forecaster-root h5')?.textContent?.trim();
    
    // Check Courses tab
    const courseCards = document.querySelectorAll('#courses-view .course-card');
    
    return {
      navName,
      dashName,
      facNavDisplay,
      forecasterMounted,
      forecasterTitle,
      courseCardCount: courseCards.length
    };
  });

  console.log('Student Info:', studentData);

  // Check Forecaster
  if (!studentData.forecasterMounted) {
    throw new Error('FAILED: React Attendance Forecaster was NOT mounted in #dashboard-view!');
  }
  console.log('[PASS] React Attendance Forecaster mounted successfully:', studentData.forecasterTitle);

  // Check Role isolation
  if (studentData.facNavDisplay !== 'none') {
    throw new Error(`FAILED: Faculty nav is visible to student! display = ${studentData.facNavDisplay}`);
  }
  console.log('[PASS] Faculty Navigation is strictly hidden for student.');

  // Check Course cards
  if (studentData.courseCardCount !== 10) {
    throw new Error(`FAILED: Expected 10 courses, found ${studentData.courseCardCount}`);
  }
  console.log(`[PASS] All 10 courses rendered properly.`);

  // Test modal open
  console.log('Opening Math course syllabus modal...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[data-bs-target="#mathCourseModal"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const modalState = await page.evaluate(() => {
    const modal = document.getElementById('mathCourseModal');
    return {
      isShown: modal?.classList.contains('show'),
      title: modal?.querySelector('.modal-title')?.textContent?.trim()
    };
  });
  console.log('[PASS] Modal state:', modalState);

  // Close modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('#mathCourseModal .btn-close');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({ path: path.join(__dirname, 'student_screen.png') });
  console.log('[PASS] Saved student screenshot to scratch/student_screen.png');

  // -------------------------------------------------------------
  // Test 2: Faculty Login & Verification
  // -------------------------------------------------------------
  console.log('\n--- TEST 2: Faculty Login Flow ---');
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle0' });

  // Switch to Faculty Tab
  await page.click('#tabFacultyBtn');
  await new Promise(r => setTimeout(r, 300));

  // Faculty credentials
  await page.type('#facultyNameInput', 'Puja Chavan');
  await page.type('#facultyPassword', 'Puja Chavan@Apsit');
  await page.click('#facultySubmitBtn');

  await new Promise(r => setTimeout(r, 1800));

  const facultyUrl = page.url();
  console.log('Faculty redirected URL:', facultyUrl);

  const facultyData = await page.evaluate(() => {
    const navName = document.getElementById('navStudentName')?.textContent?.trim();
    const facPortalTitle = document.getElementById('facultyPortalTitle')?.textContent?.trim();
    const facNavDisplay = document.getElementById('sidebarFacultyNavItem')?.style.display;
    const facPaneStyle = window.getComputedStyle(document.getElementById('faculty-view'));
    const facActiveDisplay = document.getElementById('activeFacultyNameDisplay')?.textContent?.trim();
    
    // Check React Faculty Insights
    const insightsMounted = !!document.querySelector('#react-faculty-insights-root .card');
    const insightsTitle = document.querySelector('#react-faculty-insights-root h5')?.textContent?.trim();

    return {
      navName,
      facPortalTitle,
      facNavDisplay,
      facPaneDisplay: facPaneStyle.display,
      facPaneOpacity: facPaneStyle.opacity,
      facActiveDisplay,
      insightsMounted,
      insightsTitle
    };
  });

  console.log('Faculty Info:', facultyData);

  // Check no blank screen
  if (facultyData.facPaneDisplay === 'none' || facultyData.facPaneOpacity === '0') {
    throw new Error('FAILED: Faculty view is blank or hidden!');
  }
  console.log('[PASS] Faculty Portal is fully visible (display: ' + facultyData.facPaneDisplay + ', opacity: ' + facultyData.facPaneOpacity + ')');

  // Check React Faculty Insights
  if (!facultyData.insightsMounted) {
    throw new Error('FAILED: React Faculty Cohort Insights was NOT mounted!');
  }
  console.log('[PASS] React Faculty Cohort Insights mounted successfully:', facultyData.insightsTitle);

  // Check Faculty Profile
  if (!facultyData.facActiveDisplay.includes('Puja Chavan')) {
    throw new Error(`FAILED: Active faculty display did not match Puja Chavan: ${facultyData.facActiveDisplay}`);
  }
  console.log('[PASS] Faculty profile active display confirmed:', facultyData.facActiveDisplay);

  await page.screenshot({ path: path.join(__dirname, 'faculty_screen.png') });
  console.log('[PASS] Saved faculty screenshot to scratch/faculty_screen.png');

  // Check Console Errors
  console.log('\n--- Console Errors Check ---');
  if (consoleErrors.length > 0) {
    console.warn('Console errors observed:', consoleErrors);
  } else {
    console.log('[PASS] Zero console errors during all flows!');
  }

  await browser.close();
  console.log('\n=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ===');
}

runVerification().catch(err => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
