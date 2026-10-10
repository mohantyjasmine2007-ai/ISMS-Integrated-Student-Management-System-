const fs = require('fs');

function getMathModal() {
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

function getAutomataModal() {
  return `<!-- Automata Theory Course Modal -->
<div class="modal fade" id="automataCourseModal" tabindex="-1" aria-labelledby="automataCourseModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #0f2744;">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-primary bg-opacity-25 rounded p-2 text-white">
                        <i class="bi bi-cpu-fill fs-3"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold mb-0" id="automataCourseModalLabel">Course 2343114 / ITC404: Automata Theory</h5>
                        <small class="text-light opacity-75">S.E. Information Technology • Semester III • Academic Year 2026-27 • In-Charge: <strong class="text-warning">Prof. Charul Singh</strong></small>
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
                            <div class="fs-5 fw-bold text-dark mt-1">Theory: 03 Hrs/Wk</div>
                            <small class="text-muted">3 Contact Hours / Week</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Credits Assigned</div>
                            <div class="fs-5 fw-bold text-primary mt-1">03 Credits</div>
                            <small class="text-muted">Theory: 03 | Pract: --</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Internal Assessment</div>
                            <div class="fs-5 fw-bold text-warning mt-1">40 Marks</div>
                            <small class="text-muted">Test 1 (20) + Test 2 (20)</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">End Sem Examination</div>
                            <div class="fs-5 fw-bold text-success mt-1">60 Marks</div>
                            <small class="text-muted">Total: 100 Marks (2 Hrs)</small>
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
                                    <li class="mb-2">To learn fundamentals of Regular and Context Free Grammars and Languages.</li>
                                    <li class="mb-2">To understand the relation between Regular Language and Finite Automata and machines.</li>
                                    <li class="mb-2">To learn how to design Automata's as Acceptors, Verifiers and Translators.</li>
                                    <li class="mb-2">To understand the relation between Regular Languages, Context Free Languages, PDA and Turing Machine.</li>
                                    <li class="mb-2">To learn how to design PDA as acceptor and TM as Calculators.</li>
                                    <li>To learn applications of Automata Theory in compiler design and computation.</li>
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
                                    <li class="mb-2"><strong>CO1:</strong> Explain, analyze and design Regular languages, Expressions and Grammars (L2, L4, L6).</li>
                                    <li class="mb-2"><strong>CO2:</strong> Design different types of Finite Automata and Machines as Acceptor, Verifier and Translator (L6).</li>
                                    <li class="mb-2"><strong>CO3:</strong> Analyze and design Context Free languages and Grammars (L4, L6).</li>
                                    <li class="mb-2"><strong>CO4:</strong> Design different types of Push Down Automata as Simple Parser (L6).</li>
                                    <li class="mb-2"><strong>CO5:</strong> Design different types of Turing Machines as Acceptor, Verifier, Translator and Basic computing machine (L6).</li>
                                    <li><strong>CO6:</strong> Develop understanding of applications of various Automata and compiler phases (L6).</li>
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
                                <th style="width: 8%;">Module</th>
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
                                <td>Basic Mathematical Fundamentals: Sets, Logic, Relations, Functions.</td>
                                <td class="text-center">02</td>
                                <td class="text-center">--</td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">I</td>
                                <td class="fw-bold">Introduction and Regular Languages</td>
                                <td>
                                    Languages: Alphabets and Strings.<br>
                                    <strong>Regular Languages:</strong> Regular Expressions, Regular Languages, Regular Grammars, RL and LL grammars, Closure properties.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Practice exercise on Regular Expressions. Identify tools for automata simulation (JFLAP).</span>
                                </td>
                                <td class="text-center">05</td>
                                <td class="text-center"><span class="badge bg-primary">CO1</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">II</td>
                                <td class="fw-bold">Finite Automata</td>
                                <td>
                                    <strong>Finite Automata:</strong> FA as language acceptor or verifier, NFA (with and without &epsilon;), DFA, RE to NFA, NFA to DFA, Reduced DFA, NFA-DFA equivalence, FA to RE.<br>
                                    <strong>Finite State Machines with output:</strong> Moore and Mealy machines. Moore and Mealy M/C conversion. Limitations of FA.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Practice exercises on FA and NFA construction and conversion.</span>
                                </td>
                                <td class="text-center">09</td>
                                <td class="text-center"><span class="badge bg-primary">CO2</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">III</td>
                                <td class="fw-bold">Context Free Grammars</td>
                                <td>
                                    <strong>Context Free Languages:</strong> CFG, Leftmost and Rightmost derivations, Ambiguity in grammars.<br>
                                    Simplification and Normalization: Chomsky Normal Form (CNF) &amp; Greibach Normal Form (GNF).<br>
                                    Chomsky Hierarchy (Types 0 to 3).<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Practice numericals and grammar design exercises on CFG.</span>
                                </td>
                                <td class="text-center">08</td>
                                <td class="text-center"><span class="badge bg-primary">CO3</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">IV</td>
                                <td class="fw-bold">Push Down Automata</td>
                                <td>
                                    <strong>Push Down Automata:</strong> Deterministic (single stack) PDA, Equivalence between PDA and CFG.<br>
                                    Power and Limitations of PDA. Non-deterministic PDA.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> List real-world parsing examples and stack configurations of PDA.</span>
                                </td>
                                <td class="text-center">05</td>
                                <td class="text-center"><span class="badge bg-primary">CO4</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">V</td>
                                <td class="fw-bold">Turing Machine</td>
                                <td>
                                    <strong>Turing Machine:</strong> Deterministic TM, Variants of TM (Multi-tape, Multi-track), Halting problem, Power of TM, Universal Turing Machine.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Practice numericals of TM as arithmetic calculators and string recognizers.</span>
                                </td>
                                <td class="text-center">07</td>
                                <td class="text-center"><span class="badge bg-primary">CO5</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">VI</td>
                                <td class="fw-bold">Applications of Automata</td>
                                <td>
                                    Applications of FA, CFG, PDA &amp; TM.<br>
                                    Introduction to Compiler &amp; Its phases: Lexical Analysis, Syntax Analysis, Semantic Analysis, Intermediate Code Generation.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Case study on any one compiler/lexer tool (e.g. Lex / Flex / Yacc).</span>
                                </td>
                                <td class="text-center">03</td>
                                <td class="text-center"><span class="badge bg-primary">CO2, CO3, CO4, CO5, CO6</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Textbooks and Question Paper Format -->
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-dark">
                                <i class="bi bi-book me-2 text-primary"></i>Text Books &amp; References
                            </div>
                            <div class="card-body">
                                <h6 class="fw-bold text-primary small">Text Books:</h6>
                                <ol class="small mb-3 ps-3">
                                    <li>J.C. Martin, <em>Introduction to languages and the Theory of Computation</em>, TMH.</li>
                                    <li>Kavi Mahesh, <em>Theory of Computation: A Problem Solving Approach</em>, Wiley India.</li>
                                    <li>A. V. Aho, R. Shethi, Monica Lam, J.D. Ullman, <em>Compilers: Principles, Techniques and Tools</em>, Pearson Education.</li>
                                </ol>
                                <h6 class="fw-bold text-secondary small">References:</h6>
                                <ol class="small mb-0 ps-3">
                                    <li>John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman, <em>Introduction to Automata Theory, Languages and Computation</em>, Pearson Education.</li>
                                    <li>Daniel I.A. Cohen, <em>Introduction to Computer Theory</em>, John Wiley &amp; Sons.</li>
                                    <li>Vivek Kulkarni, <em>Theory of Computation</em>, Oxford University.</li>
                                    <li>N. Chandrashekhar, K.L.P. Mishra, <em>Theory of Computer Science, Automata Languages &amp; Computations</em>, PHI publications.</li>
                                    <li>J. J. Donovan, <em>Systems Programming</em>, TMH.</li>
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
                                <h6 class="fw-bold text-warning small">Internal Assessment (IA) - 40 Marks:</h6>
                                <p class="small text-muted mb-3">Two Compulsory Internal Assessment Tests of 20 marks each. Approximately 40% to 50% of syllabus content covered in First IA Test and remaining in Second IA Test.</p>
                                <h6 class="fw-bold text-success small">End Semester Examination - 60 Marks (2 Hrs):</h6>
                                <ul class="small mb-3 ps-3">
                                    <li class="mb-1">Question Paper comprises a total of six questions each carrying 15 marks.</li>
                                    <li class="mb-1"><strong>Q.1 is compulsory</strong> and covers maximum contents of syllabus.</li>
                                    <li class="mb-1">Remaining questions are mixed in nature (part 'a' and 'b' from different modules).</li>
                                    <li>A total of <strong>four questions</strong> need to be answered.</li>
                                </ul>
                                <h6 class="fw-bold text-info small">Online Video Resources:</h6>
                                <span class="badge bg-light text-dark border me-1">NPTEL IIT Kharagpur</span>
                                <span class="badge bg-light text-dark border me-1">Stanford Online</span>
                                <span class="badge bg-light text-dark border">Coursera TOC</span>
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

function getOpenElectiveModal() {
  return `<!-- Open Elective Course Modal -->
<div class="modal fade" id="openElectiveModal" tabindex="-1" aria-labelledby="openElectiveModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #0f2744;">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-primary bg-opacity-25 rounded p-2 text-white">
                        <i class="bi bi-bank2 fs-3"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold mb-0" id="openElectiveModalLabel">Course OEC301: Open Elective (Banking &amp; Financial Systems)</h5>
                        <small class="text-light opacity-75">S.E. Information Technology • Semester III • Academic Year 2026-27 • In-Charge: <strong class="text-warning">Prof. Anupama Singh</strong></small>
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
                            <small class="text-muted">2 Contact Hours / Week</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Credits Assigned</div>
                            <div class="fs-5 fw-bold text-primary mt-1">02 Credits</div>
                            <small class="text-muted">Open Elective Stream</small>
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
                            <div class="text-muted small text-uppercase fw-bold">End Sem Examination</div>
                            <div class="fs-5 fw-bold text-success mt-1">60 Marks</div>
                            <small class="text-muted">Total: 100 Marks (2 Hrs)</small>
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
                                    <li class="mb-2">To understand the foundational principles, structure, and functions of modern commercial and retail banking.</li>
                                    <li class="mb-2">To comprehend the regulatory framework governed by the Reserve Bank of India (RBI) and global financial standards.</li>
                                    <li class="mb-2">To analyze credit evaluation, asset management, and risk mitigation in financial institutions.</li>
                                    <li>To explore technological transformations in banking: UPI, Core Banking Solutions, Blockchain, and FinTech ecosystems.</li>
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
                                    <li class="mb-2"><strong>CO1:</strong> Explain basic banking operations, product lifecycles, and digital transaction mechanisms (L1, L2).</li>
                                    <li class="mb-2"><strong>CO2:</strong> Apply knowledge of RBI statutory policies, KYC/AML norms, and monetary control instruments (L2, L3).</li>
                                    <li class="mb-2"><strong>CO3:</strong> Evaluate credit appraisal procedures, non-performing asset (NPA) management, and capital markets (L3, L4).</li>
                                    <li><strong>CO4:</strong> Assess the architecture, security, and benefits of emerging FinTech and digital banking solutions (L2, L4).</li>
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
                                <th style="width: 8%;">Module</th>
                                <th style="width: 25%;">Name of Module</th>
                                <th>Detailed Content &amp; Topics</th>
                                <th style="width: 8%;">Hours</th>
                                <th style="width: 10%;">CO Mapping</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center fw-bold">I</td>
                                <td class="fw-bold">Introduction to Banking &amp; Digital Payments</td>
                                <td>
                                    Basic Concepts, Origin, Need of Banking, Types of Banking (Commercial, Cooperative, Regional Rural, Small Finance, Payment Banks), Scope and Functions of Banking.<br>
                                    Need for Regulation and Supervision.<br>
                                    <strong>Retail Digital Banking:</strong> Debit Cards, Credit Cards, Prepaid Cards, ATM operations, Internet Banking, Mobile Banking.<br>
                                    <strong>Digital Payment Ecosystems in India:</strong> NEFT, RTGS, IMPS, Unified Payments Interface (UPI), Aadhaar Enabled Payment System (AEPS), Bharat QR, USSD banking.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Growth metrics of digital retail payments under NPCI supervision.</span>
                                </td>
                                <td class="text-center">06</td>
                                <td class="text-center"><span class="badge bg-primary">CO1</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">II</td>
                                <td class="fw-bold">Banking Scenario &amp; Regulations in India</td>
                                <td>
                                    Banking Operations, Types of Accounts (Savings, Current, Fixed Deposit, Recurring Deposit, Demat, NRI Accounts).<br>
                                    Know Your Customer (KYC) Guidelines and Anti-Money Laundering (AML) standards.<br>
                                    Banking Services: Cheque clearance (CTS-2020), Locker facilities, Remittance services.<br>
                                    Financial Inclusion initiatives: Pradhan Mantri Jan Dhan Yojana (PMJDY), Direct Benefit Transfer (DBT).<br>
                                    <strong>Regulatory Environment:</strong> Banking Regulation Act 1949, Role and Functions of Reserve Bank of India (RBI), Monetary policy tools (Cash Reserve Ratio - CRR, Statutory Liquidity Ratio - SLR, Repo Rate, Reverse Repo Rate, Bank Rate).<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Analysis of RBI's bi-monthly monetary policy announcements.</span>
                                </td>
                                <td class="text-center">07</td>
                                <td class="text-center"><span class="badge bg-primary">CO2</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">III</td>
                                <td class="fw-bold">Credit Operations, Lending &amp; Financial Markets</td>
                                <td>
                                    Principles of Sound Lending (Safety, Liquidity, Profitability).<br>
                                    Credit appraisal process, Working Capital Finance, Term Loans, Retail Loans (Home, Auto, Education, Personal).<br>
                                    Non-Performing Assets (NPAs): Classification (Substandard, Doubtful, Loss assets), Causes, Provisioning norms, SARFAESI Act 2002, Insolvency and Bankruptcy Code (IBC).<br>
                                    <strong>Financial Markets Overview:</strong> Structure of Indian Financial Market, Money Market vs Capital Market, Primary Market (IPOs) vs Secondary Market, Stock Exchanges (BSE, NSE), Role of SEBI in market governance and investor protection.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Comparative study of asset quality between public and private sector banks.</span>
                                </td>
                                <td class="text-center">07</td>
                                <td class="text-center"><span class="badge bg-primary">CO3</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">IV</td>
                                <td class="fw-bold">FinTech Innovations &amp; Future of Banking</td>
                                <td>
                                    <strong>Core Banking Solutions (CBS):</strong> Architectural components, centralized processing, real-time transaction clearing.<br>
                                    Open Banking and API Banking: Third-party integration, Account Aggregator framework.<br>
                                    Artificial Intelligence &amp; Machine Learning in Banking: Automated credit underwriting, algorithmic trading, fraud detection and risk alerts, conversational AI chatbots.<br>
                                    Blockchain Technology in Banking: Distributed ledgers, smart contracts, cross-border remittances.<br>
                                    Central Bank Digital Currency (CBDC - Digital Rupee): Architecture, wholesale vs retail CBDC.<br>
                                    Cybersecurity in Banking: PCI-DSS compliance, tokenization, multi-factor authentication (MFA), phishing prevention.<br>
                                    <span class="text-muted small"><strong>Self-learning Topics:</strong> Case study of an Indian FinTech unicorn and its disruption of traditional banking models.</span>
                                </td>
                                <td class="text-center">06</td>
                                <td class="text-center"><span class="badge bg-primary">CO4</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Textbooks and Examination Scheme -->
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-dark">
                                <i class="bi bi-book me-2 text-primary"></i>Text Books &amp; References
                            </div>
                            <div class="card-body">
                                <h6 class="fw-bold text-primary small">Text Books:</h6>
                                <ol class="small mb-3 ps-3">
                                    <li>Indian Institute of Banking &amp; Finance (IIBF), <em>Principles &amp; Practices of Banking</em>, Macmillan Education.</li>
                                    <li>E. Gordon &amp; K. Natarajan, <em>Banking Theory, Law and Practice</em>, Himalaya Publishing House.</li>
                                    <li>H.R. Machiraju, <em>Indian Financial System</em>, Vikas Publishing House.</li>
                                </ol>
                                <h6 class="fw-bold text-secondary small">References:</h6>
                                <ol class="small mb-0 ps-3">
                                    <li>S.N. Maheshwari, <em>Banking Law and Practice</em>, Kalyani Publishers.</li>
                                    <li>Bharati V. Pathak, <em>The Indian Financial System: Markets, Institutions and Services</em>, Pearson Education.</li>
                                    <li>RBI Official Website &amp; Publications: Bulletins, Annual Reports, and Master Directions.</li>
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
                                <p class="small text-muted mb-3">Two Compulsory Internal Assessment Tests of 20 marks each covering proportional module contents.</p>
                                <h6 class="fw-bold text-success small">End Semester Examination - 60 Marks (2 Hrs):</h6>
                                <ul class="small mb-0 ps-3">
                                    <li class="mb-1">Question Paper will comprise a total of six questions each carrying 15 marks.</li>
                                    <li class="mb-1"><strong>Q.1 is compulsory</strong> and covers the entire syllabus breadth.</li>
                                    <li class="mb-1">Remaining questions are mixed in nature across the 4 modules.</li>
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

function getAdsaLabModal() {
  return `<!-- ADSA Lab Modal -->
<div class="modal fade" id="adsaLabModal" tabindex="-1" aria-labelledby="adsaLabModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #0f2744;">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-primary bg-opacity-25 rounded p-2 text-white">
                        <i class="bi bi-pc-display-horizontal fs-3"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold mb-0" id="adsaLabModalLabel">Course 2343115: Advance Data Structure &amp; Analysis Lab (ADSA Lab)</h5>
                        <small class="text-light opacity-75">S.E. Information Technology • Semester III • Academic Year 2026-27 • In-Charge: <strong class="text-warning">Prof. Anupama Singh</strong></small>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <!-- Lab Scheme Highlights -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Teaching Scheme</div>
                            <div class="fs-5 fw-bold text-dark mt-1">Practical: 02 Hrs/Wk</div>
                            <small class="text-muted">2 Contact Hours / Week</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Credits Assigned</div>
                            <div class="fs-5 fw-bold text-primary mt-1">01 Credit</div>
                            <small class="text-muted">Practical Lab Credit</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Term Work</div>
                            <div class="fs-5 fw-bold text-warning mt-1">25 Marks</div>
                            <small class="text-muted">15 Exp + 5 Assign + 5 Att</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Practical &amp; Oral Exam</div>
                            <div class="fs-5 fw-bold text-success mt-1">25 Marks</div>
                            <small class="text-muted">Total: 50 Marks (Lab)</small>
                        </div>
                    </div>
                </div>

                <!-- Lab Objectives & Lab Outcomes -->
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-primary">
                                <i class="bi bi-bullseye me-2"></i>Lab Objectives
                            </div>
                            <div class="card-body">
                                <ul class="small mb-0 ps-3">
                                    <li class="mb-2">To learn mathematical background for analysis of algorithms.</li>
                                    <li class="mb-2">To learn various advanced data structures (BST, AVL, B/B+ trees).</li>
                                    <li class="mb-2">To learn greedy approaches to solve optimization problems.</li>
                                    <li class="mb-2">To learn backtracking algorithms and maximum flow networks.</li>
                                    <li class="mb-2">To learn dynamic programming methods and complexity calculation.</li>
                                    <li>To understand and implement string pattern matching algorithms.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-success">
                                <i class="bi bi-check2-circle me-2"></i>Lab Outcomes (Bloom's Taxonomy)
                            </div>
                            <div class="card-body">
                                <ul class="small mb-0 ps-3">
                                    <li class="mb-2"><strong>LO1:</strong> Understand methods for analysis of algorithms and solve recurrence problems (L1, L2).</li>
                                    <li class="mb-2"><strong>LO2:</strong> Choose appropriate advanced data structures for a given problem and calculate complexity (L2, L3, L4).</li>
                                    <li class="mb-2"><strong>LO3:</strong> Analyze the greedy programming technique to solve optimization problems (L2, L3, L4, L5).</li>
                                    <li class="mb-2"><strong>LO4:</strong> Evaluate and analyze backtracking algorithms and maximum flow networks (L2, L3, L4, L5).</li>
                                    <li class="mb-2"><strong>LO5:</strong> Analyze the dynamic programming technique to solve complex subproblems (L2, L3, L4, L5).</li>
                                    <li><strong>LO6:</strong> Select and implement a proper pattern matching algorithm for a given problem (L3, L4, L5).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Hardware & Software Requirements Banner -->
                <div class="alert alert-info border-0 shadow-sm d-flex align-items-center mb-4 py-2">
                    <i class="bi bi-hdd-network fs-4 me-3 text-primary"></i>
                    <div>
                        <strong class="text-primary">Environment Requirements:</strong>
                        <span class="ms-2 small"><strong>Hardware:</strong> PC with Intel Core i3 processor &amp; above | <strong>Software:</strong> Turbo / Borland / GCC C++ Compiler, Code::Blocks or Visual Studio Code with C/C++ Extensions.</span>
                    </div>
                </div>

                <!-- Suggested List of Practical (All 22 Experiments) -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="text-primary fw-bold mb-0"><i class="bi bi-list-check me-2"></i>Detailed Suggested List of Practicals (22 Experiments)</h5>
                    <span class="badge bg-primary">Modules I - VI</span>
                </div>
                <div class="table-responsive mb-4">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th style="width: 8%;">Module</th>
                                <th style="width: 22%;">Name of Module</th>
                                <th>Suggested List of Practical Experiments</th>
                                <th style="width: 8%;">Hours</th>
                                <th style="width: 10%;">LO Mapping</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center fw-bold">I</td>
                                <td class="fw-bold">Introduction to Analysis of Algorithms</td>
                                <td>
                                    1. Implement Merge sort and Quicksort for the given list of integer values and find space and time complexity.<br>
                                    2. Implementation of randomized quicksort algorithm and find space and time complexity.<br>
                                    3. Implementation of hash functions and its associated algorithms.
                                </td>
                                <td class="text-center">04</td>
                                <td class="text-center"><span class="badge bg-primary">LO1</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">II</td>
                                <td class="fw-bold">Advanced Data Structures</td>
                                <td>
                                    4. Construct Binary Search Tree for given sequence of integers and perform Pre-order, In-order and Post-order traversal of constructed tree. Analyze complexities.<br>
                                    5. Implement Insert, Delete, Search and Display operations on Binary Search Tree and analyze space and time complexity.<br>
                                    6. Implementation of operations on B/B+-trees.
                                </td>
                                <td class="text-center">05</td>
                                <td class="text-center"><span class="badge bg-primary">LO2</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">III</td>
                                <td class="fw-bold">Greedy algorithms and Applications</td>
                                <td>
                                    7. Implement solution for a 0-1 knapsack problem using dynamic programming.<br>
                                    8. Implement Prim's and Kruskal's algorithms for Minimum Spanning Trees.<br>
                                    9. Implement solution for job sequencing with deadlines problems.
                                </td>
                                <td class="text-center">05</td>
                                <td class="text-center"><span class="badge bg-primary">LO3</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">IV</td>
                                <td class="fw-bold">Backtracking and Maximum flow Networks</td>
                                <td>
                                    10. Implement N-Queen's problem using Back Tracking.<br>
                                    11. Implement Sum of subsets problem for a given set of distinct numbers using backtracking.<br>
                                    12. Implement graph coloring problem.<br>
                                    13. Implement Hamiltonian cycles.<br>
                                    14. Implementation of Ford-Fulkerson algorithm for maximum flow networks.
                                </td>
                                <td class="text-center">04</td>
                                <td class="text-center"><span class="badge bg-primary">LO4</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">V</td>
                                <td class="fw-bold">Dynamic Algorithms</td>
                                <td>
                                    15. Implementation of Bellman-Ford algorithm for single-source shortest path.<br>
                                    16. Implement Floyd Warshall Algorithm for all-pairs shortest paths.<br>
                                    17. Implement Travelling salesman problem using dynamic programming.
                                </td>
                                <td class="text-center">04</td>
                                <td class="text-center"><span class="badge bg-primary">LO5</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">VI</td>
                                <td class="fw-bold">String Matching Algorithms</td>
                                <td>
                                    18. Implement Naïve string matching algorithm.<br>
                                    19. Implement Rabin-Karp pattern matching algorithm.<br>
                                    20. Implement Knuth-Morris-Pratt (KMP) algorithm.<br>
                                    21. Implement Longest Common Subsequence (LCS).<br>
                                    22. Implement any one real-world application of string matching (e.g., DNA sequencing search).
                                </td>
                                <td class="text-center">04</td>
                                <td class="text-center"><span class="badge bg-primary">LO6</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Guidelines & Assessment Breakdown -->
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-dark">
                                <i class="bi bi-journal-check me-2 text-primary"></i>Guidelines for Practical Conduction
                            </div>
                            <div class="card-body">
                                <ul class="small mb-3 ps-3">
                                    <li class="mb-2">Term work shall consist of at least <strong>10 to 12 practicals</strong> selected from the suggested list above covering all modules.</li>
                                    <li class="mb-2">Term work Journal must include at least <strong>2 detailed assignments</strong> on complexity analysis and algorithm comparisons.</li>
                                    <li>Continuous evaluation will be maintained per practical session based on algorithm design, code execution, and lab viva.</li>
                                </ul>
                                <h6 class="fw-bold text-secondary small">Text Books and References:</h6>
                                <ol class="small mb-0 ps-3">
                                    <li>Cormen, Leiserson, Rivest, Stein, <em>Introduction to Algorithms</em>, PHI 3rd Edition.</li>
                                    <li>Jon Kleinberg, Éva Tardos, <em>Algorithm Design</em>, Pearson 1st Edition.</li>
                                    <li>Mark Allen Weiss, <em>Data Structures and Algorithm Analysis in C++</em>, Pearson 4th Edition.</li>
                                    <li>Anany Levitin, <em>Introduction to the Design and Analysis of Algorithms</em>, Pearson.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-dark">
                                <i class="bi bi-award me-2 text-success"></i>Evaluation Scheme (50 Marks)
                            </div>
                            <div class="card-body">
                                <h6 class="fw-bold text-warning small">Term Work (TW) - 25 Marks Breakdown:</h6>
                                <ul class="list-group shadow-sm mb-3">
                                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                        <span class="small"><i class="bi bi-code me-2 text-primary"></i>Laboratory Experiments (10-12 minimum)</span>
                                        <span class="badge bg-primary rounded-pill">15 Marks</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                        <span class="small"><i class="bi bi-file-earmark-ruled me-2 text-info"></i>Assignments (Minimum 2)</span>
                                        <span class="badge bg-primary rounded-pill">05 Marks</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                        <span class="small"><i class="bi bi-person-check me-2 text-success"></i>Lab Attendance &amp; Regularity</span>
                                        <span class="badge bg-primary rounded-pill">05 Marks</span>
                                    </li>
                                </ul>
                                <h6 class="fw-bold text-success small">Practical &amp; Oral Exam - 25 Marks:</h6>
                                <p class="small text-muted mb-0">An Oral &amp; Practical examination of 25 marks will be conducted jointly by internal and external examiners based on the laboratory practical syllabus.</p>
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

function getSqlLabModal() {
  return `<!-- SQL Lab Modal -->
<div class="modal fade" id="sqlLabModal" tabindex="-1" aria-labelledby="sqlLabModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header text-white" style="background-color: #0f2744;">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-primary bg-opacity-25 rounded p-2 text-white">
                        <i class="bi bi-database-fill-gear fs-3"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold mb-0" id="sqlLabModalLabel">Course 2343116: Database Management System &amp; Application Lab (SQL Lab)</h5>
                        <small class="text-light opacity-75">S.E. Information Technology • Semester III • Academic Year 2026-27 • In-Charge: <strong class="text-warning">Prof. Shital Agarwal</strong></small>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <!-- Lab Scheme Highlights -->
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Teaching Scheme</div>
                            <div class="fs-5 fw-bold text-dark mt-1">Practical: 02 Hrs/Wk</div>
                            <small class="text-muted">2 Contact Hours / Week</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Credits Assigned</div>
                            <div class="fs-5 fw-bold text-primary mt-1">01 Credit</div>
                            <small class="text-muted">Practical Lab Credit</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Term Work</div>
                            <div class="fs-5 fw-bold text-warning mt-1">25 Marks</div>
                            <small class="text-muted">15 Exp + 5 Case Study + 5 Att</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="p-3 border rounded bg-light text-center h-100 shadow-sm">
                            <div class="text-muted small text-uppercase fw-bold">Practical &amp; Oral Exam</div>
                            <div class="fs-5 fw-bold text-success mt-1">25 Marks</div>
                            <small class="text-muted">Total: 50 Marks (Lab)</small>
                        </div>
                    </div>
                </div>

                <!-- Lab Objectives & Lab Outcomes -->
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-primary">
                                <i class="bi bi-bullseye me-2"></i>Lab Objectives
                            </div>
                            <div class="card-body">
                                <ul class="small mb-0 ps-3">
                                    <li class="mb-2">To identify and define problem statements for real life applications.</li>
                                    <li class="mb-2">To construct conceptual data models (ER/EER) for real life applications.</li>
                                    <li class="mb-2">To Build Relational Model from ER/EER and demonstrate usage of relational algebra.</li>
                                    <li class="mb-2">To Apply SQL to store, manipulate, and retrieve data efficiently.</li>
                                    <li class="mb-2">To implement database connectivity using Java Database Connectivity (JDBC).</li>
                                    <li>To understand concepts of transaction processing, concurrency control, and recovery procedures.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-success">
                                <i class="bi bi-check2-circle me-2"></i>Lab Outcomes (Bloom's Taxonomy)
                            </div>
                            <div class="card-body">
                                <ul class="small mb-0 ps-3">
                                    <li class="mb-2"><strong>LO1:</strong> Define problem statement and Construct the conceptual model for real life application (L1, L3, L4, L6).</li>
                                    <li class="mb-2"><strong>LO2:</strong> Create and populate a Relational Database Management System using SQL (L3, L4).</li>
                                    <li class="mb-2"><strong>LO3:</strong> Formulate and write SQL queries for efficient information retrieval (L3, L4).</li>
                                    <li class="mb-2"><strong>LO4:</strong> Apply views, triggers and procedures to demonstrate specific event handling (L1, L3, L4).</li>
                                    <li class="mb-2"><strong>LO5:</strong> Demonstrate database connectivity using JDBC in an application (L3).</li>
                                    <li><strong>LO6:</strong> Demonstrate the concept of concurrent transactions and locking techniques (L3, L4).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Prerequisite & Environment Requirements -->
                <div class="alert alert-info border-0 shadow-sm d-flex align-items-center mb-4 py-2">
                    <i class="bi bi-cpu fs-4 me-3 text-primary"></i>
                    <div>
                        <strong class="text-primary">Prerequisite:</strong> C and Python Programming.<br>
                        <span class="small"><strong>Hardware:</strong> PC with Intel Core i3 processor &amp; above | <strong>Software:</strong> Any SQL Compiler (MySQL 8.0+ / Oracle 11g/19c / PostgreSQL), Python / Java JDK for JDBC programming.</span>
                    </div>
                </div>

                <!-- Detailed Experiment List (All 12 Experiments) -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="text-primary fw-bold mb-0"><i class="bi bi-table me-2"></i>Prescribed Experiment List (12 Experiments)</h5>
                    <span class="badge bg-primary">Full Practical Syllabus</span>
                </div>
                <div class="table-responsive mb-4">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th style="width: 8%;" class="text-center">Sr. No.</th>
                                <th>Experiment Description</th>
                                <th style="width: 10%;" class="text-center">Hours</th>
                                <th style="width: 15%;" class="text-center">LO Mapping</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center fw-bold">1</td>
                                <td>Identify real world problem and develop the problem statement. Design an Entity-Relationship (ER) / Extended Entity-Relationship (EER) Model.</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO1</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">2</td>
                                <td>Mapping ER/EER model to Relational schema model with normalization considerations.</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO1</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">3</td>
                                <td>Create a database using DDL commands (CREATE, ALTER, DROP) and apply integrity constraints (Primary Key, Foreign Key, UNIQUE, NOT NULL, CHECK).</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO2, LO3</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">4</td>
                                <td>Perform data manipulation operations (DML - INSERT, UPDATE, DELETE) on populated database tables.</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO3</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">5</td>
                                <td>Perform Authorization using Data Control Language (GRANT and REVOKE permissions to different users/roles).</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO2, LO3</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">6</td>
                                <td>Implement Basic and complex SQL queries (Joins: Inner, Outer, Cross; Aggregate functions, GROUP BY, HAVING, Nested subqueries, Correlated subqueries).</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO3, LO4</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">7</td>
                                <td>Implementation of Views and Triggers for automated event handling and auditing.</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO4</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">8</td>
                                <td>Demonstrate database connectivity using Java Database Connectivity (JDBC) or Python DB-API for CRUD application operations.</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO5</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">9</td>
                                <td>Execute Transaction Control Language (TCL) commands: COMMIT, ROLLBACK, and SAVEPOINT.</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO4</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">10</td>
                                <td>Implement stored functions and stored procedures in PL/SQL / SQL with input/output parameters.</td>
                                <td class="text-center">02</td>
                                <td class="text-center"><span class="badge bg-primary">LO3, LO4</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">11</td>
                                <td>Implementation of Cursors (Implicit and Explicit cursors, Cursor FOR loops) for row-by-row query processing.</td>
                                <td class="text-center">03</td>
                                <td class="text-center"><span class="badge bg-primary">LO3, LO4</span></td>
                            </tr>
                            <tr>
                                <td class="text-center fw-bold">12</td>
                                <td>Implementation and demonstration of Transaction and Concurrency control techniques using shared and exclusive locks.</td>
                                <td class="text-center">03</td>
                                <td class="text-center"><span class="badge bg-primary">LO6</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Guidelines & Evaluation Scheme -->
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-dark">
                                <i class="bi bi-file-earmark-person me-2 text-primary"></i>Guidelines for Conduction of Practicals
                            </div>
                            <div class="card-body">
                                <div class="alert alert-warning border-0 small mb-3">
                                    <strong>Real-World Case Study:</strong> Faculty will assign one real-world case study or application to a <strong>group of 3 students</strong>, and each group is to perform the above list of experiments and apply them to their assigned case study.
                                </div>
                                <ul class="small mb-3 ps-3">
                                    <li class="mb-2">Learner must prepare a comprehensive <strong>Journal</strong> of the above experiment list along with a detailed report of their assigned case study/application.</li>
                                    <li>Term work shall consist of at least 10-12 practicals based on the above list.</li>
                                </ul>
                                <h6 class="fw-bold text-secondary small">Text Books &amp; References:</h6>
                                <ol class="small mb-0 ps-3">
                                    <li>Korth, Silberschatz, Sudarshan, <em>Database System Concepts</em>, 6th Edition, McGraw Hill.</li>
                                    <li>Elmasri and Navathe, <em>Fundamentals of Database Systems</em>, 6th Edition, Pearson.</li>
                                    <li>Raghu Ramakrishnan and Johannes Gehrke, <em>Database Management Systems</em>, TMH.</li>
                                    <li>Peter Rob and Carlos Coronel, <em>Database Systems Design, Implementation and Management</em>, 9th Edition.</li>
                                    <li><em>SQL &amp; PL/SQL for Oracle 11g Black Book</em>, Dreamtech Press.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card h-100 border-0 bg-light shadow-sm">
                            <div class="card-header bg-white fw-bold text-dark">
                                <i class="bi bi-award me-2 text-success"></i>Evaluation Scheme (50 Marks)
                            </div>
                            <div class="card-body">
                                <h6 class="fw-bold text-warning small">Term Work (TW) - 25 Marks Breakdown:</h6>
                                <ul class="list-group shadow-sm mb-3">
                                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                        <span class="small"><i class="bi bi-terminal me-2 text-primary"></i>Laboratory Experiments (10-12 minimum)</span>
                                        <span class="badge bg-primary rounded-pill">15 Marks</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                        <span class="small"><i class="bi bi-file-earmark-pdf me-2 text-info"></i>Report of Case Study / Application</span>
                                        <span class="badge bg-primary rounded-pill">05 Marks</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                                        <span class="small"><i class="bi bi-person-check me-2 text-success"></i>Attendance &amp; Regularity</span>
                                        <span class="badge bg-primary rounded-pill">05 Marks</span>
                                    </li>
                                </ul>
                                <h6 class="fw-bold text-success small">Practical &amp; Oral Exam - 25 Marks:</h6>
                                <p class="small text-muted mb-0">An Oral &amp; Practical examination of 25 marks will be held based on the above list of 10-12 Practicals and the assigned Case Study demonstration.</p>
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

module.exports = {
  getMathModal,
  getAutomataModal,
  getOpenElectiveModal,
  getAdsaLabModal,
  getSqlLabModal
};

