/**
 * APSIT ISMS - React Interactive Modules
 * Connects with dashboard1.html, studentsData.js, and dashboard1.js
 */

(function () {
    const { useState, useEffect, useMemo, createElement: h } = React;


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
    // 2. Mount React Modules when DOM is ready
    // =========================================================================
    function mountReactModules() {
        const isFaculty = typeof isFacultyRole === 'function' && isFacultyRole();

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
    window.FacultyLiveInsights = FacultyLiveInsights;
    window.mountReactModules = mountReactModules;
})();
