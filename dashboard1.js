let activeFacultyObj = null;

    // Initialize application on load
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const isFaculty = isFacultyRole();
        const facultyNavItem = document.getElementById('sidebarFacultyNavItem');
        const facultyViewPane = document.getElementById('faculty-view');

        let student = getCurrentUser();
        if (!student) {
            student = getLiveStudents()[0];
            setCurrentUser(student);
        }

        applyStudentData(student);
        initNotifications();
        initAnnouncements();
        renderStudentGrades(student);

        const topNavFacultyItem = document.getElementById('topNavFacultyItem');

        if (isFaculty) {
            // Authorized Faculty: show faculty nav and initialize portal
            if (facultyNavItem) facultyNavItem.style.display = 'block';
            if (topNavFacultyItem) topNavFacultyItem.style.display = 'block';
            if (facultyViewPane) facultyViewPane.style.display = 'block';
            initFacultyPortal();

            // Open Faculty view directly
            openFacultyPortalTab();
            if (activeFacultyObj) {
                const navName = document.getElementById('navStudentName');
                if (navName) navName.textContent = activeFacultyObj.title;
                const navBadge = document.getElementById('navMoodleBadge');
                if (navBadge) {
                    navBadge.textContent = 'Faculty In-Charge';
                    navBadge.className = 'badge bg-warning text-dark';
                }
                const dropFullName = document.getElementById('dropdownStudentFullName');
                if (dropFullName) dropFullName.textContent = activeFacultyObj.title;
                const dropMeta = document.getElementById('dropdownStudentMeta');
                if (dropMeta) dropMeta.textContent = `${activeFacultyObj.subjectName} • ${activeFacultyObj.email}`;
            }
        } else {
            // Student logged in: strictly HIDE faculty portal from student
            if (facultyNavItem) facultyNavItem.style.display = 'none';
            if (topNavFacultyItem) topNavFacultyItem.style.display = 'none';
            if (facultyViewPane) facultyViewPane.style.display = 'none';

            // If a student tries to open URL with ?view=faculty, block access and redirect to overview
            if (urlParams.get('view') === 'faculty') {
                const overviewTab = document.getElementById('overview-tab');
                if (overviewTab) {
                    const tabInstance = new bootstrap.Tab(overviewTab);
                    tabInstance.show();
                }
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }

        // Listen for storage events across tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'apsit_isms_dynamic_students') {
                const refreshed = getCurrentUser();
                if (refreshed) applyStudentData(refreshed);
                if (isFacultyRole()) renderFacultyRoster();
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

    // Apply student data across the UI
    function applyStudentData(student) {
        if (!student) return;

        // Navbar
        document.getElementById('navStudentName').textContent = student.name;
        document.getElementById('navMoodleBadge').textContent = student.moodleId;
        document.getElementById('dropdownStudentFullName').textContent = student.fullName;
        document.getElementById('dropdownStudentMeta').textContent = `Roll: ${student.rollNo} | ID: ${student.moodleId}`;

        // Sidebar badge
        const sideBadge = document.getElementById('sidebarAttendanceBadge');
        if (sideBadge) {
            sideBadge.textContent = student.attendance.overallPct + '%';
            sideBadge.className = student.attendance.overallPct >= 75 ? 'badge bg-success' : (student.attendance.overallPct >= 60 ? 'badge bg-warning text-dark' : 'badge bg-danger');
        }

        // Welcome card
        document.getElementById('dashStudentName').textContent = student.name;
        document.getElementById('dashRollNo').textContent = student.rollNo;
        document.getElementById('dashMoodleId').textContent = student.moodleId;
        const dashBadge = document.getElementById('dashOverallAttendanceBadge');
        if (dashBadge) {
            dashBadge.textContent = `Attendance: ${student.attendance.overallPct}% (${student.attendance.overallPct >= 75 ? 'Eligible' : 'Defaulter Risk'})`;
            dashBadge.className = student.attendance.overallPct >= 75 ? 'badge bg-light text-primary fw-semibold' : 'badge bg-danger text-white fw-semibold';
        }

        // Academic Overview stats
        document.getElementById('dashTheoryAttended').textContent = `${student.attendance.theoryTotal.attended} / 146`;
        document.getElementById('dashTheoryPct').textContent = `${student.attendance.theoryTotal.pct}% Theory Attended`;
        document.getElementById('dashPracticalAvg').textContent = `${student.attendance.practicalAvg}%`;
        document.getElementById('dashOverallAttendance').textContent = `${student.attendance.overallPct}%`;
        
        const eligBadge = document.getElementById('dashEligibilityBadge');
        if (eligBadge) {
            if (student.attendance.overallPct >= 75) {
                eligBadge.className = 'badge bg-success';
                eligBadge.textContent = 'Eligible (Safe)';
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

        // Attendance View Banner
        const initials = student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        document.getElementById('attCardAvatar').textContent = initials;
        document.getElementById('attCardStudentName').textContent = student.name;
        document.getElementById('attCardStudentMeta').textContent = `Roll: ${student.rollNo} | Moodle ID: ${student.moodleId} | SE IT Div B`;
        
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
        activeFacultyObj = getCurrentFaculty() || FACULTY_LIST[1];
        
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
            updateFacultyHeaderInfo();
            renderFacultyRoster();
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
