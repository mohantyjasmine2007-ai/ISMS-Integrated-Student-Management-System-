const fs = require('fs');

let content = fs.readFileSync('dashboard1.html', 'utf8');
console.log('Original content length:', content.length);

// 1. Verify and replace <style> block
const styleStartStr = '    <!-- Custom CSS Styles -->\n    <style>';
const styleEndStr = '        .id-card .sign-label {\n            font-size: 10px;\n            color: #7c8ba3;\n            text-transform: uppercase;\n            letter-spacing: 1px;\n            font-weight: 600;\n        }\n    </style>';

const styleStartIdx = content.indexOf(styleStartStr);
const styleEndIdx = content.indexOf(styleEndStr);

console.log('styleStartIdx:', styleStartIdx, 'styleEndIdx:', styleEndIdx);
if (styleStartIdx === -1 || styleEndIdx === -1) {
  console.error('Failed to locate <style> block precisely');
  process.exit(1);
}

const replacementHead = `    <!-- Custom CSS Stylesheet -->
    <link rel="stylesheet" href="dashboard1.css">

    <!-- React 18 & ReactDOM CDN -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>`;

const afterStyle = content.substring(0, styleStartIdx) + replacementHead + content.substring(styleEndIdx + styleEndStr.length);

// 2. Add React forecaster root in #dashboard-view
const welcomeCardTarget = `<div class="card welcome-card mb-4 shadow-sm border-0">`;
const welcomeCardIdx = afterStyle.indexOf(welcomeCardTarget);
console.log('welcomeCardIdx:', welcomeCardIdx);
if (welcomeCardIdx === -1) {
  console.error('Failed to locate welcome card');
  process.exit(1);
}

const welcomeCardClose = `                                </div>\n                            </div>\n                        </div>\n                    </div>`;
const welcomeCardCloseIdx = afterStyle.indexOf(welcomeCardClose, welcomeCardIdx);
console.log('welcomeCardCloseIdx:', welcomeCardCloseIdx);
if (welcomeCardCloseIdx === -1) {
  console.error('Failed to locate welcome card close');
  process.exit(1);
}

const forecasterMount = `\n\n                    <!-- React Student Attendance Compliance & What-If Forecaster -->\n                    <div id="react-attendance-forecaster-root" class="mb-4"></div>`;
const afterForecaster = afterStyle.substring(0, welcomeCardCloseIdx + welcomeCardClose.length) + forecasterMount + afterStyle.substring(welcomeCardCloseIdx + welcomeCardClose.length);

// 3. Add React faculty insights root in #faculty-view
const facHeaderTarget = `<!-- Faculty Action & Statistics Row -->`;
const facHeaderIdx = afterForecaster.indexOf(facHeaderTarget);
console.log('facHeaderIdx:', facHeaderIdx);
if (facHeaderIdx === -1) {
  console.error('Failed to locate faculty action row');
  process.exit(1);
}

const facultyInsightsMount = `<!-- React Faculty Cohort Real-Time Telemetry & Defaulter Insights -->\n                    <div id="react-faculty-insights-root" class="mb-4"></div>\n\n                    `;
const afterFacultyInsights = afterForecaster.substring(0, facHeaderIdx) + facultyInsightsMount + afterForecaster.substring(facHeaderIdx);

// 4. Replace inline <script> block with external scripts
const scriptStartStr = `<!-- Scripts -->\n<script src="studentsData.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>\n\n<script>`;
const scriptStartIdx = afterFacultyInsights.indexOf(scriptStartStr);
console.log('scriptStartIdx:', scriptStartIdx);
if (scriptStartIdx === -1) {
  console.error('Failed to locate scriptStartStr');
  process.exit(1);
}

const scriptEndStr = `        a.download = \`APSIT_\${activeFacultyObj.subjectKey}_Roster.csv\`;\n        a.click();\n    }\n</script>`;
const scriptEndIdx = afterFacultyInsights.indexOf(scriptEndStr);
console.log('scriptEndIdx:', scriptEndIdx);
if (scriptEndIdx === -1) {
  console.error('Failed to locate scriptEndStr');
  process.exit(1);
}

const replacementScripts = `<!-- Core Data & Framework Scripts -->
<script src="studentsData.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<!-- Application JavaScript Logic -->
<script src="dashboard1.js"></script>

<!-- React Interactive Components -->
<script src="dashboard1-react.js"></script>`;

const finalContent = afterFacultyInsights.substring(0, scriptStartIdx) + replacementScripts + afterFacultyInsights.substring(scriptEndIdx + scriptEndStr.length);

console.log('Final content length:', finalContent.length);

// Write to dashboard1.html
fs.writeFileSync('dashboard1.html', finalContent, 'utf8');
console.log('Successfully updated dashboard1.html!');
