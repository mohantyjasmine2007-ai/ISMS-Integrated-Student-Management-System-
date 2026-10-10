const fs = require('fs');

let code = fs.readFileSync('dashboard1.js', 'utf8');

// 1. Replace DOMContentLoaded through openFacultyPortalTab and applyStudentData
const startTarget = 'let activeFacultyObj = null;\n\n    // Initialize application on load\n    document.addEventListener(\'DOMContentLoaded\', () => {';
const endTarget = '        renderPersonalSubjectTable(student);\n        renderComplianceAnalytics(student);\n        renderStudentGrades(student);\n    }';

const startIdx = code.indexOf(startTarget);
const endIdx = code.indexOf(endTarget);

console.log('startIdx:', startIdx, 'endIdx:', endIdx);
if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find slice in dashboard1.js');
    process.exit(1);
}

const newSection = `let activeFacultyObj = null;

    // Initialize application on load
    document.addEventListener('DOMContentLoaded', () => {
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
        if (dropMeta) dropMeta.textContent = \`\${faculty.subjectName} • \${faculty.email}\`;

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
            dashSubtitle.innerHTML = \`Department of Information Technology • <span class="fw-semibold">Faculty In-Charge</span> | Assigned: <span class="fw-semibold">\${faculty.subjectName}</span> (\${faculty.type})\`;
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
        if (overviewTitle) overviewTitle.innerHTML = \`<i class="bi bi-graph-up-arrow text-primary me-2"></i>Cohort Academic & Attendance Overview — \${faculty.subjectName}\`;

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
        if (card2Val) card2Val.textContent = \`\${subjInfo.conducted} Hours\`;
        const card2Label = document.getElementById('dashCard2Label');
        if (card2Label) card2Label.textContent = 'Conducted Lectures';
        const card2Sub = document.getElementById('dashTheoryPct');
        if (card2Sub) {
            card2Sub.textContent = \`\${faculty.subjectName} (\${faculty.type})\`;
            card2Sub.className = 'text-primary fw-semibold';
        }

        const card3Val = document.getElementById('dashPracticalAvg');
        if (card3Val) card3Val.textContent = \`\${avgPct}%\`;
        const card3Label = document.getElementById('dashCard3Label');
        if (card3Label) card3Label.textContent = 'Class Avg Attendance';
        const card3Sub = document.getElementById('dashCard3Sub');
        if (card3Sub) {
            card3Sub.textContent = 'SE IT Div B Cohort';
            card3Sub.className = 'text-info fw-semibold';
        }

        const card4Val = document.getElementById('dashOverallAttendance');
        if (card4Val) card4Val.textContent = \`\${eligibleCount} / 70\`;
        const card4Label = document.getElementById('dashCard4Label');
        if (card4Label) card4Label.textContent = 'Eligible Students (≥75%)';
        const card4Badge = document.getElementById('dashEligibilityBadge');
        if (card4Badge) {
            card4Badge.textContent = \`\${eligibleCount} Safe / \${defaulterCount} Defaulters\`;
            card4Badge.className = 'badge bg-success';
        }

        // 5. Sidebar Badge
        const sideBadge = document.getElementById('sidebarAttendanceBadge');
        if (sideBadge) {
            sideBadge.textContent = \`\${avgPct}% Avg\`;
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

        // 6. Update ID Card Modal for Faculty
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
        if (val3) val3.textContent = \`\${faculty.subjectName} (\${faculty.type})\`;

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
        document.getElementById('dropdownStudentMeta').textContent = \`Roll: \${student.rollNo} | ID: \${student.moodleId}\`;
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
        document.getElementById('dashStudentSubtitle').innerHTML = \`Roll No: <span id="dashRollNo" class="fw-semibold">\${student.rollNo}</span> | Moodle ID: <span id="dashMoodleId" class="fw-semibold">\${student.moodleId}</span> | Semester III\`;
        const dashBadge = document.getElementById('dashOverallAttendanceBadge');
        if (dashBadge) {
            dashBadge.textContent = \`Attendance: \${student.attendance.overallPct}% (\${student.attendance.overallPct >= 75 ? 'Eligible' : 'Defaulter Risk'})\`;
            dashBadge.className = student.attendance.overallPct >= 75 ? 'badge bg-light text-primary fw-semibold' : 'badge bg-danger text-white fw-semibold';
        }

        // Academic Overview stats
        const card1Val = document.getElementById('dashEnrolledCoursesVal');
        if (card1Val) card1Val.textContent = '10';
        document.getElementById('dashTheoryAttended').textContent = \`\${student.attendance.theoryTotal.attended} / 146\`;
        document.getElementById('dashTheoryPct').textContent = \`\${student.attendance.theoryTotal.pct}% (Conducted)\`;
        document.getElementById('dashTheoryPct').className = 'text-success fw-bold';
        document.getElementById('dashPracticalAvg').textContent = \`\${student.attendance.practicalAvg}%\`;
        document.getElementById('dashOverallAttendance').textContent = \`\${student.attendance.overallPct}%\`;
        
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
        document.getElementById('attCardStudentMeta').textContent = \`Roll: \${student.rollNo} | Moodle ID: \${student.moodleId} | SE IT Div B\`;
        const initials = student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        document.getElementById('attCardAvatar').textContent = initials;
        
        const attOverall = document.getElementById('attOverallBadge');
        attOverall.textContent = \`Overall: \${student.attendance.overallPct}% (\${student.attendance.overallPct >= 75 ? 'Eligible' : 'Defaulter Risk'})\`;
        attOverall.className = student.attendance.overallPct >= 75 ? 'badge bg-success-subtle text-success px-3 py-2 fs-6' : 'badge bg-danger-subtle text-danger px-3 py-2 fs-6';

        document.getElementById('attTheoryBadge').textContent = \`Theory: \${student.attendance.theoryTotal.pct}% (\${student.attendance.theoryTotal.attended}/146)\`;
        document.getElementById('attPracticalBadge').textContent = \`Practical: \${student.attendance.practicalAvg}%\`;

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
    }`;

code = code.substring(0, startIdx) + newSection + code.substring(endIdx + endTarget.length);

// Also in onFacultyCourseChange:
code = code.replace(
    'activeFacultyObj = found;\n            setCurrentFaculty(found);\n            updateFacultyHeaderInfo();\n            renderFacultyRoster();',
    'activeFacultyObj = found;\n            setCurrentFaculty(found);\n            applyFacultyData(found);\n            updateFacultyHeaderInfo();\n            renderFacultyRoster();\n            if (typeof mountReactModules === \'function\') mountReactModules();'
);

// Also in initFacultyPortal:
code = code.replace(
    'activeFacultyObj = getCurrentFaculty() || FACULTY_LIST[1];',
    'activeFacultyObj = getCurrentFaculty() || FACULTY_LIST[0];\n        applyFacultyData(activeFacultyObj);'
);

fs.writeFileSync('dashboard1.js', code, 'utf8');
console.log('Successfully updated dashboard1.js!');
