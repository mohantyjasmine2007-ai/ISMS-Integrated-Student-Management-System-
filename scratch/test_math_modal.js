// Script to generate rich syllabus modals for mathCourseModal, automataCourseModal, openElectiveModal, adsaLabModal, sqlLabModal
// and test replacement in dashboard1.html

const fs = require('fs');

function generateMathModal() {
  return `<!-- Applied Mathematics Thinking-I Course Modal -->
<div class="modal fade" id="mathCourseModal" tabindex="-1" aria-labelledby="mathCourseModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #0f2744;">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-primary bg-opacity-25 rounded p-2 text-white">
                        <i class="bi bi-calculator-fill fs-3"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold mb-0" id="mathCourseModalLabel">Course 2343111: Applied Mathematics Thinking-I</h5>
                        <small class="text-light opacity-75">S.E. Information Technology • Semester III • Academic Year 2026-27 • In-Charge: <strong class="text-warning">Prof. Puja Chavan</strong></small>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <!-- Course Scheme Highlights -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Teaching Scheme</div>
                            <div class="fs-5 fw-bold text-dark mt-1">Theory: 02 Hrs/Wk</div>
                            <small class="text-muted">Tutorial: 01 Hr/Wk (3 Contact Hrs)</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Credits Assigned</div>
                            <div class="fs-5 fw-bold text-primary mt-1">03 Credits</div>
                            <small class="text-muted">Theory: 02 | Tutorial: 01</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Internal Assessment</div>
                            <div class="fs-5 fw-bold text-warning mt-1">40 Marks</div>
                            <small class="text-muted">IAT-I (20) + IAT-II (20)</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">End Sem &amp; Term Work</div>
                            <div class="fs-5 fw-bold text-success mt-1">60 + 25 = 125 Marks</div>
                            <small class="text-muted">ESE: 60M (2 Hrs) | TW: 25M</small>
                        </div>
                    </div>
                </div>

                <!-- Course Objectives & Outcomes -->
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-primary">
                                <i class="bi bi-bullseye me-2"></i>Course Objectives
                            </div>
                            <div class="card-body">
                                <ul class="small mb-0 ps-3">
                                    <li class="mb-2">To familiarize with the Laplace Transform, Inverse Laplace Transform of various functions, and its applications.</li>
                                    <li class="mb-2">To acquaint oneself with the concept of Fourier series, its complex form, and enhance problem-solving skills.</li>
                                    <li class="mb-2">To familiarize the concept of complex variables, C-R equations with applications.</li>
                                    <li class="mb-2">The fundamental knowledge of Trees, Graphs, etc.</li>
                                    <li class="mb-2">To study the basic techniques of statistics, including correlation, regression, and curve fitting, for data analysis, Machine learning, and AI.</li>
                                    <li>To understand some advanced topics of probability, random variables with their Distributions and expectations.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-success">
                                <i class="bi bi-check2-circle me-2"></i>Course Outcomes (Bloom's Taxonomy)
                            </div>
                            <div class="card-body">
                                <ul class="small mb-0 ps-3">
                                    <li class="mb-2"><strong>CO1:</strong> Apply the concept of Laplace transform to solve real integrals in engineering problems (L1, L2).</li>
                                    <li class="mb-2"><strong>CO2:</strong> Apply the concept of inverse Laplace transform of various functions in engineering problems (L1, L2).</li>
                                    <li class="mb-2"><strong>CO3:</strong> Expand the periodic function by using Fourier series for real life and complex engineering problems (L1, L2, L3).</li>
                                    <li class="mb-2"><strong>CO4:</strong> Find orthogonal trajectories and analytic functions by using basic concepts of complex variable theory (L1, L2, L3).</li>
                                    <li class="mb-2"><strong>CO5:</strong> Apply the concept of Correlation and Regression to engineering problems in data science, machine learning and AI (L2, L3).</li>
                                    <li><strong>CO6:</strong> Illustrate understanding of probability and expectation for getting spread of data and distribution of probabilities (L1, L2).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Detailed Syllabus Table -->
                <h5 class="text-primary fw-bold mb-3"><i class="bi bi-journal-text me-2"></i>Detailed Syllabus Modules</h5>
                <div class="table-responsive mb-4">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th style="width: 8%;">Sr. No.</th>
                                <th style="width: 22%;">Name of Module</th>
                                <th>Detailed Content &amp; Topics</th>
                                <th style="width: 8%;">Hours</th>
                                <th style="width: 10%;">CO Mapping</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center fw-bold">0</td>
                                <td class="fw-bold">Prerequisite</td>
                                <td>Applied Mathematics I, Applied Mathematics-II.</td>
                                <td class="text-center">01</td>
                                <td class="text-center">--</td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">I</td>
                                <td class="fw-bold">Laplace Transform</td>
                                <td>
                                    Definition of Laplace transform, Condition of Existence of Laplace transform.<br>
                                    Laplace Transform of Standard Functions like e<sup>at</sup>, sin(at), cos(at), sinh(at), cosh(at) and t<sup>n</sup>, n &ge; 0.<br>
                                    <strong>Properties of Laplace Transform:</strong> Linearity, First Shifting Theorem, Change of scale Property, multiplication by t, Division by t (division by t<sup>2</sup> not included), Laplace Transform of derivatives (up to second derivative) and integrals (Properties without proof).<br>
                                    Evaluation of real integrals by using Laplace Transformation.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Heaviside's Unit Step function, Second shifting theorem, Laplace Transform of Periodic functions, Dirac Delta Function.</span>
                                </td>
                                <td class="text-center">06</td>
                                <td class="text-center"><span class="badge bg-primary">CO1</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">II</td>
                                <td class="fw-bold">Inverse Laplace Transform</td>
                                <td>
                                    Inverse Laplace Transform, Linearity property, use of standard formulae to find inverse Laplace Transform, finding Inverse Laplace transform using derivatives.<br>
                                    Partial fractions method to find inverse Laplace transform (only up to s<sup>3</sup> in denominator).<br>
                                    Inverse Laplace transform using Convolution theorem (without proof).<br>
                                    Applications to solve initial and boundary value problems involving ordinary differential equations (up to 2nd order differential equations).<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Partial fractions method to find inverse Laplace transform (with s<sup>4</sup> in denominator), Inverse Laplace transform using derivatives and its properties.</span>
                                </td>
                                <td class="text-center">06</td>
                                <td class="text-center"><span class="badge bg-primary">CO1, CO2</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">III</td>
                                <td class="fw-bold">Fourier Series</td>
                                <td>
                                    Dirichlet's conditions, Definition of Fourier series and Parseval's Identity (without proof).<br>
                                    Fourier series of periodic function with period 2&pi; and 2l.<br>
                                    Fourier series of even and odd functions (simple functions only, piecewise continuous function not to be included).<br>
                                    Half Range Sine and Cosine Series.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Complex form of Fourier Series, orthogonal and orthonormal set of functions, Fourier Transform.</span>
                                </td>
                                <td class="text-center">05</td>
                                <td class="text-center"><span class="badge bg-primary">CO3</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">IV</td>
                                <td class="fw-bold">Complex Variables</td>
                                <td>
                                    Analytic function, necessary and sufficient conditions for f(z) to be analytic (without proof).<br>
                                    Cauchy-Riemann equations in cartesian coordinates (without proof, Polar form not included).<br>
                                    Milne-Thomson method to determine analytic function f(z) when real (u) or imaginary part (v) is given.<br>
                                    Harmonic function, Harmonic conjugate, and orthogonal trajectories.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Cauchy-Riemann equations in polar coordinates, conformal mapping, linear, bilinear mapping, cross ratio, fixed points, and standard transformations.</span>
                                </td>
                                <td class="text-center">05</td>
                                <td class="text-center"><span class="badge bg-primary">CO4</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">V</td>
                                <td class="fw-bold">Statistical Techniques</td>
                                <td>
                                    Karl Pearson's Coefficient of correlation (r), Spearman's Rank correlation coefficient (R) (with repeated and non-repeated ranks).<br>
                                    Lines of regression. Fitting of first- and second-degree curves.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Covariance, fitting of exponential curve.</span>
                                </td>
                                <td class="text-center">04</td>
                                <td class="text-center"><span class="badge bg-primary">CO5</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">VI</td>
                                <td class="fw-bold">Probability</td>
                                <td>
                                    Discrete and continuous random variable with probability distribution and probability density function.<br>
                                    Expectation of random variable with mean, variance and standard deviation, moment generating function up to two moments.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Total probability theorem, Bayes' theorem, Skewness and Kurtosis of distribution (data).</span>
                                </td>
                                <td class="text-center">04</td>
                                <td class="text-center"><span class="badge bg-primary">CO6</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- List of Tutorials & Term Work Breakdown -->
                <div class="card mb-4 border-0 bg-light shadow-sm">
                    <div class="card-header bg-white fw-bold text-dark d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-pencil-square text-primary me-2"></i>List of Tutorials &amp; Term Work Distribution (25 Marks)</span>
                        <span class="badge bg-success">TW: 25 Marks</span>
                    </div>
                    <div class="card-body">
                        <div class="row g-3 mb-3">
                            <div class="col-md-8">
                                <h6 class="fw-bold text-secondary mb-2">Class Tutorials (8 Mandatory Tutorial Sessions):</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm table-bordered bg-white mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th style="width: 15%;">Tutorial No.</th>
                                                <th>Tutorial Topic</th>
                                                <th style="width: 20%;">Contact Hours</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td class="text-center fw-bold">1</td><td>Laplace Transform</td><td class="text-center">1 Hr</td></tr>
                                            <tr><td class="text-center fw-bold">2</td><td>Inverse Laplace Transform</td><td class="text-center">1 Hr</td></tr>
                                            <tr><td class="text-center fw-bold">3</td><td>Application Of Laplace Transform</td><td class="text-center">1 Hr</td></tr>
                                            <tr><td class="text-center fw-bold">4</td><td>Fourier Series (Full range)</td><td class="text-center">1 Hr</td></tr>
                                            <tr><td class="text-center fw-bold">5</td><td>Half Range Fourier Series</td><td class="text-center">1 Hr</td></tr>
                                            <tr><td class="text-center fw-bold">6</td><td>Complex Variables</td><td class="text-center">1 Hr</td></tr>
                                            <tr><td class="text-center fw-bold">7</td><td>Statistical Techniques</td><td class="text-center">1 Hr</td></tr>
                                            <tr><td class="text-center fw-bold">8</td><td>Probability</td><td class="text-center">1 Hr</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h6 class="fw-bold text-secondary mb-2">Term Work Marks Distribution:</h6>
                                <ul class="list-group shadow-sm">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <span><i class="bi bi-person-check text-success me-2"></i>Attendance (Theory &amp; Tut)</span>
                                        <span class="badge bg-primary rounded-pill">05 Marks</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <span><i class="bi bi-file-earmark-text text-info me-2"></i>Class Tutorials (Min 6)</span>
                                        <span class="badge bg-primary rounded-pill">10 Marks</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        <span><i class="bi bi-people-fill text-warning me-2"></i>Mini Project (Presentation)</span>
                                        <span class="badge bg-primary rounded-pill">10 Marks</span>
                                    </li>
                                    <li class="list-group-item list-group-item-success d-flex justify-content-between align-items-center fw-bold">
                                        <span>Total Term Work</span>
                                        <span class="badge bg-success rounded-pill">25 Marks</span>
                                    </li>
                                </ul>
                                <small class="text-muted d-block mt-2">
                                    <strong>Mini Project Note:</strong> Group of 4-6 students assigned a self-learning topic with 10-15 min presentation/problem solving graded for 10 marks.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Textbooks and Evaluation Scheme -->
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-dark">
                                <i class="bi bi-book me-2 text-primary"></i>Text Books &amp; References
                            </div>
                            <div class="card-body">
                                <h6 class="fw-bold text-primary small">Text Books:</h6>
                                <ol class="small mb-3 ps-3">
                                    <li><em>Higher Engineering Mathematics</em>, Dr. B.S. Grewal, Khanna Publication.</li>
                                    <li><em>Advanced Engineering Mathematics</em>, Erwin Kreyszig, Wiley Eastern Limited.</li>
                                    <li><em>Advanced Engineering Mathematics</em>, R.K. Jain and S.R.K. Iyengar, Narosa publication.</li>
                                </ol>
                                <h6 class="fw-bold text-secondary small">References:</h6>
                                <ol class="small mb-0 ps-3">
                                    <li><em>Complex Variables and Applications</em>, Brown and Churchill, McGraw-Hill.</li>
                                    <li><em>Probability, Statistics and Random Processes</em>, T. Veerarajan, McGraw-Hill.</li>
                                    <li><em>Theory and Problems of Fourier Analysis</em>, Murray Spiegel, Schaum's Outline Series.</li>
                                    <li><em>Higher Engineering Mathematics</em>, H. K. Dass.</li>
                                    <li><em>Text book of Engineering Mathematics</em>, N. P. Bali and Dr. Manish Goyal.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-dark">
                                <i class="bi bi-clipboard-check me-2 text-success"></i>Assessment &amp; Question Paper Format
                            </div>
                            <div class="card-body">
                                <h6 class="fw-bold text-warning small">Internal Assessment Test (IAT) - 40 Marks:</h6>
                                <p class="small text-muted mb-3">Two Compulsory Internal Assessment Tests of 20 marks each. IAT-I covers 40% to 50% of syllabus, IAT-II covers the remaining 40% to 50% syllabus content.</p>
                                <h6 class="fw-bold text-success small">End Semester Theory Examination - 60 Marks (2 Hrs):</h6>
                                <ul class="small mb-0 ps-3">
                                    <li class="mb-1">Question Paper will comprise a total of six questions each carrying 15 marks.</li>
                                    <li class="mb-1"><strong>Q.1 is compulsory</strong> and covers maximum contents of syllabus.</li>
                                    <li class="mb-1">Remaining questions are mixed in nature (part 'a' and 'b' from different modules).</li>
                                    <li>A total of <strong>four questions</strong> need to be answered out of six.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary fw-semibold" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>`;
}

console.log("generateMathModal length:", generateMathModal().length);
