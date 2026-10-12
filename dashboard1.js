let activeFacultyObj = null;

    // Initialize application on load
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initSettingsModalEvents();

        const urlParams = new URLSearchParams(window.location.search);
        const isFaculty = isFacultyRole();
        const facultyNavItem = document.getElementById('sidebarFacultyNavItem');
        const facultyViewPane = document.getElementById('faculty-view');
        const topNavFacultyItem = document.getElementById('topNavFacultyItem');

        if (isFaculty) {
            // Authorized Faculty Mode: Bind Faculty Identity, Cohort Analytics & Access
            const faculty = getCurrentFaculty() || FACULTY_LIST[0];
            activeFacultyObj = faculty;
            applyFacultyData(faculty);
            initNotifications();
            initAnnouncements();

            if (facultyNavItem) facultyNavItem.style.display = 'block';
            if (topNavFacultyItem) topNavFacultyItem.style.display = 'block';
            if (facultyViewPane) facultyViewPane.style.display = 'block';
            initFacultyPortal();

            // Open Faculty view if URL parameter specifies it
            if (urlParams.get('view') === 'faculty') {
                openFacultyPortalTab();
            }
        } else {
            // Student Mode: Bind Logged-in Student Identity & Academic Records
            let student = getCurrentUser();
            if (!student) {
                student = getLiveStudents()[0];
                setCurrentUser(student);
            }

            applyStudentData(student);
            initNotifications();
            initAnnouncements();
            renderStudentGrades(student);

            if (facultyNavItem) facultyNavItem.style.display = 'none';
            if (topNavFacultyItem) topNavFacultyItem.style.display = 'none';
            if (facultyViewPane) facultyViewPane.style.display = 'none';

            // If a student tries to open URL with ?view=faculty, block access and redirect to dashboard
            if (urlParams.get('view') === 'faculty') {
                const dashTab = document.getElementById('dashboard-tab');
                if (dashTab) {
                    const tabInstance = new bootstrap.Tab(dashTab);
                    tabInstance.show();
                }
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }

        // Open About or Help tab if URL specifies it
        if (urlParams.get('view') === 'about') {
            openAboutApsitTab();
        } else if (urlParams.get('view') === 'help') {
            openHelpSupportTab();
        }

        // Initialize Help & Support Module
        initHelpSupportModule();

        // Listen for storage events across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'apsit_isms_dynamic_students') {
                if (isFacultyRole()) {
                    if (activeFacultyObj) applyFacultyData(activeFacultyObj);
                    renderFacultyRoster();
                } else {
                    const refreshed = getCurrentUser();
                    if (refreshed) applyStudentData(refreshed);
                }
            }
        });
    });

    // Switch to About APSIT tab
    function openAboutApsitTab() {
        const aboutTab = document.getElementById('about-tab');
        if (aboutTab) {
            const tabInstance = bootstrap.Tab.getOrCreateInstance(aboutTab);
            tabInstance.show();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    window.openAboutApsitTab = openAboutApsitTab;

    // Switch to Help & Support tab
    function openHelpSupportTab() {
        const helpTab = document.getElementById('help-tab');
        if (helpTab) {
            const tabInstance = bootstrap.Tab.getOrCreateInstance(helpTab);
            tabInstance.show();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    window.openHelpSupportTab = openHelpSupportTab;

    // Switch to Faculty Portal tab
    function openFacultyPortalTab() {
        if (!isFacultyRole()) {
            alert('Access Denied: The Faculty Academic Portal is restricted to authorized faculty members only.');
            return;
        }
        const tabEl = document.getElementById('faculty-tab');
        if (tabEl) {
            const tabInstance = new bootstrap.Tab(tabEl);
            tabInstance.show();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Apply Faculty data across the entire UI (Top Navbar, Dashboard Tab, Overview Stats & ID Card)
    function applyFacultyData(faculty) {
        if (!faculty) return;

        // 1. Top Navbar Profile
        const navName = document.getElementById('navStudentName');
        if (navName) navName.textContent = faculty.title;

        const navBadge = document.getElementById('navMoodleBadge');
        if (navBadge) {
            navBadge.textContent = 'Faculty In-Charge';
            navBadge.className = 'badge bg-warning text-dark fw-bold';
        }

        const dropFullName = document.getElementById('dropdownStudentFullName');
        if (dropFullName) dropFullName.textContent = faculty.title;

        const dropMeta = document.getElementById('dropdownStudentMeta');
        if (dropMeta) dropMeta.textContent = `${faculty.subjectName} • ${faculty.email}`;

        const idCardLink = document.querySelector('[data-bs-target="#idCardModal"]');
        if (idCardLink) {
            idCardLink.innerHTML = '<i class="bi bi-person-badge text-primary me-2"></i> My Faculty ID Card';
        }

        // 2. Welcome Card on Dashboard Tab (Replace student info with faculty info)
        const roleBadge = document.getElementById('dashRoleBadge');
        if (roleBadge) {
            roleBadge.textContent = 'FACULTY IN-CHARGE';
            roleBadge.className = 'badge bg-warning text-dark fw-bold px-3 py-1';
        }

        const overallBadge = document.getElementById('dashOverallAttendanceBadge');
        if (overallBadge) {
            overallBadge.innerHTML = '<i class="bi bi-people-fill me-1"></i> Class: SE IT DIV B (70 Students)';
            overallBadge.className = 'badge bg-light text-primary fw-semibold';
        }

        const dashName = document.getElementById('dashStudentName');
        if (dashName) dashName.textContent = faculty.title;

        const dashSubtitle = document.getElementById('dashStudentSubtitle');
        if (dashSubtitle) {
            dashSubtitle.innerHTML = `Department of Information Technology • <span class="fw-semibold">Faculty In-Charge</span> | Assigned: <span class="fw-semibold">${faculty.subjectName}</span> (${faculty.type})`;
        }

        const dashDesc = document.getElementById('dashWelcomeDesc');
        if (dashDesc) {
            dashDesc.textContent = 'Manage class attendance registers, conduct scheduled lectures, evaluate student term-work, review cohort telemetry, and download official rosters.';
        }

        const welcomeIcon = document.getElementById('dashWelcomeIcon');
        if (welcomeIcon) {
            welcomeIcon.className = 'bi bi-person-workspace';
        }

        // 3. Compute live cohort metrics for this faculty's assigned subject
        const students = getLiveStudents();
        const subjKey = faculty.subjectKey;
        const subjInfo = (typeof SUBJECT_INFO !== 'undefined' && SUBJECT_INFO[subjKey]) ? SUBJECT_INFO[subjKey] : { conducted: 18, type: faculty.type };

        let totalAttended = 0;
        let eligibleCount = 0;
        students.forEach(s => {
            const att = s.attendance?.[subjKey] || { attended: 0, pct: 0 };
            totalAttended += att.attended;
            if (att.pct >= 75) eligibleCount++;
        });

        const avgPct = students.length > 0 ? Math.round((totalAttended / (students.length * (subjInfo.conducted || 1))) * 100) : 0;
        const defaulterCount = students.length - eligibleCount;

        // 4. Academic Overview Statistics on Dashboard Tab
        const overviewTitle = document.getElementById('dashOverviewTitle');
        if (overviewTitle) overviewTitle.innerHTML = `<i class="bi bi-graph-up-arrow text-primary me-2"></i>Cohort Academic & Attendance Overview — ${faculty.subjectName}`;

        const actionBtn = document.getElementById('dashOverviewActionBtn');
        if (actionBtn) {
            actionBtn.innerHTML = '<i class="bi bi-person-workspace me-1"></i> Open Faculty Attendance Register';
            actionBtn.onclick = () => openFacultyPortalTab();
        }

        const card1Val = document.getElementById('dashEnrolledCoursesVal');
        if (card1Val) card1Val.textContent = '70';
        const card1Label = document.getElementById('dashCard1Label');
        if (card1Label) card1Label.textContent = 'Enrolled Students';
        const card1Sub = document.getElementById('dashCard1Sub');
        if (card1Sub) card1Sub.textContent = 'SE IT Div B Roster';

        const card2Val = document.getElementById('dashTheoryAttended');
        if (card2Val) card2Val.textContent = `${subjInfo.conducted} Hours`;
        const card2Label = document.getElementById('dashCard2Label');
        if (card2Label) card2Label.textContent = 'Conducted Lectures';
        const card2Sub = document.getElementById('dashTheoryPct');
        if (card2Sub) {
            card2Sub.textContent = `${faculty.subjectName} (${faculty.type})`;
            card2Sub.className = 'text-primary fw-semibold';
        }

        const card3Val = document.getElementById('dashPracticalAvg');
        if (card3Val) card3Val.textContent = `${avgPct}%`;
        const card3Label = document.getElementById('dashCard3Label');
        if (card3Label) card3Label.textContent = 'Class Avg Attendance';
        const card3Sub = document.getElementById('dashCard3Sub');
        if (card3Sub) {
            card3Sub.textContent = 'SE IT Div B Cohort';
            card3Sub.className = 'text-info fw-semibold';
        }

        const card4Val = document.getElementById('dashOverallAttendance');
        if (card4Val) card4Val.textContent = `${eligibleCount} / 70`;
        const card4Label = document.getElementById('dashCard4Label');
        if (card4Label) card4Label.textContent = 'Eligible Students (≥75%)';
        const card4Badge = document.getElementById('dashEligibilityBadge');
        if (card4Badge) {
            card4Badge.textContent = `${eligibleCount} Safe / ${defaulterCount} Defaulters`;
            card4Badge.className = 'badge bg-success';
        }

        // 5. Sidebar Badge
        const sideBadge = document.getElementById('sidebarAttendanceBadge');
        if (sideBadge) {
            sideBadge.textContent = `${avgPct}% Avg`;
            sideBadge.className = 'badge bg-primary';
        }

        // Re-route personal attendance & grade tabs to Faculty Portal when clicked by faculty
        const attTab = document.getElementById('attendance-tab');
        if (attTab) {
            attTab.onclick = (e) => {
                e.preventDefault();
                openFacultyPortalTab();
            };
        }
        const gradesTab = document.getElementById('grades-tab');
        if (gradesTab) {
            gradesTab.onclick = (e) => {
                e.preventDefault();
                openFacultyPortalTab();
            };
        }

        // 6. Update Personal Attendance card elements for Faculty view
        const attCardName = document.getElementById('attCardStudentName');
        if (attCardName) attCardName.textContent = faculty.title;
        const attCardMeta = document.getElementById('attCardStudentMeta');
        if (attCardMeta) attCardMeta.textContent = `Faculty In-Charge • Department of IT | Assigned: ${faculty.subjectName} (${faculty.type})`;
        const attAvatar = document.getElementById('attCardAvatar');
        if (attAvatar) attAvatar.textContent = 'FAC';
        const attOverall = document.getElementById('attOverallBadge');
        if (attOverall) attOverall.textContent = `Cohort Avg: ${avgPct}%`;
        const attTheory = document.getElementById('attTheoryBadge');
        if (attTheory) attTheory.textContent = `Conducted: ${subjInfo.conducted} Hours`;
        const attPractical = document.getElementById('attPracticalBadge');
        if (attPractical) attPractical.textContent = `Eligible: ${eligibleCount} / 70`;
        const attBig = document.getElementById('attBigPercentage');
        if (attBig) attBig.textContent = `${avgPct}%`;
        const attBigBar = document.getElementById('attBigProgressBar');
        if (attBigBar) attBigBar.style.width = `${avgPct}%`;
        const attEligText = document.getElementById('attEligibilityText');
        if (attEligText) attEligText.textContent = `Cohort Status: ${eligibleCount} Students in Safe Standing (≥75%), ${defaulterCount} Defaulters`;

        // 7. Update ID Card Modal for Faculty
        updateIdCardForFaculty(faculty);
    }

    // Update ID Card Modal to render official Faculty / Staff Identity Card
    function updateIdCardForFaculty(faculty) {
        const strip = document.getElementById('idCardHeaderStrip');
        if (strip) strip.textContent = 'FACULTY IDENTITY CARD | A.Y 2026 - 2027';

        const name = document.getElementById('idCardName');
        if (name) name.textContent = faculty.title.toUpperCase();

        const role = document.getElementById('idCardRole');
        if (role) role.textContent = 'Faculty In-Charge • Department of IT';

        const lbl1 = document.getElementById('idCardFieldLabel1');
        if (lbl1) lbl1.textContent = 'Faculty Code';
        const val1 = document.getElementById('idCardRoll');
        if (val1) val1.textContent = faculty.id || 'FAC-IT-01';

        const lbl2 = document.getElementById('idCardFieldLabel2');
        if (lbl2) lbl2.textContent = 'Official Email';
        const val2 = document.getElementById('idCardMoodle');
        if (val2) val2.textContent = faculty.email;

        const lbl3 = document.getElementById('idCardFieldLabel3');
        if (lbl3) lbl3.textContent = 'Assigned Course';
        const val3 = document.getElementById('idCardCourse');
        if (val3) val3.textContent = `${faculty.subjectName} (${faculty.type})`;

        const lbl4 = document.getElementById('idCardFieldLabel4');
        if (lbl4) lbl4.textContent = 'Designation';
        const val4 = document.getElementById('idCardDob');
        if (val4) val4.textContent = 'Assistant Professor';

        const lbl5 = document.getElementById('idCardFieldLabel5');
        if (lbl5) lbl5.textContent = 'Employment';
        const val5 = document.getElementById('idCardBlood');
        if (val5) val5.textContent = 'Permanent / Full-Time';

        const lbl6 = document.getElementById('idCardFieldLabel6');
        if (lbl6) lbl6.textContent = 'EPABX Contact';
        const val6 = document.getElementById('idCardContact');
        if (val6) val6.textContent = '+91 (022) 25973737';

        const validUpto = document.getElementById('idCardValidUpto');
        if (validUpto) validUpto.textContent = '31 May 2027';
    }

    // Apply student data across the UI for logged-in students
    function applyStudentData(student) {
        if (!student) return;

        // Reset Welcome Card for student
        const roleBadge = document.getElementById('dashRoleBadge');
        if (roleBadge) {
            roleBadge.textContent = 'SE IT DIV B';
            roleBadge.className = 'badge bg-warning text-dark fw-bold px-3 py-1';
        }
        const welcomeIcon = document.getElementById('dashWelcomeIcon');
        if (welcomeIcon) {
            welcomeIcon.className = 'bi bi-mortarboard-fill';
        }
        const dashDesc = document.getElementById('dashWelcomeDesc');
        if (dashDesc) {
            dashDesc.textContent = 'Access your courses, attendance reports, syllabi, grades, and academic records in one integrated portal.';
        }
        const card1Label = document.getElementById('dashCard1Label');
        if (card1Label) card1Label.textContent = 'Enrolled Courses';
        const card1Sub = document.getElementById('dashCard1Sub');
        if (card1Sub) card1Sub.textContent = 'Sem III (IT Dept)';
        const card2Label = document.getElementById('dashCard2Label');
        if (card2Label) card2Label.textContent = 'Theory Attendance';
        const card3Label = document.getElementById('dashCard3Label');
        if (card3Label) card3Label.textContent = 'Practical Average';
        const card3Sub = document.getElementById('dashCard3Sub');
        if (card3Sub) card3Sub.textContent = 'Labs & Practicals';
        const card4Label = document.getElementById('dashCard4Label');
        if (card4Label) card4Label.textContent = 'Overall Attendance';
        const overviewTitle = document.getElementById('dashOverviewTitle');
        if (overviewTitle) overviewTitle.textContent = 'Academic & Attendance Overview';
        const actionBtn = document.getElementById('dashOverviewActionBtn');
        if (actionBtn) {
            actionBtn.innerHTML = '<i class="bi bi-calendar-check me-1"></i> View Full Attendance Report';
            actionBtn.onclick = () => document.getElementById('attendance-tab')?.click();
        }

        // Reset ID Card Modal for student
        const strip = document.getElementById('idCardHeaderStrip');
        if (strip) strip.textContent = 'STUDENT IDENTITY CARD | A.Y 2025 - 2026';
        const lbl1 = document.getElementById('idCardFieldLabel1');
        if (lbl1) lbl1.textContent = 'Roll Number';
        const lbl2 = document.getElementById('idCardFieldLabel2');
        if (lbl2) lbl2.textContent = 'Moodle ID.';
        const lbl3 = document.getElementById('idCardFieldLabel3');
        if (lbl3) lbl3.textContent = 'Course';
        const lbl4 = document.getElementById('idCardFieldLabel4');
        if (lbl4) lbl4.textContent = 'Date of Birth';
        const lbl5 = document.getElementById('idCardFieldLabel5');
        if (lbl5) lbl5.textContent = 'Blood Group';
        const lbl6 = document.getElementById('idCardFieldLabel6');
        if (lbl6) lbl6.textContent = 'Contact';
        const validUpto = document.getElementById('idCardValidUpto');
        if (validUpto) validUpto.textContent = '31 May 2026';

        // Navbar
        document.getElementById('navStudentName').textContent = student.name;
        document.getElementById('navMoodleBadge').textContent = student.moodleId;
        document.getElementById('navMoodleBadge').className = 'badge bg-light text-dark fw-bold';
        document.getElementById('dropdownStudentFullName').textContent = student.fullName;
        document.getElementById('dropdownStudentMeta').textContent = `Roll: ${student.rollNo} | ID: ${student.moodleId}`;
        const idCardLink = document.querySelector('[data-bs-target="#idCardModal"]');
        if (idCardLink) {
            idCardLink.innerHTML = '<i class="bi bi-person-badge text-primary me-2"></i> My Profile (ID Card)';
        }

        // Sidebar badge
        const sideBadge = document.getElementById('sidebarAttendanceBadge');
        if (sideBadge) {
            sideBadge.textContent = student.attendance.overallPct + '%';
            sideBadge.className = student.attendance.overallPct >= 75 ? 'badge bg-success' : (student.attendance.overallPct >= 60 ? 'badge bg-warning text-dark' : 'badge bg-danger');
        }

        // Welcome card
        document.getElementById('dashStudentName').textContent = student.name;
        document.getElementById('dashStudentSubtitle').innerHTML = `Roll No: <span id="dashRollNo" class="fw-semibold">${student.rollNo}</span> | Moodle ID: <span id="dashMoodleId" class="fw-semibold">${student.moodleId}</span> | Semester III`;
        const dashBadge = document.getElementById('dashOverallAttendanceBadge');
        if (dashBadge) {
            dashBadge.textContent = `Attendance: ${student.attendance.overallPct}% (${student.attendance.overallPct >= 75 ? 'Eligible' : 'Defaulter Risk'})`;
            dashBadge.className = student.attendance.overallPct >= 75 ? 'badge bg-light text-primary fw-semibold' : 'badge bg-danger text-white fw-semibold';
        }

        // Academic Overview stats
        const card1Val = document.getElementById('dashEnrolledCoursesVal');
        if (card1Val) card1Val.textContent = '10';
        document.getElementById('dashTheoryAttended').textContent = `${student.attendance.theoryTotal.attended} / 146`;
        document.getElementById('dashTheoryPct').textContent = `${student.attendance.theoryTotal.pct}% (Conducted)`;
        document.getElementById('dashTheoryPct').className = 'text-success fw-bold';
        document.getElementById('dashPracticalAvg').textContent = `${student.attendance.practicalAvg}%`;
        document.getElementById('dashOverallAttendance').textContent = `${student.attendance.overallPct}%`;
        
        const eligBadge = document.getElementById('dashEligibilityBadge');
        if (eligBadge) {
            if (student.attendance.overallPct >= 75) {
                eligBadge.className = 'badge bg-success';
                eligBadge.textContent = 'Eligible';
            } else if (student.attendance.overallPct >= 60) {
                eligBadge.className = 'badge bg-warning text-dark';
                eligBadge.textContent = 'Warning (<75%)';
            } else {
                eligBadge.className = 'badge bg-danger';
                eligBadge.textContent = 'Critical Defaulter';
            }
        }

        // ID Card Modal
        document.getElementById('idCardName').textContent = student.fullName;
        document.getElementById('idCardRole').textContent = student.department;
        document.getElementById('idCardRoll').textContent = student.rollNo;
        document.getElementById('idCardMoodle').textContent = student.moodleId;
        document.getElementById('idCardCourse').textContent = student.class + ' (Div ' + student.division + ')';
        document.getElementById('idCardDob').textContent = student.dob;
        document.getElementById('idCardBlood').textContent = student.bloodGroup;
        document.getElementById('idCardContact').textContent = student.contact;

        // Attendance View
        document.getElementById('attCardStudentName').textContent = student.fullName;
        document.getElementById('attCardStudentMeta').textContent = `Roll: ${student.rollNo} | Moodle ID: ${student.moodleId} | SE IT Div B`;
        const initials = student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        document.getElementById('attCardAvatar').textContent = initials;
        
        const attOverall = document.getElementById('attOverallBadge');
        attOverall.textContent = `Overall: ${student.attendance.overallPct}% (${student.attendance.overallPct >= 75 ? 'Eligible' : 'Defaulter Risk'})`;
        attOverall.className = student.attendance.overallPct >= 75 ? 'badge bg-success-subtle text-success px-3 py-2 fs-6' : 'badge bg-danger-subtle text-danger px-3 py-2 fs-6';

        document.getElementById('attTheoryBadge').textContent = `Theory: ${student.attendance.theoryTotal.pct}% (${student.attendance.theoryTotal.attended}/146)`;
        document.getElementById('attPracticalBadge').textContent = `Practical: ${student.attendance.practicalAvg}%`;

        document.getElementById('attBigPercentage').textContent = student.attendance.overallPct + '%';
        const bigBar = document.getElementById('attBigProgressBar');
        bigBar.style.width = student.attendance.overallPct + '%';
        bigBar.className = student.attendance.overallPct >= 75 ? 'progress-bar bg-success' : (student.attendance.overallPct >= 60 ? 'progress-bar bg-warning' : 'progress-bar bg-danger');

        const eligText = document.getElementById('attEligibilityText');
        eligText.textContent = student.attendance.overallPct >= 75 
            ? 'Status: Good Standing (Eligible for Examinations)' 
            : (student.attendance.overallPct >= 60 ? 'Status: Warning (Attendance below 75% limit)' : 'Status: Critical Defaulter (Immediate action required)');

        renderPersonalSubjectTable(student);
        renderComplianceAnalytics(student);
        renderStudentGrades(student);
    }

    // Render personal subject breakdown table
    function renderPersonalSubjectTable(student) {
        const tbody = document.getElementById('personalSubjectTableBody');
        if (!tbody) return;

        const keys = ['amt1', 'adsa', 'dbms', 'at', 'oe', 'fsjp', 'evs', 'ed', 'mentoring'];
        let html = '';

        keys.forEach(k => {
            const info = SUBJECT_INFO[k];
            const data = student.attendance[k];
            const pct = data.pct;
            let barColor = pct >= 75 ? 'bg-success' : (pct >= 60 ? 'bg-warning' : 'bg-danger');
            let badgeClass = pct >= 75 ? 'bg-success-subtle text-success' : (pct >= 60 ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger');
            let statusText = pct >= 75 ? 'Safe' : (pct >= 60 ? 'Warning' : 'Shortage');

            html += `
                <tr>
                    <td class="fw-bold text-primary">${info.code}</td>
                    <td>
                        <span class="fw-semibold">${info.name}</span>
                        <div class="small text-muted"><i class="bi bi-person-fill text-secondary me-1"></i>${info.facultyTitle || info.faculty}</div>
                    </td>
                    <td class="text-center fw-semibold">${info.conducted}</td>
                    <td class="text-center fw-bold">${data.attended}</td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <div class="progress flex-grow-1" style="height: 7px;">
                                <div class="progress-bar ${barColor}" style="width: ${pct}%"></div>
                            </div>
                            <span class="fw-bold small" style="min-width: 40px;">${pct}%</span>
                        </div>
                    </td>
                    <td class="text-center">
                        <span class="badge ${badgeClass}">${statusText}</span>
                    </td>
                </tr>
            `;
        });

        // Summary Row
        html += `
            <tr class="table-light fw-bold">
                <td colspan="2" class="text-uppercase text-secondary">Theory Total Summary</td>
                <td class="text-center">146</td>
                <td class="text-center text-primary fs-6">${student.attendance.theoryTotal.attended}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <div class="progress flex-grow-1" style="height: 10px;">
                            <div class="progress-bar ${student.attendance.theoryTotal.pct >= 75 ? 'bg-success' : 'bg-danger'}" style="width: ${student.attendance.theoryTotal.pct}%"></div>
                        </div>
                        <span class="fw-bold">${student.attendance.theoryTotal.pct}%</span>
                    </div>
                </td>
                <td class="text-center">
                    <span class="badge ${student.attendance.theoryTotal.pct >= 75 ? 'bg-success' : 'bg-danger'}">${student.attendance.theoryTotal.pct >= 75 ? 'Overall Safe' : 'Defaulter'}</span>
                </td>
            </tr>
        `;

        tbody.innerHTML = html;
    }

    // Render Safe Margin & University Compliance Analytics
    function renderComplianceAnalytics(student) {
        const conducted = 146;
        const attended = student.attendance.theoryTotal.attended;
        const overallPct = student.attendance.overallPct;

        const marginValEl = document.getElementById('safeMarginValue');
        const marginTextEl = document.getElementById('safeMarginText');
        const examStatusEl = document.getElementById('examEligibilityStatus');
        const examTextEl = document.getElementById('examEligibilityText');

        if (!marginValEl) return;

        if (overallPct >= 75) {
            const safeMiss = Math.max(0, Math.floor(attended / 0.75 - conducted));
            marginValEl.textContent = `+${safeMiss} Lectures`;
            marginValEl.className = 'display-6 fw-bold text-success';
            marginTextEl.textContent = `You can safely miss up to ${safeMiss} upcoming lectures while maintaining attendance above the mandatory 75% threshold.`;

            examStatusEl.innerHTML = '<span class="badge bg-success fs-6 py-2 px-3"><i class="bi bi-check-circle-fill me-1"></i> Term-Work & Exam Approved</span>';
            examTextEl.textContent = `Attendance of ${overallPct}% fully satisfies University criteria. Eligible for End-Sem Exam Hall Ticket.`;
        } else {
            const needed = Math.max(1, Math.ceil(3 * conducted - 4 * attended));
            marginValEl.textContent = `${needed} Needed`;
            marginValEl.className = 'display-6 fw-bold text-danger';
            marginTextEl.textContent = `You must attend the next ${needed} consecutive lectures without absence to bring your attendance back to 75%.`;

            if (overallPct >= 60) {
                examStatusEl.innerHTML = '<span class="badge bg-warning text-dark fs-6 py-2 px-3"><i class="bi bi-exclamation-triangle-fill me-1"></i> Warning: Defaulter Risk</span>';
                examTextEl.textContent = `Attendance is ${overallPct}% (<75%). Submit mentoring report and attend mandatory makeup lectures to avoid exam detention.`;
            } else {
                examStatusEl.innerHTML = '<span class="badge bg-danger fs-6 py-2 px-3"><i class="bi bi-x-circle-fill me-1"></i> Critical Shortage List</span>';
                examTextEl.textContent = `Attendance is ${overallPct}%. Subject to detention from Semester End Examinations per Mumbai University Ordinance.`;
            }
        }
    }

    // Render all 10 subjects in Student Grades Tab
    function renderStudentGrades(student) {
        const tbody = document.getElementById('studentGradesTableBody');
        if (!tbody || !student) return;

        initializeStudentGrades(student);

        const courseKeys = [
            { key: 'amt1', code: 'ITC301', name: 'Applied Mathematics Thinking-I', maxTW: 25 },
            { key: 'adsa', code: 'ITC302', name: 'Advance Data Structure & Analysis', maxTW: 25 },
            { key: 'dbms', code: 'ITC303', name: 'Database Management System & App', maxTW: 25 },
            { key: 'at', code: 'ITC304', name: 'Automata Theory', maxTW: 25 },
            { key: 'oe', code: 'ITC305', name: 'Open Elective (Banking & Finance)', maxTW: 25 },
            { key: 'adsaLab', code: 'ITL301', name: 'ADSA Lab', maxTW: 25 },
            { key: 'sqlLab', code: 'ITL302', name: 'SQL Lab', maxTW: 25 },
            { key: 'fsjp', code: 'ITM301', name: 'Mini-Project - Full Stack Java Programming', maxTW: 50 },
            { key: 'ed', code: '2993511', name: 'Entrepreneurship Development', maxTW: 50 },
            { key: 'evs', code: '2993512', name: 'Environmental Science', maxTW: 50 }
        ];

        let html = '';
        courseKeys.forEach(c => {
            const fac = FACULTY_LIST.find(f => f.subjectKey === c.key);
            const facName = fac ? fac.title : (SUBJECT_INFO[c.key]?.facultyTitle || 'Assigned Faculty');
            const g = student.grades[c.key] || { termWork: 20, maxTermWork: c.maxTW, iat1: 18, iat2: 18, grade: 'A+', status: 'Completed' };
            const iat1Text = g.iat1 !== undefined ? `${g.iat1} / 20` : '--';
            const iat2Text = g.iat2 !== undefined ? `${g.iat2} / 20` : '--';
            const statusClass = g.status === 'Completed' || g.status === 'Passed' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary';

            html += `
                <tr>
                    <td><strong>${c.code}</strong></td>
                    <td class="fw-semibold">${c.name}</td>
                    <td>
                        <span class="badge bg-light text-dark border">
                            <i class="bi bi-person-fill text-primary me-1"></i>${facName}
                        </span>
                    </td>
                    <td class="text-center">${iat1Text}</td>
                    <td class="text-center">${iat2Text}</td>
                    <td class="text-center"><span class="badge bg-primary">${g.termWork} / ${c.maxTW}</span></td>
                    <td class="text-center fw-bold text-success">${g.grade || 'A+'}</td>
                    <td class="text-center"><span class="badge ${statusClass}">${g.status || 'Submitted'}</span></td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    }

    // Dynamic Notifications & Academic Calendar
    function initNotifications() {
        const notifContainer = document.getElementById('dynamicNotificationsList');
        if (!notifContainer) return;

        let html = '';
        ACADEMIC_CALENDAR_EVENTS.slice(0, 8).forEach(ev => {
            html += `
                <li>
                    <a class="dropdown-item py-2 px-2 rounded hover-bg-light" href="#">
                        <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                            <span class="badge ${ev.badge} small">${ev.type}</span>
                            <small class="text-muted fw-semibold">${ev.date}</small>
                        </div>
                        <h6 class="mb-1 text-wrap fw-semibold fs-6 text-dark">${ev.title}</h6>
                        <small class="text-muted d-block text-truncate" style="max-width: 320px;">${ev.desc}</small>
                    </a>
                </li>
                <li><hr class="dropdown-divider my-1"></li>
            `;
        });
        notifContainer.innerHTML = html;
    }

    // Render Announcements Grid on Dashboard
    function initAnnouncements() {
        const grid = document.getElementById('dashUpcomingEventsGrid');
        if (!grid) return;

        let html = '';
        ACADEMIC_CALENDAR_EVENTS.slice(0, 4).forEach(ev => {
            html += `
                <div class="col-md-6">
                    <div class="p-3 rounded border bg-light h-100">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge ${ev.badge}">${ev.type}</span>
                            <span class="badge bg-white text-secondary border fw-bold">${ev.date}</span>
                        </div>
                        <h6 class="fw-bold mb-1 text-primary">${ev.title}</h6>
                        <p class="small text-muted mb-0">${ev.desc}</p>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    }

    // Faculty Management Portal Functions
    function initFacultyPortal() {
        activeFacultyObj = getCurrentFaculty() || FACULTY_LIST[0];
        applyFacultyData(activeFacultyObj);
        
        // Update locked faculty profile card
        const nameDisp = document.getElementById('activeFacultyNameDisplay');
        const emailDisp = document.getElementById('activeFacultyEmailDisplay');
        if (nameDisp) nameDisp.textContent = activeFacultyObj.title;
        if (emailDisp) emailDisp.textContent = activeFacultyObj.email;

        // Populate only courses belonging to THIS logged-in faculty
        const myCourses = getFacultyCourses(activeFacultyObj.name);
        const container = document.getElementById('facultyCourseControlContainer');
        
        if (container) {
            if (myCourses.length > 1) {
                let optionsHtml = '';
                myCourses.forEach(c => {
                    const isSelected = c.id === activeFacultyObj.id ? 'selected' : '';
                    optionsHtml += `<option value="${c.id}" ${isSelected}>${c.subjectName} (${c.type})</option>`;
                });
                container.innerHTML = `
                    <label class="form-label fw-bold small text-muted text-uppercase mb-1" for="facultyCourseDropdown">
                        <i class="bi bi-journal-bookmark-fill text-primary me-1"></i> Switch My Assigned Course
                    </label>
                    <select class="form-select form-select-sm fw-semibold" id="facultyCourseDropdown" onchange="onFacultyCourseChange(this.value)">
                        ${optionsHtml}
                    </select>
                `;
            } else {
                container.innerHTML = `
                    <div class="d-flex align-items-center justify-content-between mb-1">
                        <span class="small fw-bold text-muted text-uppercase">Assigned Course</span>
                        <span class="badge bg-primary-subtle text-primary border"><i class="bi bi-book-half me-1"></i> ${activeFacultyObj.type}</span>
                    </div>
                    <div class="p-2 bg-light rounded border fw-bold text-dark small">
                        ${activeFacultyObj.subjectName}
                    </div>
                `;
            }
        }

        updateFacultyHeaderInfo();
        renderFacultyRoster();
    }

    function onFacultyCourseChange(courseId) {
        // Can only switch between courses assigned to THIS logged-in faculty
        const myCourses = getFacultyCourses(activeFacultyObj.name);
        const found = myCourses.find(f => f.id === courseId);
        if (found) {
            activeFacultyObj = found;
            setCurrentFaculty(found);
            applyFacultyData(found);
            updateFacultyHeaderInfo();
            renderFacultyRoster();
            if (typeof mountReactModules === 'function') mountReactModules();
        }
    }

    function updateFacultyHeaderInfo() {
        if (!activeFacultyObj) return;
        const titleEl = document.getElementById('facultyPortalTitle');
        const subtitleEl = document.getElementById('facultyPortalSubtitle');
        const infoEl = document.getElementById('activeFacultySubjectInfo');
        const statConducted = document.getElementById('facStatConducted');
        const statType = document.getElementById('facStatType');
        const colHeader = document.getElementById('facColSubjectAtt');

        if (titleEl) titleEl.textContent = `${activeFacultyObj.title} — Faculty Portal`;
        if (subtitleEl) subtitleEl.textContent = `Course In-Charge: ${activeFacultyObj.subjectName} (${activeFacultyObj.type}) • Official Marks & Attendance Register`;
        if (infoEl) infoEl.innerHTML = `Course: <strong class="text-primary">${activeFacultyObj.subjectName}</strong> • ${activeFacultyObj.email}`;

        const subjInfo = SUBJECT_INFO[activeFacultyObj.subjectKey] || { conducted: 20, type: activeFacultyObj.type };
        if (statConducted) statConducted.textContent = subjInfo.conducted || 20;
        if (statType) statType.textContent = `${subjInfo.type || 'Course'} Hours`;
        if (colHeader) colHeader.textContent = `${activeFacultyObj.subjectName.substring(0, 14)}.. (${subjInfo.conducted})`;
    }

    function renderFacultyRoster() {
        const tbody = document.getElementById('facultyRosterTableBody');
        if (!tbody || !activeFacultyObj) return;

        const students = getLiveStudents();
        const searchVal = (document.getElementById('facultyRosterSearch')?.value || '').toLowerCase().trim();
        const filterVal = document.getElementById('facultyAttendanceFilter')?.value || 'all';
        const subjKey = activeFacultyObj.subjectKey;
        const subjInfo = SUBJECT_INFO[subjKey] || { conducted: 20 };

        let eligibleCount = 0;
        let defaulterCount = 0;
        let totalPctSum = 0;
        let displayedCount = 0;
        let html = '';

        students.forEach(s => {
            initializeStudentGrades(s);
            const attData = s.attendance[subjKey] || { attended: Math.round(subjInfo.conducted * 0.75), pct: 75 };
            const subPct = attData.pct;
            const overallPct = s.attendance.overallPct;
            const gradesData = s.grades[subjKey] || { termWork: 22, maxTermWork: 25, grade: 'A+', status: 'Completed' };

            if (subPct >= 75) eligibleCount++;
            else defaulterCount++;
            totalPctSum += subPct;

            // Search filter
            const matchesSearch = !searchVal || 
                s.name.toLowerCase().includes(searchVal) || 
                s.moodleId.includes(searchVal) || 
                s.rollNo.toLowerCase().includes(searchVal);

            // Eligibility filter
            const matchesFilter = filterVal === 'all' || 
                (filterVal === 'safe' && subPct >= 75) || 
                (filterVal === 'defaulters' && subPct < 75);

            if (matchesSearch && matchesFilter) {
                displayedCount++;
                const badgeColor = subPct >= 75 ? 'bg-success' : (subPct >= 60 ? 'bg-warning text-dark' : 'bg-danger');
                const overallBadgeColor = overallPct >= 75 ? 'bg-success' : 'bg-danger';

                html += `
                    <tr>
                        <td class="fw-bold text-secondary">${s.rollNo}</td>
                        <td class="fw-bold text-primary">${s.moodleId}</td>
                        <td>
                            <div class="fw-semibold">${s.name}</div>
                            <small class="text-muted">${s.contact}</small>
                        </td>
                        <td class="text-center fw-bold fs-6">${attData.attended} / ${subjInfo.conducted}</td>
                        <td class="text-center">
                            <span class="badge ${badgeColor}">${subPct}%</span>
                        </td>
                        <td class="text-center">
                            <span class="badge ${overallBadgeColor}">${overallPct}%</span>
                        </td>
                        <td class="text-center">
                            <span class="badge bg-primary-subtle text-primary border">${gradesData.termWork} / ${gradesData.maxTermWork || 25}</span>
                        </td>
                        <td class="text-center">
                            <span class="badge bg-light text-dark border fw-bold">${gradesData.grade || 'A+'}</span>
                        </td>
                        <td class="text-center">
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-outline-primary" onclick="openFacultyAttendanceModal('${s.moodleId}')" title="Edit Attendance">
                                    <i class="bi bi-calendar-check me-1"></i> Att.
                                </button>
                                <button class="btn btn-outline-success" onclick="openFacultyGradeModal('${s.moodleId}')" title="Edit Grade">
                                    <i class="bi bi-award me-1"></i> Grade
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
        });

        tbody.innerHTML = html;

        // Update statistics
        const avgPct = Math.round(totalPctSum / (students.length || 1));
        document.getElementById('facStatAvgPct').textContent = `${avgPct}%`;
        document.getElementById('facStatEligibleCount').textContent = eligibleCount;
        document.getElementById('facStatDefaulterCount').textContent = defaulterCount;
        document.getElementById('facRosterCountBadge').textContent = `Showing ${displayedCount} of ${students.length} students`;
    }

    function filterFacultyRoster() {
        renderFacultyRoster();
    }

    // Open Attendance Modal
    function openFacultyAttendanceModal(moodleId) {
        const student = getStudentByMoodleId(moodleId);
        if (!student || !activeFacultyObj) return;

        const subjKey = activeFacultyObj.subjectKey;
        const subjInfo = SUBJECT_INFO[subjKey] || { conducted: 20 };
        const attData = student.attendance[subjKey] || { attended: 15, pct: 75 };

        document.getElementById('modalAttStudentName').textContent = student.name;
        document.getElementById('modalAttStudentMeta').textContent = `Roll: ${student.rollNo} | Moodle ID: ${student.moodleId} | SE IT Div B`;
        document.getElementById('modalAttSubjectName').textContent = `Subject: ${activeFacultyObj.subjectName} (${subjInfo.code || ''})`;
        document.getElementById('modalAttMoodleId').value = student.moodleId;
        document.getElementById('modalAttSubjectKey').value = subjKey;
        document.getElementById('modalAttendedInput').value = attData.attended;
        document.getElementById('modalConductedInput').value = subjInfo.conducted;

        previewModalAttendancePct();

        const modalEl = document.getElementById('facultyEditAttendanceModal');
        const modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.show();
    }

    function adjustAttended(delta) {
        const inp = document.getElementById('modalAttendedInput');
        const val = parseInt(inp.value, 10) || 0;
        const conducted = parseInt(document.getElementById('modalConductedInput').value, 10) || 1;
        inp.value = Math.max(0, Math.min(conducted, val + delta));
        previewModalAttendancePct();
    }

    function previewModalAttendancePct() {
        const attended = parseInt(document.getElementById('modalAttendedInput').value, 10) || 0;
        const conducted = parseInt(document.getElementById('modalConductedInput').value, 10) || 1;
        const pct = Math.min(100, Math.round((attended / conducted) * 100));
        const previewEl = document.getElementById('modalAttPreviewPct');
        previewEl.innerHTML = `Calculated Subject Attendance: <strong>${pct}%</strong> (${pct >= 75 ? '<span class="text-success">Eligible</span>' : '<span class="text-danger">Defaulter Warning</span>'})`;
    }

    function saveFacultyAttendance(e) {
        e.preventDefault();
        const moodleId = document.getElementById('modalAttMoodleId').value;
        const subjKey = document.getElementById('modalAttSubjectKey').value;
        const newAttended = parseInt(document.getElementById('modalAttendedInput').value, 10);
        const newConducted = parseInt(document.getElementById('modalConductedInput').value, 10);

        const res = updateStudentAttendanceByFaculty(moodleId, subjKey, newAttended, newConducted);
        if (res.success) {
            bootstrap.Modal.getInstance(document.getElementById('facultyEditAttendanceModal')).hide();
            renderFacultyRoster();
            
            // Refresh student view if current student
            const cur = getCurrentUser();
            if (cur && cur.moodleId === moodleId) {
                applyStudentData(res.student);
            }
            alert(`Attendance for ${res.student.name} updated successfully to ${res.student.attendance[subjKey].pct}%!`);
        }
    }

    // Open Grade Modal
    function openFacultyGradeModal(moodleId) {
        const student = getStudentByMoodleId(moodleId);
        if (!student || !activeFacultyObj) return;

        initializeStudentGrades(student);
        const subjKey = activeFacultyObj.subjectKey;
        const g = student.grades[subjKey] || { termWork: 22, maxTermWork: 25, iat1: 18, iat2: 18, grade: 'A+', status: 'Completed' };

        document.getElementById('modalGradeStudentName').textContent = student.name;
        document.getElementById('modalGradeStudentMeta').textContent = `Roll: ${student.rollNo} | Moodle ID: ${student.moodleId} | SE IT Div B`;
        document.getElementById('modalGradeSubjectName').textContent = `Subject: ${activeFacultyObj.subjectName}`;
        document.getElementById('modalGradeMoodleId').value = student.moodleId;
        document.getElementById('modalGradeSubjectKey').value = subjKey;
        document.getElementById('modalTermWorkInput').value = g.termWork || 20;
        document.getElementById('modalTermWorkInput').max = g.maxTermWork || 25;
        document.getElementById('modalTermWorkMaxLabel').textContent = `Max: ${g.maxTermWork || 25} Marks`;
        document.getElementById('modalLetterGradeInput').value = g.grade || 'A+';
        document.getElementById('modalIat1Input').value = g.iat1 !== undefined ? g.iat1 : 18;
        document.getElementById('modalIat2Input').value = g.iat2 !== undefined ? g.iat2 : 18;
        document.getElementById('modalGradeStatusInput').value = g.status || 'Completed';

        const modalEl = document.getElementById('facultyEditGradeModal');
        const modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.show();
    }

    function saveFacultyGrade(e) {
        e.preventDefault();
        const moodleId = document.getElementById('modalGradeMoodleId').value;
        const subjKey = document.getElementById('modalGradeSubjectKey').value;
        const tw = parseInt(document.getElementById('modalTermWorkInput').value, 10);
        const grade = document.getElementById('modalLetterGradeInput').value;
        const iat1 = parseInt(document.getElementById('modalIat1Input').value, 10);
        const iat2 = parseInt(document.getElementById('modalIat2Input').value, 10);
        const status = document.getElementById('modalGradeStatusInput').value;

        const payload = {
            termWork: tw,
            grade: grade,
            iat1: isNaN(iat1) ? undefined : iat1,
            iat2: isNaN(iat2) ? undefined : iat2,
            status: status,
            faculty: activeFacultyObj.name
        };

        const res = updateStudentGradeByFaculty(moodleId, subjKey, payload);
        if (res.success) {
            bootstrap.Modal.getInstance(document.getElementById('facultyEditGradeModal')).hide();
            renderFacultyRoster();
            
            const cur = getCurrentUser();
            if (cur && cur.moodleId === moodleId) {
                renderStudentGrades(res.student);
            }
            alert(`Grade record for ${res.student.name} updated successfully!`);
        }
    }

    // Faculty Action: Mark All Present (+1 Lecture)
    function facultyMarkAllPresent() {
        if (!activeFacultyObj) return;
        const confirmed = confirm(`Conducted 1 new lecture for ${activeFacultyObj.subjectName} and mark ALL 70 students present?`);
        if (!confirmed) return;

        const students = getLiveStudents();
        const subjKey = activeFacultyObj.subjectKey;
        const oldConducted = (SUBJECT_INFO[subjKey]?.conducted || 20);
        const newConducted = oldConducted + 1;
        if (SUBJECT_INFO[subjKey]) SUBJECT_INFO[subjKey].conducted = newConducted;

        students.forEach(s => {
            const currentAtt = s.attendance[subjKey] ? s.attendance[subjKey].attended : Math.round(oldConducted * 0.8);
            updateStudentAttendanceByFaculty(s.moodleId, subjKey, currentAtt + 1, newConducted);
        });

        updateFacultyHeaderInfo();
        renderFacultyRoster();
        const cur = getCurrentUser();
        if (cur) applyStudentData(getStudentByMoodleId(cur.moodleId));

        alert(`Successfully conducted lecture #${newConducted} for ${activeFacultyObj.subjectName}! All student records updated.`);
    }

    // Export CSV
    function exportFacultyRosterCSV() {
        if (!activeFacultyObj) return;
        const students = getLiveStudents();
        const subjKey = activeFacultyObj.subjectKey;
        const subjInfo = SUBJECT_INFO[subjKey] || { conducted: 20 };

        let csv = `Roll No,Moodle ID,Name,Subject,Attended,Conducted,Subject %,Overall %,Term Work,Grade,Status\n`;
        students.forEach(s => {
            initializeStudentGrades(s);
            const att = s.attendance[subjKey] || { attended: 0, pct: 0 };
            const gr = s.grades[subjKey] || { termWork: 0, grade: 'P', status: 'Submitted' };
            csv += `"${s.rollNo}","${s.moodleId}","${s.name}","${activeFacultyObj.subjectName}",${att.attended},${subjInfo.conducted},${att.pct}%,${s.attendance.overallPct}%,${gr.termWork},"${gr.grade}","${gr.status}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `APSIT_${activeFacultyObj.subjectKey}_Roster.csv`;
        a.click();
    }

    // ==========================================================================
    // THEME PREFERENCE ENGINE (System, Light, Dark)
    // ==========================================================================
    const THEME_STORAGE_KEY = 'apsit-isms-theme-preference';

    function getThemePreference() {
        try {
            // Default to 'light'. Only use stored value if user explicitly saved their preference!
            return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
        } catch(e) {
            return 'light';
        }
    }

    function resolveTheme(preference) {
        if (preference === 'dark') {
            return 'dark';
        }
        if (preference === 'system') {
            return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
        }
        // Default is light
        return 'light';
    }

    function applyTheme(preference, isLivePreview = false) {
        const resolved = resolveTheme(preference);
        document.documentElement.setAttribute('data-theme', resolved);
        document.documentElement.setAttribute('data-bs-theme', resolved);
        highlightThemeCard(preference);
        updateThemeBadge(preference, resolved);
        if (!isLivePreview) {
            try {
                localStorage.setItem(THEME_STORAGE_KEY, preference);
            } catch(e) {}
        }
    }

    function selectThemePreference(preference) {
        // Immediate Live Preview
        applyTheme(preference, true);
        highlightThemeCard(preference);
        updateThemeBadge(preference, resolveTheme(preference));
    }

    function saveThemePreferenceConfirm() {
        const activeCard = document.querySelector('.theme-card.active');
        let selected = 'light';
        if (activeCard) {
            if (activeCard.id === 'themeCardDark') selected = 'dark';
            else if (activeCard.id === 'themeCardSystem') selected = 'system';
            else selected = 'light';
        }
        applyTheme(selected, false);
        showSettingsAlert('success', `<i class="bi bi-check-circle-fill me-2"></i>Theme preference <strong>${selected.toUpperCase()}</strong> saved permanently!`);
    }

    function highlightThemeCard(preference) {
        const systemCard = document.getElementById('themeCardSystem');
        const lightCard = document.getElementById('themeCardLight');
        const darkCard = document.getElementById('themeCardDark');
        if (!systemCard || !lightCard || !darkCard) return;

        systemCard.classList.remove('active');
        lightCard.classList.remove('active');
        darkCard.classList.remove('active');

        if (preference === 'dark') {
            darkCard.classList.add('active');
        } else if (preference === 'system') {
            systemCard.classList.add('active');
        } else {
            lightCard.classList.add('active');
        }
    }

    function updateThemeBadge(preference, resolved) {
        const badge = document.getElementById('appearanceCurrentStatusBadge');
        if (!badge) return;
        const res = resolved || resolveTheme(preference);
        if (preference === 'system') {
            badge.textContent = `Theme: System (${res === 'dark' ? 'Dark' : 'Light'})`;
            badge.className = 'badge bg-primary px-3 py-1';
        } else if (preference === 'dark') {
            badge.textContent = 'Theme: Dark (Active)';
            badge.className = 'badge bg-info px-3 py-1';
        } else {
            badge.textContent = 'Theme: Light (Active)';
            badge.className = 'badge bg-warning text-dark px-3 py-1';
        }
    }

    function initTheme() {
        const storedPref = localStorage.getItem(THEME_STORAGE_KEY);
        // Default strictly to 'light' until user explicitly chooses their preference!
        const pref = storedPref || 'light';
        const resolved = resolveTheme(pref);
        document.documentElement.setAttribute('data-theme', resolved);
        document.documentElement.setAttribute('data-bs-theme', resolved);

        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleOSThemeChange = (e) => {
                const currentPref = localStorage.getItem(THEME_STORAGE_KEY);
                // IMPORTANT: Only auto-update if the user explicitly saved 'system' as their preference!
                if (currentPref === 'system') {
                    const newResolved = e.matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newResolved);
                    document.documentElement.setAttribute('data-bs-theme', newResolved);
                    updateThemeBadge('system', newResolved);
                }
            };
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', handleOSThemeChange);
            } else if (mediaQuery.addListener) {
                mediaQuery.addListener(handleOSThemeChange);
            }
        }
    }

    // ==========================================================================
    // ACCOUNT SETTINGS MODAL CONTROLLER
    // ==========================================================================
    function initSettingsModalEvents() {
        const settingsModalEl = document.getElementById('settingsModal');
        if (settingsModalEl) {
            settingsModalEl.addEventListener('show.bs.modal', () => {
                populateSettingsModal();
            });
            settingsModalEl.addEventListener('hidden.bs.modal', () => {
                // Revert any unsaved preview back to saved preference on modal close
                const savedPref = getThemePreference();
                const resolved = resolveTheme(savedPref);
                document.documentElement.setAttribute('data-theme', resolved);
                document.documentElement.setAttribute('data-bs-theme', resolved);
            });
        }
    }

    function populateSettingsModal() {
        const isFaculty = isFacultyRole();
        dismissSettingsAlert();

        if (isFaculty) {
            const faculty = getCurrentFaculty() || (typeof FACULTY_LIST !== 'undefined' ? FACULTY_LIST[0] : null);
            if (!faculty) return;

            const avatarEl = document.getElementById('settingsAvatarPreview');
            if (avatarEl) {
                const initials = faculty.name ? faculty.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'FC';
                avatarEl.innerHTML = `<span class="fw-bold">${initials}</span>`;
            }
            const userTitle = document.getElementById('settingsSidebarUserName');
            if (userTitle) userTitle.textContent = faculty.title || faculty.name;

            const userEmail = document.getElementById('settingsSidebarUserEmail');
            if (userEmail) userEmail.textContent = faculty.email || 'faculty@apsit.edu.in';

            const roleBadge = document.getElementById('settingsSidebarRoleBadge');
            if (roleBadge) {
                roleBadge.textContent = 'Faculty • Information Technology';
                roleBadge.className = 'badge bg-warning-subtle text-warning fw-semibold px-2 py-1 mx-auto';
            }

            const lblIdent = document.getElementById('lblProfileIdentifier');
            if (lblIdent) lblIdent.textContent = 'Faculty Name (Official Record)';
            const lblMoodle = document.getElementById('lblProfileMoodleId');
            if (lblMoodle) lblMoodle.textContent = 'Faculty Employee ID';
            const lblRoll = document.getElementById('lblProfileRollNo');
            if (lblRoll) lblRoll.textContent = 'Designation Code';

            const nameInput = document.getElementById('settingsFullName');
            if (nameInput) nameInput.value = faculty.name;

            const idInput = document.getElementById('settingsMoodleId');
            if (idInput) idInput.value = faculty.id;

            const rollInput = document.getElementById('settingsRollNo');
            if (rollInput) rollInput.value = faculty.designation || 'Asst. Professor';

            const deptInput = document.getElementById('settingsDepartment');
            if (deptInput) deptInput.value = faculty.department || 'Information Technology';

            const semInput = document.getElementById('settingsSemester');
            if (semInput) semInput.value = 'Academic Year 2026-27';

            const divInput = document.getElementById('settingsDivision');
            if (divInput) divInput.value = `${(faculty.subjectKey || '').toUpperCase()} In-Charge`;

            const emailInput = document.getElementById('settingsEmail');
            if (emailInput) emailInput.value = faculty.email || '';

            const phoneInput = document.getElementById('settingsPhone');
            if (phoneInput) phoneInput.value = faculty.phone || '+91 9820011223';

            const addrInput = document.getElementById('settingsAddress');
            if (addrInput) addrInput.value = faculty.cabinLocation || 'Faculty Cabin 304, IT Dept, APSIT Thane';

            const pwdStatus = document.getElementById('settingsPasswordLastChanged');
            if (pwdStatus) {
                pwdStatus.textContent = faculty.passwordLastChanged 
                    ? `Last modified: ${new Date(faculty.passwordLastChanged).toLocaleDateString()}` 
                    : 'Default Institutional Credential';
            }
        } else {
            const student = getCurrentUser() || (typeof getLiveStudents === 'function' ? getLiveStudents()[0] : null);
            if (!student) return;

            const avatarEl = document.getElementById('settingsAvatarPreview');
            if (avatarEl) {
                const initials = student.name ? student.name.split(' ').map(n => n[0]).slice(0, 2).join('') : 'ST';
                avatarEl.innerHTML = `<span class="fw-bold">${initials}</span>`;
            }
            const userTitle = document.getElementById('settingsSidebarUserName');
            if (userTitle) userTitle.textContent = student.name;

            const userEmail = document.getElementById('settingsSidebarUserEmail');
            if (userEmail) userEmail.textContent = student.personalEmail || `${student.moodleId}@apsit.edu.in`;

            const roleBadge = document.getElementById('settingsSidebarRoleBadge');
            if (roleBadge) {
                roleBadge.textContent = `Student • SE IT Div ${student.division || 'B'}`;
                roleBadge.className = 'badge bg-primary-subtle text-primary fw-semibold px-2 py-1 mx-auto';
            }

            const lblIdent = document.getElementById('lblProfileIdentifier');
            if (lblIdent) lblIdent.textContent = 'Full Name (Official Record)';
            const lblMoodle = document.getElementById('lblProfileMoodleId');
            if (lblMoodle) lblMoodle.textContent = 'Moodle / Student ID';
            const lblRoll = document.getElementById('lblProfileRollNo');
            if (lblRoll) lblRoll.textContent = 'Roll No';

            const nameInput = document.getElementById('settingsFullName');
            if (nameInput) nameInput.value = student.fullName || student.name;

            const idInput = document.getElementById('settingsMoodleId');
            if (idInput) idInput.value = student.moodleId;

            const rollInput = document.getElementById('settingsRollNo');
            if (rollInput) rollInput.value = student.rollNo;

            const deptInput = document.getElementById('settingsDepartment');
            if (deptInput) deptInput.value = student.department || 'Information Technology';

            const semInput = document.getElementById('settingsSemester');
            if (semInput) semInput.value = 'Semester III (2026-27)';

            const divInput = document.getElementById('settingsDivision');
            if (divInput) divInput.value = `Division ${student.division || 'B'}`;

            const emailInput = document.getElementById('settingsEmail');
            if (emailInput) emailInput.value = student.personalEmail || `${student.moodleId}@apsit.edu.in`;

            const phoneInput = document.getElementById('settingsPhone');
            if (phoneInput) phoneInput.value = student.contact || '+91 980135791';

            const addrInput = document.getElementById('settingsAddress');
            if (addrInput) addrInput.value = student.residentialAddress || 'Thane (W), Maharashtra, India';

            const pwdStatus = document.getElementById('settingsPasswordLastChanged');
            if (pwdStatus) {
                pwdStatus.textContent = student.passwordLastChanged 
                    ? `Last modified: ${new Date(student.passwordLastChanged).toLocaleDateString()}` 
                    : 'Default Moodle Credential';
            }
        }

        // Active session info
        const devEl = document.getElementById('settingsActiveDevice');
        if (devEl) {
            const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || 'Desktop';
            devEl.textContent = `Web Browser (${platform}) • Active Session`;
        }

        // Restore notification preferences
        loadNotificationPreferences();

        // Restore theme UI cards
        const currentThemePref = getThemePreference();
        highlightThemeCard(currentThemePref);
        updateThemeBadge(currentThemePref);

        // Restore privacy preferences
        loadPrivacyPreferences();
    }

    // --- Personal Profile Form Handlers ---
    function handleProfileSave(e) {
        if (e && e.preventDefault) e.preventDefault();
        const isFaculty = isFacultyRole();
        const emailInput = document.getElementById('settingsEmail');
        const phoneInput = document.getElementById('settingsPhone');
        const addrInput = document.getElementById('settingsAddress');

        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const address = addrInput ? addrInput.value.trim() : '';

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showSettingsAlert('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>Please enter a valid email address.');
            return;
        }
        if (!phone || phone.replace(/\s+/g, '').length < 10) {
            showSettingsAlert('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>Please enter a valid 10-digit mobile number.');
            return;
        }

        if (isFaculty) {
            const faculty = getCurrentFaculty();
            if (!faculty) return;
            const res = updateFacultyProfile(faculty.id, {
                phone: phone,
                cabinLocation: address
            });
            if (res.success) {
                faculty.email = email;
                faculty.phone = phone;
                faculty.cabinLocation = address;
                setCurrentFaculty(faculty);
                applyFacultyData(faculty);
                populateSettingsModal();
                showSettingsAlert('success', '<i class="bi bi-check-circle-fill me-2"></i>Faculty contact details updated successfully.');
            } else {
                showSettingsAlert('danger', `<i class="bi bi-exclamation-triangle-fill me-2"></i>${res.message || 'Failed to update faculty profile.'}`);
            }
        } else {
            const student = getCurrentUser();
            if (!student) return;
            const res = updateStudentProfile(student.moodleId, {
                personalEmail: email,
                contact: phone,
                residentialAddress: address
            });
            if (res.success) {
                applyStudentData(res.student);
                populateSettingsModal();
                showSettingsAlert('success', '<i class="bi bi-check-circle-fill me-2"></i>Personal profile contact details updated successfully.');
            } else {
                showSettingsAlert('danger', `<i class="bi bi-exclamation-triangle-fill me-2"></i>${res.message || 'Failed to update student profile.'}`);
            }
        }
    }

    function resetProfileForm() {
        populateSettingsModal();
        showSettingsAlert('info', '<i class="bi bi-arrow-counterclockwise me-2"></i>Form fields restored to current profile records.');
    }

    // --- Security & Password Handlers ---
    function togglePasswordVisibility(fieldId, btn) {
        const input = document.getElementById(fieldId);
        if (!input) return;
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = isPass ? 'bi bi-eye-slash' : 'bi bi-eye';
        }
    }

    function checkPasswordStrength(password) {
        const bar = document.getElementById('pwdStrengthBar');
        const label = document.getElementById('pwdStrengthLabel');
        const reqLength = document.getElementById('reqLength');
        const reqUpperLower = document.getElementById('reqUpperLower');
        const reqNumber = document.getElementById('reqNumber');
        const reqSpecial = document.getElementById('reqSpecial');

        if (!bar || !label) return;

        let score = 0;
        const hasLength = password.length >= 8;
        const hasUpperLower = /[A-Z]/.test(password) && /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[@#$%^&*!_~-]/.test(password);

        if (reqLength) reqLength.className = hasLength ? 'text-success fw-semibold' : 'text-muted';
        if (reqUpperLower) reqUpperLower.className = hasUpperLower ? 'text-success fw-semibold' : 'text-muted';
        if (reqNumber) reqNumber.className = hasNumber ? 'text-success fw-semibold' : 'text-muted';
        if (reqSpecial) reqSpecial.className = hasSpecial ? 'text-success fw-semibold' : 'text-muted';

        if (hasLength) score += 25;
        if (hasUpperLower) score += 25;
        if (hasNumber) score += 25;
        if (hasSpecial) score += 25;

        bar.style.width = `${score}%`;
        if (score === 0) {
            bar.className = 'progress-bar bg-danger';
            label.textContent = 'None';
            label.className = 'fw-bold text-muted';
        } else if (score <= 25) {
            bar.className = 'progress-bar bg-danger';
            label.textContent = 'Weak';
            label.className = 'fw-bold text-danger';
        } else if (score <= 50) {
            bar.className = 'progress-bar bg-warning';
            label.textContent = 'Fair';
            label.className = 'fw-bold text-warning';
        } else if (score <= 75) {
            bar.className = 'progress-bar bg-info';
            label.textContent = 'Good';
            label.className = 'fw-bold text-info';
        } else {
            bar.className = 'progress-bar bg-success';
            label.textContent = 'Strong';
            label.className = 'fw-bold text-success';
        }
    }

    function handlePasswordChange(e) {
        if (e && e.preventDefault) e.preventDefault();
        const isFaculty = isFacultyRole();
        const curPwd = document.getElementById('settingsCurrentPwd')?.value || '';
        const newPwd = document.getElementById('settingsNewPwd')?.value || '';
        const confirmPwd = document.getElementById('settingsConfirmPwd')?.value || '';
        const mismatchWarning = document.getElementById('pwdMismatchWarning');

        if (newPwd !== confirmPwd) {
            if (mismatchWarning) mismatchWarning.classList.remove('d-none');
            showSettingsAlert('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>New password and confirmation password do not match.');
            return;
        } else {
            if (mismatchWarning) mismatchWarning.classList.add('d-none');
        }

        if (newPwd.length < 8) {
            showSettingsAlert('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>New password must be at least 8 characters long.');
            return;
        }
        if (!/[A-Z]/.test(newPwd) || !/[a-z]/.test(newPwd) || !/[0-9]/.test(newPwd) || !/[@#$%^&*!_~-]/.test(newPwd)) {
            showSettingsAlert('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>New password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol.');
            return;
        }

        let res;
        if (isFaculty) {
            const faculty = getCurrentFaculty();
            if (!faculty) return;
            res = updateFacultyPassword(faculty.id, curPwd, newPwd);
        } else {
            const student = getCurrentUser();
            if (!student) return;
            res = updateStudentPassword(student.moodleId, curPwd, newPwd);
        }

        if (res.success) {
            resetPasswordForm();
            populateSettingsModal();
            showSettingsAlert('success', `<i class="bi bi-check-circle-fill me-2"></i>${res.message}`);
        } else {
            showSettingsAlert('danger', `<i class="bi bi-exclamation-triangle-fill me-2"></i>${res.message}`);
        }
    }

    function resetPasswordForm() {
        const form = document.getElementById('settingsPasswordForm');
        if (form) form.reset();
        checkPasswordStrength('');
        const mismatchWarning = document.getElementById('pwdMismatchWarning');
        if (mismatchWarning) mismatchWarning.classList.add('d-none');
    }

    // --- Notification Preferences Handlers ---
    const NOTIF_PREF_KEY = 'apsit-isms-notification-preferences';

    function loadNotificationPreferences() {
        try {
            const saved = JSON.parse(localStorage.getItem(NOTIF_PREF_KEY) || 'null');
            if (!saved) return;

            const master = document.getElementById('notifMasterSwitch');
            if (master) master.checked = saved.master !== false;

            const inApp = document.getElementById('channelInApp');
            if (inApp) inApp.checked = saved.channelInApp !== false;

            const email = document.getElementById('channelEmail');
            if (email) email.checked = saved.channelEmail !== false;

            const att = document.getElementById('notifAttendance');
            if (att) att.checked = saved.attendance !== false;

            const exams = document.getElementById('notifExams');
            if (exams) exams.checked = saved.exams !== false;

            const grades = document.getElementById('notifGrades');
            if (grades) grades.checked = saved.grades !== false;

            const cal = document.getElementById('notifCalendar');
            if (cal) cal.checked = saved.calendar !== false;

            const fac = document.getElementById('notifFaculty');
            if (fac) fac.checked = saved.faculty !== false;

            const not = document.getElementById('notifNotices');
            if (not) not.checked = saved.notices !== false;

            toggleMasterNotifications(saved.master !== false);
        } catch(e) {}
    }

    function saveNotificationPreferences() {
        const prefs = {
            master: document.getElementById('notifMasterSwitch')?.checked ?? true,
            channelInApp: document.getElementById('channelInApp')?.checked ?? true,
            channelEmail: document.getElementById('channelEmail')?.checked ?? true,
            attendance: document.getElementById('notifAttendance')?.checked ?? true,
            exams: document.getElementById('notifExams')?.checked ?? true,
            grades: document.getElementById('notifGrades')?.checked ?? true,
            calendar: document.getElementById('notifCalendar')?.checked ?? true,
            faculty: document.getElementById('notifFaculty')?.checked ?? true,
            notices: document.getElementById('notifNotices')?.checked ?? true,
            updatedAt: new Date().toISOString()
        };
        try {
            localStorage.setItem(NOTIF_PREF_KEY, JSON.stringify(prefs));
            showSettingsAlert('success', '<i class="bi bi-check-circle-fill me-2"></i>Notification preferences saved successfully.');
        } catch(e) {
            showSettingsAlert('danger', '<i class="bi bi-exclamation-triangle-fill me-2"></i>Could not save notification preferences.');
        }
    }

    function restoreDefaultNotifications() {
        document.querySelectorAll('.notif-channel, .notif-item, #notifMasterSwitch').forEach(sw => {
            sw.checked = true;
            sw.disabled = false;
        });
        saveNotificationPreferences();
        showSettingsAlert('info', '<i class="bi bi-info-circle-fill me-2"></i>Default notification preferences restored.');
    }

    function toggleMasterNotifications(enabled) {
        document.querySelectorAll('.notif-channel, .notif-item').forEach(sw => {
            sw.disabled = !enabled;
        });
    }

    // --- Privacy & Data Handlers ---
    function loadPrivacyPreferences() {
        try {
            const saved = JSON.parse(localStorage.getItem('apsit-isms-privacy-preferences') || '{}');
            if (saved.visibility === 'faculty_only') {
                const rad = document.getElementById('visibilityFacultyOnly');
                if (rad) rad.checked = true;
            } else {
                const rad = document.getElementById('visibilityCohort');
                if (rad) rad.checked = true;
            }
        } catch(e) {}
    }

    function savePrivacyPreference(key, value) {
        try {
            const saved = JSON.parse(localStorage.getItem('apsit-isms-privacy-preferences') || '{}');
            saved[key] = value;
            saved.updatedAt = new Date().toISOString();
            localStorage.setItem('apsit-isms-privacy-preferences', JSON.stringify(saved));
            showSettingsAlert('success', '<i class="bi bi-check-circle-fill me-2"></i>Privacy preference updated successfully.');
        } catch(e) {}
    }

    function exportAcademicRecordJSON() {
        const isFaculty = isFacultyRole();
        let data;
        let filename;
        if (isFaculty) {
            const faculty = getCurrentFaculty() || { id: 'FAC01' };
            data = {
                exportType: 'APSIT_ISMS_FACULTY_RECORD',
                exportedAt: new Date().toISOString(),
                institution: 'A. P. Shah Institute of Technology, Thane',
                academicYear: '2026-27',
                faculty: faculty,
                courses: (typeof getFacultyCourses === 'function') ? getFacultyCourses(faculty.id) : []
            };
            filename = `APSIT_ISMS_Record_Faculty_${faculty.id}.json`;
        } else {
            const student = getCurrentUser() || (typeof getLiveStudents === 'function' ? getLiveStudents()[0] : { moodleId: 'Student' });
            data = {
                exportType: 'APSIT_ISMS_STUDENT_ACADEMIC_RECORD',
                exportedAt: new Date().toISOString(),
                institution: 'A. P. Shah Institute of Technology, Thane',
                academicYear: '2026-27',
                semester: 'Semester III',
                department: 'Information Technology',
                division: student.division || 'B',
                student: student,
                subjects: SUBJECT_INFO
            };
            filename = `APSIT_ISMS_Record_${student.moodleId}.json`;
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        showSettingsAlert('success', '<i class="bi bi-filetype-json me-2"></i>Academic record JSON downloaded successfully.');
    }

    function exportAcademicRecordCSV() {
        const isFaculty = isFacultyRole();
        if (isFaculty) {
            exportFacultyRosterCSV();
            showSettingsAlert('success', '<i class="bi bi-file-earmark-spreadsheet me-2"></i>Faculty course roster CSV exported successfully.');
            return;
        }
        const student = getCurrentUser();
        if (!student) return;

        let csv = `Subject Code,Subject Name,Faculty In-Charge,Attended Lectures,Conducted Lectures,Attendance %,Term Work Marks,Grade,Status\n`;
        Object.keys(SUBJECT_INFO).forEach(key => {
            const info = SUBJECT_INFO[key];
            const att = (student.attendance && student.attendance[key]) ? student.attendance[key] : { attended: 0, pct: 0 };
            const gr = (student.grades && student.grades[key]) ? student.grades[key] : { termWork: 0, grade: 'P', status: 'Submitted' };
            csv += `"${info.code}","${info.name}","${info.faculty}",${att.attended},${info.conducted},${att.pct}%,${gr.termWork},"${gr.grade}","${gr.status}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `APSIT_Academic_Transcript_${student.moodleId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        showSettingsAlert('success', '<i class="bi bi-file-earmark-spreadsheet me-2"></i>Attendance & Grades CSV exported successfully.');
    }

    function showSettingsAlert(type, message) {
        const alertEl = document.getElementById('settingsFeedbackAlert');
        const textEl = document.getElementById('settingsFeedbackText');
        if (!alertEl || !textEl) return;
        alertEl.className = `alert alert-${type} alert-dismissible fade show mb-3`;
        textEl.innerHTML = message;
        alertEl.classList.remove('d-none');
        alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function dismissSettingsAlert() {
        const alertEl = document.getElementById('settingsFeedbackAlert');
        if (alertEl) alertEl.classList.add('d-none');
    }

    // ==========================================================================
    // Help & Support Module Logic (Tickets, FAQs Search, Grievances)
    // ==========================================================================
    const STORAGE_KEY_TICKETS = 'apsit_isms_support_tickets';

    const DEFAULT_TICKETS = [
        {
            id: 'APSIT-TKT-2026-1042',
            category: 'Moodle LMS',
            priority: 'Normal',
            subject: 'ADSA Lab Assignment 4 zip upload format inquiry',
            message: 'Could you please confirm if Python .py files or .ipynb notebook format is preferred for submission in Experiment 4?',
            studentName: 'JASMINE MOHANTY',
            moodleId: '25104021',
            rollNo: 'IT-2026-38',
            date: '10-Oct-2026 14:30',
            status: 'Resolved',
            response: 'Either .py script or Jupyter Notebook (.ipynb) is accepted. Confirmed with Prof. Mandar Ganjapurkar.'
        },
        {
            id: 'APSIT-TKT-2026-1088',
            category: 'Attendance Grievance',
            priority: 'High',
            subject: 'Attendance sync for DBMS Theory Lecture on 06-Oct',
            message: 'Attended the 2nd session of DBMS in Room 304, but marked absent on Moodle tracker. Kindly verify with sign sheet.',
            studentName: 'JASMINE MOHANTY',
            moodleId: '25104021',
            rollNo: 'IT-2026-38',
            date: '11-Oct-2026 11:15',
            status: 'In Review',
            response: 'Forwarded to Prof. Shital Agarwal for classroom attendance register cross-verification.'
        }
    ];

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function getStoredTickets() {
        try {
            const data = localStorage.getItem(STORAGE_KEY_TICKETS);
            if (data) return JSON.parse(data);
        } catch(e) {}
        return DEFAULT_TICKETS;
    }

    function saveStoredTickets(tickets) {
        try {
            localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(tickets));
        } catch(e) {}
    }

    function initHelpSupportModule() {
        // Populate student info in ticket form
        const student = getCurrentUser();
        if (student) {
            const nameInput = document.getElementById('ticketStudentName');
            const idInput = document.getElementById('ticketStudentMoodleId');
            if (nameInput) nameInput.value = student.name.toUpperCase();
            if (idInput) idInput.value = `${student.moodleId} (${student.rollNo})`;
        } else if (isFacultyRole() && activeFacultyObj) {
            const nameInput = document.getElementById('ticketStudentName');
            const idInput = document.getElementById('ticketStudentMoodleId');
            if (nameInput) nameInput.value = activeFacultyObj.title;
            if (idInput) idInput.value = `${activeFacultyObj.id} (${activeFacultyObj.subjectName})`;
        }
        renderSupportTickets();
    }

    function renderSupportTickets() {
        const container = document.getElementById('supportTicketsListContainer');
        const countBadge = document.getElementById('ticketCountBadge');
        if (!container) return;

        const tickets = getStoredTickets();
        if (countBadge) countBadge.textContent = `Total: ${tickets.length}`;

        if (tickets.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4 text-muted">
                    <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i>
                    <p class="mb-0 small">No active support requests found.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = tickets.map(t => {
            let badgeColor = 'bg-primary';
            if (t.status === 'Resolved') badgeColor = 'bg-success';
            if (t.status === 'In Review') badgeColor = 'bg-warning text-dark';
            if (t.status === 'Open') badgeColor = 'bg-info text-dark';

            let prioBadge = 'bg-light text-secondary border';
            if (t.priority === 'Urgent') prioBadge = 'bg-danger text-white';
            else if (t.priority === 'High') prioBadge = 'bg-warning-subtle text-warning-emphasis border border-warning';

            return `
                <div class="p-3 mb-3 border rounded-3 bg-white support-ticket-card shadow-sm">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <span class="badge ${badgeColor} fw-semibold">${t.status}</span>
                            <span class="badge ${prioBadge} ms-1">${t.priority}</span>
                            <span class="badge bg-light text-dark border ms-1">${t.category}</span>
                        </div>
                        <small class="text-muted">${t.date}</small>
                    </div>
                    <h6 class="fw-bold text-dark mb-1">${escapeHtml(t.subject)}</h6>
                    <p class="text-secondary small mb-2" style="line-height: 1.5;">${escapeHtml(t.message)}</p>
                    <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                        <small class="text-muted fw-semibold"><i class="bi bi-hash"></i>${t.id}</small>
                        ${t.response ? `<span class="badge bg-light text-primary border" title="${escapeHtml(t.response)}"><i class="bi bi-chat-left-dots-fill me-1"></i>Staff Responded</span>` : '<span class="text-muted small">Pending Response</span>'}
                    </div>
                    ${t.response ? `
                        <div class="mt-2 p-2 rounded bg-light border-start border-3 border-primary small text-secondary">
                            <strong class="text-primary d-block mb-1"><i class="bi bi-reply-fill me-1"></i>Staff Reply:</strong>
                            ${escapeHtml(t.response)}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    function handleSupportTicketSubmit(e) {
        if (e) e.preventDefault();
        const category = document.getElementById('ticketCategory')?.value || 'Attendance Grievance';
        const priority = document.getElementById('ticketPriority')?.value || 'Normal';
        const subject = document.getElementById('ticketSubject')?.value?.trim();
        const message = document.getElementById('ticketMessage')?.value?.trim();

        if (!subject || !message) {
            alert('Please fill out both the Subject and Description fields.');
            return;
        }

        const student = getCurrentUser() || { name: 'Jasmine Mohanty', moodleId: '25104021', rollNo: 'IT-2026-38' };
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const newTicket = {
            id: `APSIT-TKT-2026-${randNum}`,
            category,
            priority,
            subject,
            message,
            studentName: student.name,
            moodleId: student.moodleId,
            rollNo: student.rollNo,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Open',
            response: 'Your request has been registered and assigned to the respective desk coordinator.'
        };

        const tickets = getStoredTickets();
        tickets.unshift(newTicket);
        saveStoredTickets(tickets);

        // Reset inputs
        const subjInput = document.getElementById('ticketSubject');
        const msgInput = document.getElementById('ticketMessage');
        if (subjInput) subjInput.value = '';
        if (msgInput) msgInput.value = '';

        // Show Success Alert
        const alertEl = document.getElementById('ticketSuccessAlert');
        const textEl = document.getElementById('ticketSuccessText');
        if (alertEl && textEl) {
            textEl.innerHTML = `<strong>Ticket Generated!</strong> Ticket ID <code>${newTicket.id}</code> registered under <em>${category}</em>. Staff will respond shortly.`;
            alertEl.classList.remove('d-none');
        }

        renderSupportTickets();
    }

    function filterHelpFaqs(query) {
        const q = (query || '').toLowerCase().trim();
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const text = (item.textContent || '').toLowerCase();
            const keywords = (item.getAttribute('data-keywords') || '').toLowerCase();
            if (!q || text.includes(q) || keywords.includes(q)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    window.initHelpSupportModule = initHelpSupportModule;
    window.renderSupportTickets = renderSupportTickets;
    window.handleSupportTicketSubmit = handleSupportTicketSubmit;
    window.filterHelpFaqs = filterHelpFaqs;

