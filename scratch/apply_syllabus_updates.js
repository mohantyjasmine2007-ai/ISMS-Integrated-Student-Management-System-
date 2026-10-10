const fs = require('fs');

let html = fs.readFileSync('dashboard1.html', 'utf8');

// 1. Update Course Cards in courses-view
const oldCardsStart = html.indexOf('<div class="row g-4 mb-4">\n                        <!-- Math Course Card -->');
const oldCardsEnd = html.indexOf('</div>\n                </div>\n\n                <!-- Academic Calendar Tab Content -->');

if (oldCardsStart === -1 || oldCardsEnd === -1) {
  console.error("Could not locate Course Cards block!");
  process.exit(1);
}

const newCardsHtml = `<div class="row g-4 mb-4">
                        <!-- Math Course Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <i class="bi bi-calculator course-icon"></i>
                                        <span class="badge bg-primary-subtle text-primary border">Course 2343111</span>
                                    </div>
                                    <h5 class="mt-3 fw-bold">Applied Mathematics Thinking-I</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Puja Chavan</p>
                                    <p class="text-muted small mb-0">Theory 2h + Tut 1h • 3 Credits • 125 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#mathCourseModal"><i class="bi bi-book-half me-1"></i> View Syllabus &amp; Scheme</button>
                                </div>
                            </div>
                        </div>

                        <!-- ADSA Course Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <i class="bi bi-diagram-3 course-icon"></i>
                                        <span class="badge bg-primary-subtle text-primary border">Course 2343112</span>
                                    </div>
                                    <h5 class="mt-3 fw-bold">Advance Data Structure &amp; Analysis</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Dr. Sonia Aneesh</p>
                                    <p class="text-muted small mb-0">Theory 3h • 3 Credits • 100 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#adsaCourseModal"><i class="bi bi-book-half me-1"></i> View Syllabus &amp; Scheme</button>
                                </div>
                            </div>
                        </div>

                        <!-- DBMS Course Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <i class="bi bi-database course-icon"></i>
                                        <span class="badge bg-primary-subtle text-primary border">Course 2343113</span>
                                    </div>
                                    <h5 class="mt-3 fw-bold">Database Management System &amp; Application</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Shital Agarwal</p>
                                    <p class="text-muted small mb-0">Theory 3h • 3 Credits • 100 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#dbmsCourseModal"><i class="bi bi-book-half me-1"></i> View Syllabus &amp; Scheme</button>
                                </div>
                            </div>
                        </div>

                        <!-- Automata Theory Course Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <i class="bi bi-cpu course-icon"></i>
                                        <span class="badge bg-primary-subtle text-primary border">Course 2343114</span>
                                    </div>
                                    <h5 class="mt-3 fw-bold">Automata Theory</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Charul Singh</p>
                                    <p class="text-muted small mb-0">Theory 3h • 3 Credits • 100 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#automataCourseModal"><i class="bi bi-book-half me-1"></i> View Syllabus &amp; Scheme</button>
                                </div>
                            </div>
                        </div>

                        <!-- Open Elective Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <i class="bi bi-bank2 course-icon"></i>
                                        <span class="badge bg-primary-subtle text-primary border">Course OEC301</span>
                                    </div>
                                    <h5 class="mt-3 fw-bold">Open Elective (Banking &amp; Finance)</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Anupama Singh</p>
                                    <p class="text-muted small mb-0">Theory 2h • 2 Credits • 100 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#openElectiveModal"><i class="bi bi-book-half me-1"></i> View Syllabus &amp; Scheme</button>
                                </div>
                            </div>
                        </div>

                        <!-- ADSA Lab Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <i class="bi bi-pc-display course-icon"></i>
                                        <span class="badge bg-secondary-subtle text-secondary border">Course 2343115</span>
                                    </div>
                                    <h5 class="mt-3 fw-bold">ADSA Lab</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Anupama Singh</p>
                                    <p class="text-muted small mb-0">Practical 2h • 1 Credit • 50 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#adsaLabModal"><i class="bi bi-code-slash me-1"></i> View Lab &amp; Practicals</button>
                                </div>
                            </div>
                        </div>

                        <!-- SQL Lab Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <i class="bi bi-server course-icon"></i>
                                        <span class="badge bg-secondary-subtle text-secondary border">Course 2343116</span>
                                    </div>
                                    <h5 class="mt-3 fw-bold">SQL Lab</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Shital Agarwal</p>
                                    <p class="text-muted small mb-0">Practical 2h • 1 Credit • 50 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#sqlLabModal"><i class="bi bi-code-slash me-1"></i> View Lab &amp; Practicals</button>
                                </div>
                            </div>
                        </div>

                        <!-- Mini Project Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <i class="bi bi-file-code course-icon"></i>
                                        <span class="badge bg-info-subtle text-info border">Course 2343611</span>
                                    </div>
                                    <h5 class="mt-3 fw-bold">Mini-Project - Full Stack Java</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Mandar Ganjapurkar</p>
                                    <p class="text-muted small mb-0">Project 4h • 2 Credits • 75 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#miniProjectModal"><i class="bi bi-code-slash me-1"></i> View Project Syllabus</button>
                                </div>
                            </div>
                        </div>

                        <!-- Entrepreneurship Development Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between mb-2">
                                        <i class="bi bi-lightbulb course-icon text-warning"></i>
                                        <span class="badge bg-warning-subtle text-dark border">Course 2993511</span>
                                    </div>
                                    <h5 class="mt-2 fw-bold">Entrepreneurship Development</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Randeep Kaur Kahlon</p>
                                    <p class="text-muted small mb-0">Practical 4h • 2 Credits • 50 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#edCourseModal"><i class="bi bi-book-half me-1"></i> View Syllabus &amp; Lab</button>
                                </div>
                            </div>
                        </div>

                        <!-- Environmental Science Card -->
                        <div class="col-sm-6 col-xl-3">
                            <div class="card course-card shadow-sm border-0 h-100">
                                <div class="card-body">
                                    <div class="d-flex align-items-center justify-content-between mb-2">
                                        <i class="bi bi-tree course-icon text-success"></i>
                                        <span class="badge bg-success-subtle text-success border">Course 2993512</span>
                                    </div>
                                    <h5 class="mt-2 fw-bold">Environmental Science</h5>
                                    <p class="text-primary small mb-1 fw-semibold"><i class="bi bi-person-fill me-1"></i>Prof. Pranali Vhora</p>
                                    <p class="text-muted small mb-0">Practical 4h • 2 Credits • 50 Marks</p>
                                </div>
                                <div class="card-footer bg-white border-0 pt-0">
                                    <button class="btn btn-outline-primary w-100 fw-semibold" data-bs-toggle="modal" data-bs-target="#evsCourseModal"><i class="bi bi-book-half me-1"></i> View Syllabus &amp; Lab</button>
                                </div>
                            </div>
                        </div>
                    </div>`;

html = html.substring(0, oldCardsStart) + newCardsHtml + html.substring(oldCardsEnd);
console.log("Updated course cards in courses-view!");

// Import modals from scratch/build_all_course_modals.js
const modalGenerators = require('./build_all_course_modals.js');

// Replace Math modal
const mathStart = html.indexOf('<!-- Applied Mathematics Thinking-I Course Modal -->');
const adsaStart = html.indexOf('<!-- Advance Data Structure & Analysis Course Modal -->');
if (mathStart !== -1 && adsaStart !== -1) {
  // Read generateMathModal output
  // We will run the generator functions
}

fs.writeFileSync('dashboard1.html', html, 'utf8');
console.log("Successfully saved dashboard1.html with updated cards!");
