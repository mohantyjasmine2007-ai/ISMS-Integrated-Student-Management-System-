/**
 * APSIT ISMS - React Interactive Modules
 * Connects with dashboard1.html, studentsData.js, and dashboard1.js
 */

(function () {
    const { useState, useEffect, useMemo, createElement: h } = React;

    // =========================================================================
    // 1. Student Attendance Compliance & What-If Forecaster Component
    // =========================================================================
    function StudentAttendanceForecaster() {
        const [student, setStudent] = useState(() => getCurrentUser() || (typeof getLiveStudents === 'function' ? getLiveStudents()[0] : null));
        const [simulatedLectures, setSimulatedLectures] = useState(0); // -10 to +20
        const [simulatedAttended, setSimulatedAttended] = useState(0); // 0 to simulatedLectures

        useEffect(() => {
            const syncStudent = () => {
                const refreshed = getCurrentUser();
                if (refreshed) setStudent(refreshed);
            };
            window.addEventListener('storage', syncStudent);
            window.addEventListener('studentDataUpdated', syncStudent);
            return () => {
                window.removeEventListener('storage', syncStudent);
                window.removeEventListener('studentDataUpdated', syncStudent);
            };
        }, []);

        // If logged in as faculty, do not render student attendance forecaster
        if (typeof isFacultyRole === 'function' && isFacultyRole()) return null;
        if (!student) return null;

        const theoryTotal = student.attendance?.theoryTotal || { attended: 129, pct: 88 };
        const conducted = 146;
        const currentAttended = theoryTotal.attended;
        const currentPct = student.attendance?.overallPct || theoryTotal.pct;

        // Base Compliance calculation
        const compliance = useMemo(() => {
            if (currentPct >= 75) {
                const safeMiss = Math.max(0, Math.floor(currentAttended / 0.75 - conducted));
                return {
                    status: 'Safe & Eligible',
                    badgeClass: 'bg-success',
                    alertClass: 'alert-success',
                    icon: 'bi-shield-check',
                    headline: 'Examination & Term-Work Clearance Active',
                    details: `You can safely miss up to ${safeMiss} upcoming lectures while remaining comfortably at or above the mandatory 75% limit.`,
                    metricLabel: 'Safe Absence Buffer',
                    metricValue: `${safeMiss} Lectures`
                };
            } else {
                const needed = Math.max(1, Math.ceil(3 * conducted - 4 * currentAttended));
                return {
                    status: currentPct >= 60 ? 'Defaulter Warning' : 'Critical Defaulter',
                    badgeClass: currentPct >= 60 ? 'bg-warning text-dark' : 'bg-danger',
                    alertClass: currentPct >= 60 ? 'alert-warning' : 'alert-danger',
                    icon: 'bi-exclamation-triangle-fill',
                    headline: 'Mandatory Attendance Shortage Notice',
                    details: `You must attend the next ${needed} consecutive lectures without absence to raise your overall attendance back to the 75% threshold.`,
                    metricLabel: 'Lectures Needed',
                    metricValue: `${needed} Required`
                };
            }
        }, [currentAttended, conducted, currentPct]);

        // Simulated Attendance Forecast
        const forecast = useMemo(() => {
            const nextConducted = conducted + Number(simulatedLectures);
            const nextAttended = currentAttended + Number(simulatedAttended);
            const projectedPct = nextConducted > 0 ? Math.round((nextAttended / nextConducted) * 100) : currentPct;
            const delta = projectedPct - currentPct;
            return {
                projectedPct,
                delta,
                isEligible: projectedPct >= 75
            };
        }, [conducted, currentAttended, simulatedLectures, simulatedAttended, currentPct]);

        return h('div', { className: 'card section-card border-0 shadow-sm overflow-hidden mb-4' },
            h('div', { className: 'card-header bg-white py-3 d-flex flex-wrap align-items-center justify-content-between gap-2 border-bottom' },
                h('div', { className: 'd-flex align-items-center gap-2' },
                    h('span', { className: 'badge bg-primary-subtle text-primary border px-2 py-1' },
                        h('i', { className: 'bi bi-lightning-charge-fill me-1' }),
                        'React Live Forecaster'
                    ),
                    h('h5', { className: 'mb-0 fw-bold text-dark' }, 'Attendance Compliance & What-If Forecaster')
                ),
                h('div', { className: 'd-flex align-items-center gap-2' },
                    h('span', { className: `badge ${compliance.badgeClass} px-3 py-2 fw-semibold` },
                        h('i', { className: `bi ${compliance.icon} me-1` }),
                        compliance.status
                    )
                )
            ),
            h('div', { className: 'card-body p-4' },
                h('div', { className: 'row g-4 align-items-center' },
                    // Left Column: Official Status
                    h('div', { className: 'col-lg-6' },
                        h('div', { className: `alert ${compliance.alertClass} border-0 shadow-sm p-3 mb-3` },
                            h('div', { className: 'd-flex align-items-start gap-3' },
                                h('i', { className: `bi ${compliance.icon} fs-3 text-dark mt-1` }),
                                h('div', null,
                                    h('h6', { className: 'fw-bold mb-1' }, compliance.headline),
                                    h('p', { className: 'small mb-0 opacity-90' }, compliance.details)
                                )
                            )
                        ),
                        h('div', { className: 'row g-3' },
                            h('div', { className: 'col-6' },
                                h('div', { className: 'p-3 bg-light rounded text-center border' },
                                    h('small', { className: 'text-muted text-uppercase fw-bold' }, 'Current Attendance'),
                                    h('div', { className: 'fs-3 fw-bold text-primary mt-1' }, `${currentPct}%`),
                                    h('small', { className: 'text-muted' }, `${currentAttended} / ${conducted} Lectures`)
                                )
                            ),
                            h('div', { className: 'col-6' },
                                h('div', { className: 'p-3 bg-light rounded text-center border' },
                                    h('small', { className: 'text-muted text-uppercase fw-bold' }, compliance.metricLabel),
                                    h('div', { className: 'fs-3 fw-bold text-dark mt-1' }, compliance.metricValue),
                                    h('small', { className: 'text-muted' }, '75% Compliance Target')
                                )
                            )
                        )
                    ),
                    // Right Column: What-If Interactive Simulator
                    h('div', { className: 'col-lg-6' },
                        h('div', { className: 'p-3 bg-white border rounded shadow-sm' },
                            h('div', { className: 'd-flex align-items-center justify-content-between mb-2' },
                                h('span', { className: 'fw-bold small text-uppercase text-secondary' },
                                    h('i', { className: 'bi bi-sliders2 me-1 text-primary' }),
                                    'What-If Simulation Simulator'
                                ),
                                h('span', { className: `badge ${forecast.isEligible ? 'bg-success' : 'bg-danger'}` },
                                    `Forecast: ${forecast.projectedPct}% (${forecast.isEligible ? 'Safe' : 'Shortage'})`
                                )
                            ),
                            h('div', { className: 'mb-3' },
                                h('div', { className: 'd-flex justify-content-between small text-muted mb-1' },
                                    h('span', null, 'Upcoming Lectures to Simulate:'),
                                    h('strong', { className: 'text-primary' }, `${simulatedLectures} Lectures`)
                                ),
                                h('input', {
                                    type: 'range',
                                    className: 'form-range',
                                    min: '0',
                                    max: '20',
                                    step: '1',
                                    value: simulatedLectures,
                                    onChange: (e) => {
                                        const val = Number(e.target.value);
                                        setSimulatedLectures(val);
                                        if (simulatedAttended > val) setSimulatedAttended(val);
                                    }
                                })
                            ),
                            h('div', { className: 'mb-3' },
                                h('div', { className: 'd-flex justify-content-between small text-muted mb-1' },
                                    h('span', null, 'Simulated Lectures Attended:'),
                                    h('strong', { className: 'text-success' }, `${simulatedAttended} Attended`)
                                ),
                                h('input', {
                                    type: 'range',
                                    className: 'form-range',
                                    min: '0',
                                    max: simulatedLectures || '1',
                                    step: '1',
                                    disabled: simulatedLectures === 0,
                                    value: simulatedAttended,
                                    onChange: (e) => setSimulatedAttended(Number(e.target.value))
                                })
                            ),
                            h('div', { className: 'd-flex align-items-center justify-content-between pt-2 border-top' },
                                h('div', null,
                                    h('small', { className: 'text-muted' }, 'Projected Shift: '),
                                    h('strong', { className: forecast.delta >= 0 ? 'text-success' : 'text-danger' },
                                        `${forecast.delta >= 0 ? '+' : ''}${forecast.delta}%`
                                    )
                                ),
                                h('button', {
                                    type: 'button',
                                    className: 'btn btn-sm btn-outline-secondary',
                                    onClick: () => {
                                        setSimulatedLectures(0);
                                        setSimulatedAttended(0);
                                    }
                                }, 'Reset Simulation')
                            )
                        )
                    )
                )
            )
        );
    }

    // =========================================================================
    // 2. Faculty Live Insights & Batch Distribution Component
    // =========================================================================
    function FacultyLiveInsights() {
        const [faculty, setFaculty] = useState(() => getCurrentFaculty() || (typeof FACULTY_LIST !== 'undefined' ? FACULTY_LIST[1] : null));
        const [filterQuery, setFilterQuery] = useState('');
        const [activeFilter, setActiveFilter] = useState('all');

        useEffect(() => {
            const syncFaculty = () => {
                const refreshed = getCurrentFaculty();
                if (refreshed) setFaculty(refreshed);
            };
            window.addEventListener('storage', syncFaculty);
            window.addEventListener('facultyUpdated', syncFaculty);
            return () => {
                window.removeEventListener('storage', syncFaculty);
                window.removeEventListener('facultyUpdated', syncFaculty);
            };
        }, []);

        const students = typeof getLiveStudents === 'function' ? getLiveStudents() : [];
        const subjKey = faculty?.subjectKey || 'advanceDataStructures';
        const subjInfo = (typeof SUBJECT_INFO !== 'undefined' && SUBJECT_INFO[subjKey]) ? SUBJECT_INFO[subjKey] : { conducted: 20 };

        const stats = useMemo(() => {
            let eligible = 0;
            let warning = 0;
            let critical = 0;
            let totalPct = 0;

            students.forEach(s => {
                const att = s.attendance?.[subjKey] || { attended: 15, pct: 75 };
                const pct = att.pct;
                totalPct += pct;
                if (pct >= 75) eligible++;
                else if (pct >= 60) warning++;
                else critical++;
            });

            const avg = students.length ? Math.round(totalPct / students.length) : 0;
            return {
                total: students.length,
                eligible,
                warning,
                critical,
                avg
            };
        }, [students, subjKey]);

        if (!isFacultyRole()) return null;

        return h('div', { className: 'card section-card border-0 shadow-sm mb-4' },
            h('div', { className: 'card-body p-4' },
                h('div', { className: 'd-flex flex-wrap align-items-center justify-content-between gap-3 mb-3' },
                    h('div', null,
                        h('div', { className: 'd-flex align-items-center gap-2' },
                            h('span', { className: 'badge bg-primary text-white px-2 py-1' },
                                h('i', { className: 'bi bi-cpu-fill me-1' }),
                                'React Faculty Telemetry'
                            ),
                            h('h5', { className: 'mb-0 fw-bold' }, `Real-Time Cohort Telemetry — ${faculty?.subjectName || 'Course'}`)
                        ),
                        h('small', { className: 'text-muted' }, `Monitoring ${stats.total} SE-IT enrolled candidates against ${subjInfo.conducted} conducted hours.`)
                    ),
                    h('div', { className: 'd-flex align-items-center gap-2' },
                        h('span', { className: 'badge bg-light text-dark border px-3 py-2 fs-6' },
                            `Batch Average: `,
                            h('strong', { className: stats.avg >= 75 ? 'text-success' : 'text-danger' }, `${stats.avg}%`)
                        )
                    )
                ),
                h('div', { className: 'row g-3 text-center' },
                    h('div', { className: 'col-md-3 col-6' },
                        h('div', { className: 'p-3 rounded border bg-success-subtle text-success h-100' },
                            h('div', { className: 'fs-3 fw-bold' }, stats.eligible),
                            h('small', { className: 'fw-semibold text-uppercase' }, 'Eligible (>= 75%)')
                        )
                    ),
                    h('div', { className: 'col-md-3 col-6' },
                        h('div', { className: 'p-3 rounded border bg-warning-subtle text-warning-emphasis h-100' },
                            h('div', { className: 'fs-3 fw-bold' }, stats.warning),
                            h('small', { className: 'fw-semibold text-uppercase' }, 'Warning (60-74%)')
                        )
                    ),
                    h('div', { className: 'col-md-3 col-6' },
                        h('div', { className: 'p-3 rounded border bg-danger-subtle text-danger h-100' },
                            h('div', { className: 'fs-3 fw-bold' }, stats.critical),
                            h('small', { className: 'fw-semibold text-uppercase' }, 'Critical (< 60%)')
                        )
                    ),
                    h('div', { className: 'col-md-3 col-6' },
                        h('div', { className: 'p-3 rounded border bg-primary-subtle text-primary h-100' },
                            h('div', { className: 'fs-3 fw-bold' }, stats.total),
                            h('small', { className: 'fw-semibold text-uppercase' }, 'Total SE IT B Roster')
                        )
                    )
                )
            )
        );
    }

    // =========================================================================
    // 3. Mount React Modules when DOM is ready
    // =========================================================================
    function mountReactModules() {
        const isFaculty = typeof isFacultyRole === 'function' && isFacultyRole();

        // Mount on Overview/Dashboard tab
        const forecasterRootEl = document.getElementById('react-attendance-forecaster-root');
        if (forecasterRootEl && typeof ReactDOM !== 'undefined') {
            const root = ReactDOM.createRoot(forecasterRootEl);
            if (isFaculty) {
                // When logged in as faculty, mount live cohort telemetry and action controls!
                root.render(h(FacultyLiveInsights));
            } else {
                root.render(h(StudentAttendanceForecaster));
            }
        }

        // Mount Faculty Insights on Faculty tab
        const facultyInsightsRootEl = document.getElementById('react-faculty-insights-root');
        if (facultyInsightsRootEl && typeof ReactDOM !== 'undefined' && isFaculty) {
            const root = ReactDOM.createRoot(facultyInsightsRootEl);
            root.render(h(FacultyLiveInsights));
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountReactModules);
    } else {
        mountReactModules();
    }

    // Export components for global access
    window.StudentAttendanceForecaster = StudentAttendanceForecaster;
    window.FacultyLiveInsights = FacultyLiveInsights;
    window.mountReactModules = mountReactModules;
})();
