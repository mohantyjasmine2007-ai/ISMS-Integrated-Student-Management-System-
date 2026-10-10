# APSIT ISMS — Integrated Student Management System
### Department of Information Technology | SE IT Div B (Semester III)
#### A. P. Shah Institute of Technology, Thane

[![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com/)
[![React 18](https://img.shields.io/badge/React-18.x-blue.svg)](https://react.dev/)
[![Java Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203.2.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Database](https://img.shields.io/badge/Database-MySQL-orange.svg)](https://www.mysql.com/)
[![JavaScript](https://img.shields.io/badge/Frontend-ES6%2B%20Modular-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📌 Overview

**APSIT ISMS (Integrated Student Management System)** is a comprehensive academic portal and LMS designed for the Department of Information Technology at A. P. Shah Institute of Technology. The platform unifies student academic records, syllabus tracking, real-time attendance management, grade book evaluation, academic calendar synchronization, and role-based faculty administration into a single high-performance dashboard.

The frontend is built with a clean **modular architecture** (separate HTML, CSS, JavaScript, and React 18 modules), eliminating monolithic script entanglements while providing interactive features like **What-If Attendance Forecasting** and **Real-Time Faculty Cohort Telemetry**.

---

## 🏛️ System Architecture

```
Project Root
│
├── index.html                  # Unified Login Portal (Student & Faculty Authentication Gateways)
├── dashboard1.html             # Finalized Core Dashboard HTML & Modals
├── dashboard1.css              # Custom CSS Design System, Components & Media Queries
├── dashboard1.js               # Application Logic, DOM Event Listeners & State Binding
├── dashboard1-react.js         # Native React 18 Interactive Telemetry & Forecaster Modules
├── studentsData.js             # Central Data Layer: 70-Student Roster, Faculty Auth & Calendar Events
│
├── backend/                    # Spring Boot 3.2.4 Full-Stack Enterprise Java Backend
│   ├── pom.xml                 # Maven Build Configuration
│   └── src/                    # Spring Boot JPA Controllers, Models & Services
│
├── database_setup.sql          # MySQL Relational Schema & Relational Tables
├── favicon.jpg                 # APSIT Official Favicon
├── apsit.jpg / apsit1.jpg      # Campus Facilities & Infrastructure Visual Assets
└── library.jpg                 # Digital Knowledge Resource Assets
```

---

## ✨ Key Features

### 1. Dual Authentication & Strict Role Isolation
- **Student Authentication**: Login using Moodle ID and secure password (e.g., `25104021` / `25104021@Apsit`).
- **Faculty Authentication**: Login using Faculty Name and secure format `name@Apsit` (e.g., `Puja Chavan` / `Puja Chavan@Apsit`).
- **Role Isolation**: Students have zero access to faculty administration panels. All faculty management routes, buttons, and views are strictly hidden and guarded against unauthorized tampering.
- **Faculty Profile Lock**: Logged-in faculty members are locked to their assigned subject portfolio and cannot impersonate or switch into another faculty member's profile.

### 2. Native React 18 Interactive Modules
- **Student Attendance Compliance & What-If Forecaster**:
  - Automatically assesses Mumbai University / APSIT 75% attendance threshold rules.
  - Interactive simulator allows students to project the mathematical impact of attending or missing upcoming lectures.
  - Dynamically calculates the **Safe Absence Buffer** or exact **Lectures Needed** to regain good standing.
- **Faculty Real-Time Cohort Telemetry & Defaulter Insights**:
  - Live cohort health distribution: **Eligible ($\ge 75\%$)**, **Warning ($60-74\%$)**, and **Critical Defaulters ($< 60\%$)**.
  - Real-time batch average indicator synchronized instantly across class records.

### 3. Faculty In-Charge Academic Tools
- **Attendance Register**: Mark individual present/absent counts for any student.
- **Conducted Lectures Engine**: Increment total conducted hours with a single click (`+1 Lecture (All Present)`), updating records across all 70 students simultaneously.
- **Grade Book & Term Work**: Assign Term Work scores (out of 25/50), semester grades, and submission statuses.
- **Roster Export**: Download live attendance, grade sheets, and contact details as formatted `.csv` spreadsheets.

### 4. 10 Detailed Course & Syllabus Modules
All 10 course modules are mapped directly to official Mumbai University / Autonomous curriculum PDFs, complete with units, topics, lab experiments, reference textbooks, software tools, and evaluation schemes:

| # | Subject Name | Course In-Charge | Key Focus & Lab Experiments |
|---|---|---|---|
| 1 | **Applied Mathematics Thinking-I** | Prof. Puja Chavan | Linear Algebra, Eigenvalues, Vector Spaces, Complex Variables & Numerical Methods |
| 2 | **Advance Data Structure & Analysis** | Dr. Sonia Aneesh | AVL Trees, B/B+ Trees, Dynamic Programming, Greedy Algorithms, Graph Traversals |
| 3 | **Database Management System & Application** | Prof. Shital Agarwal | Relational Algebra, ER Modeling, Normalization (1NF–BCNF), Transactions & ACID Properties |
| 4 | **Automata Theory** | Prof. Charul Singh | Regular Expressions, DFA/NFA, Context-Free Grammars, Pushdown Automata, Turing Machines |
| 5 | **Open Elective** | Prof. Anupama Singh | Emerging Interdisciplinary Computing & Application Frameworks |
| 6 | **ADSA Lab** | Prof. Anupama Singh | Practical Implementations of Advanced Data Structures & Algorithm Complexity Profiling |
| 7 | **SQL Lab** | Prof. Shital Agarwal | Complex SQL Queries, Joins, Triggers, Stored Procedures, Indexing & Views |
| 8 | **Mini-Project - Full Stack Java Programming** | Prof. Mandar Ganjapurkar | Spring Boot REST APIs, Hibernate/JPA, JDBC, Servlet Architecture & Frontend Integration |
| 9 | **Entrepreneurship Development** | Prof. Randeep Kaur Kahlon | Business Model Canvas, Pitch Decks, Venture Capital, Market Research & Startup Lifecycle |
| 10 | **Environmental Science** | Prof. Pranali Vhora | Ecological Systems, Sustainability, Environmental Impact Assessments & Renewable Resources |

### 5. Academic Calendar & Dynamic Notifications
- Dynamic notifications bar synced with official academic events (Orientation, Unit Tests, Hackathons, Project Reviews, Term End Exams).
- Full interactive monthly calendar with color-coded categories (Exams, Submissions, Holidays, Co-Curricular).

---

## 🔑 Login Credentials Reference

### Student Credentials (SE IT Div B Sample Accounts)
| Moodle ID | Student Name | Roll No | Password | Overall Attendance |
|---|---|---|---|---|
| `25104021` | Jasmine Mohanty | `IT-2026-38` | `25104021@Apsit` | 90% (Safe & Eligible) |
| `25104023` | Yash Shrikant Mahajan | `IT-2026-40` | `25104023@Apsit` | 89% (Safe & Eligible) |
| `24104068` | Rohan Sharad Pawar | `IT-2026-01` | `24104068@Apsit` | 64% (Warning / Defaulter) |

*(Supports all 70 students enrolled in the class roster within `studentsData.js`)*

### Faculty Credentials (Subject In-Charges)
| Faculty In-Charge | Assigned Course | Username | Password Format |
|---|---|---|---|
| **Prof. Puja Chavan** | Applied Mathematics Thinking-I | `Puja Chavan` | `Puja Chavan@Apsit` (or `Puja@Apsit`) |
| **Dr. Sonia Aneesh** | Advance Data Structure & Analysis | `Sonia Aneesh` | `Sonia Aneesh@Apsit` (or `Sonia@Apsit`) |
| **Prof. Shital Agarwal** | DBMS & Application / SQL Lab | `Shital Agarwal` | `Shital Agarwal@Apsit` (or `Shital@Apsit`) |
| **Prof. Charul Singh** | Automata Theory | `Charul Singh` | `Charul Singh@Apsit` (or `Charul@Apsit`) |
| **Prof. Anupama Singh** | Open Elective / ADSA Lab | `Anupama Singh` | `Anupama Singh@Apsit` (or `Anupama@Apsit`) |
| **Prof. Mandar Ganjapurkar** | Mini-Project (Java Full Stack) | `Mandar Ganjapurkar` | `Mandar Ganjapurkar@Apsit` (or `Mandar@Apsit`) |
| **Prof. Randeep Kaur Kahlon** | Entrepreneurship Development | `Randeep Kaur Kahlon` | `Randeep Kaur Kahlon@Apsit` (or `Randeep@Apsit`) |
| **Prof. Pranali Vhora** | Environmental Science | `Pranali Vhora` | `Pranali Vhora@Apsit` (or `Pranali@Apsit`) |

---

## 🚀 Getting Started & Execution

### Option 1: Direct Browser Launch
Simply double-click or open **`index.html`** in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Run with Local Node.js Server
To test using a local development server on port 3000:

```bash
# 1. Start the included lightweight Node.js HTTP server
node scratch/server.js

# 2. Open in your browser
http://localhost:3000/index.html
```

### Option 3: Backend & Database Setup (Optional Enterprise Service)
1. Import `database_setup.sql` into MySQL Server:
   ```bash
   mysql -u root -p < database_setup.sql
   ```
2. Build and launch the Spring Boot service:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

---

## 🛠️ Technology Stack

- **Markup & Layout**: HTML5 (Semantic Structure, Modals, Breadcrumbs)
- **Styling**: Bootstrap 5.3.8, Bootstrap Icons 1.13.1, Custom Vanilla CSS (`dashboard1.css`)
- **Typography**: Plus Jakarta Sans, Inter, system sans-serif fonts
- **Logic & Storage**: Vanilla JavaScript ES6+, LocalStorage / SessionStorage Persistence (`dashboard1.js`)
- **Reactive UI**: React 18 & ReactDOM Engine (`dashboard1-react.js`)
- **Backend Framework**: Java 17, Spring Boot 3.2.4 (REST API, JPA Hibernate)
- **Database**: MySQL Relational Database
- **Automation & Quality**: Puppeteer-Core test suite

---

## 📄 License & Attribution

Designed and developed for academic excellence at **A. P. Shah Institute of Technology (APSIT)**, Thane.  
All curriculum materials, course codes, and lab structures follow the University of Mumbai / Autonomous Department of Information Technology guidelines.
