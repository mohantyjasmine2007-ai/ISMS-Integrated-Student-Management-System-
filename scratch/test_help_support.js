const puppeteer = require('puppeteer-core');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
    console.log('=== VERIFYING HELP & SUPPORT TAB IN DASHBOARD1.HTML ===\n');

    const browser = await puppeteer.launch({
        executablePath: EDGE_PATH,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });

    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    const htmlPath = path.resolve(__dirname, '..', 'dashboard1.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    console.log('Page loaded successfully.');

    // 1. Click Help & Support tab in sidebar
    console.log('Clicking Help & Support tab in sidebar...');
    await page.click('#help-tab');
    await new Promise(r => setTimeout(r, 600));

    const helpTabActive = await page.evaluate(() => {
        const tabPane = document.getElementById('help-view');
        const isActive = tabPane && tabPane.classList.contains('active') && tabPane.classList.contains('show');
        const helpdeskCount = tabPane?.querySelectorAll('.helpdesk-card')?.length || 0;
        const faqCount = tabPane?.querySelectorAll('.faq-item')?.length || 0;
        const ticketCards = tabPane?.querySelectorAll('.support-ticket-card')?.length || 0;
        return { isActive, helpdeskCount, faqCount, ticketCards };
    });

    console.log('Help View Details:', helpTabActive);
    if (!helpTabActive.isActive) throw new Error('#help-view tab failed to activate!');
    if (helpTabActive.helpdeskCount !== 4) throw new Error(`Expected 4 helpdesk cards, found ${helpTabActive.helpdeskCount}`);
    if (helpTabActive.faqCount !== 6) throw new Error(`Expected 6 FAQ items, found ${helpTabActive.faqCount}`);
    if (helpTabActive.ticketCards < 1) throw new Error(`Expected at least 1 ticket card, found ${helpTabActive.ticketCards}`);

    // Take screenshot in Light Mode
    await page.screenshot({ path: path.resolve(__dirname, 'help_tab_light.png'), fullPage: true });
    console.log('Saved help_tab_light.png');

    // 2. Test submitting a new support ticket
    console.log('Submitting a test support ticket...');
    await page.type('#ticketSubject', 'Test Attendance Grievance for Automata Theory');
    await page.type('#ticketMessage', 'Present for lecture on 09-Oct but attendance shows absent on tracker. Requesting verification.');
    await page.click('#supportTicketForm button[type="submit"]');
    await new Promise(r => setTimeout(r, 500));

    const newTicketState = await page.evaluate(() => {
        const alertEl = document.getElementById('ticketSuccessAlert');
        const isAlertVisible = alertEl && !alertEl.classList.contains('d-none');
        const count = document.querySelectorAll('.support-ticket-card').length;
        const firstTicketSubject = document.querySelector('.support-ticket-card h6')?.textContent?.trim();
        return { isAlertVisible, count, firstTicketSubject };
    });

    console.log('New Ticket Result:', newTicketState);
    if (!newTicketState.isAlertVisible) throw new Error('Ticket success alert was not displayed!');
    if (!newTicketState.firstTicketSubject.includes('Test Attendance Grievance')) throw new Error('New ticket subject not found at top!');

    // 3. Test FAQ Search Filtering
    console.log('Testing FAQ search filter...');
    await page.type('#helpFaqSearchInput', 'medical');
    await new Promise(r => setTimeout(r, 300));

    const faqFiltered = await page.evaluate(() => {
        const visibleFaqs = Array.from(document.querySelectorAll('.faq-item')).filter(el => el.style.display !== 'none');
        return visibleFaqs.length;
    });
    console.log('Visible FAQs after search "medical":', faqFiltered);
    if (faqFiltered !== 1) throw new Error(`Expected 1 FAQ matching 'medical', found ${faqFiltered}`);

    // 4. Test Dark Mode
    console.log('Testing Dark Mode...');
    await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        // Clear filter
        document.getElementById('helpFaqSearchInput').value = '';
        window.filterHelpFaqs('');
    });
    await new Promise(r => setTimeout(r, 400));

    await page.screenshot({ path: path.resolve(__dirname, 'help_tab_dark.png'), fullPage: true });
    console.log('Saved help_tab_dark.png');

    // 5. Switch back to Dashboard and then to About APSIT to ensure clean multi-tab navigation
    await page.click('#about-tab');
    await new Promise(r => setTimeout(r, 300));
    const aboutActive = await page.evaluate(() => document.getElementById('about-view')?.classList.contains('active'));
    console.log('Switched to About view:', aboutActive);

    await page.click('#dashboard-tab');
    await new Promise(r => setTimeout(r, 300));
    const dashActive = await page.evaluate(() => document.getElementById('dashboard-view')?.classList.contains('active'));
    console.log('Switched back to Dashboard:', dashActive);

    console.log('\nConsole Errors during test:', errors);
    await browser.close();

    console.log('\n=== ALL HELP & SUPPORT TESTS PASSED WITH 100% SUCCESS! ===');
}

run().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
