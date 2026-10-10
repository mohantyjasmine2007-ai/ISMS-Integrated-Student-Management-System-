-- =============================================================
-- APSIT Integrated Student Management System (ISMS)
-- Database Schema & Seed Data for SE IT Div B
-- Academic Year 2026-27 | Semester III
-- =============================================================

CREATE DATABASE IF NOT EXISTS apsit_isms;
USE apsit_isms;

-- Drop tables if they exist
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS experiments;
DROP TABLE IF EXISTS syllabus_modules;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

-- -------------------------------------------------------------
-- 1. Students Table
-- -------------------------------------------------------------
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    moodle_id VARCHAR(20) NOT NULL UNIQUE,
    roll_no VARCHAR(20) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    department VARCHAR(50) DEFAULT 'Information Technology',
    division VARCHAR(5) DEFAULT 'B',
    class_year VARCHAR(20) DEFAULT 'S.E.',
    semester INT DEFAULT 3,
    academic_year VARCHAR(20) DEFAULT '2026-27',
    dob VARCHAR(15),
    blood_group VARCHAR(10),
    contact VARCHAR(20),
    password_hash VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------
-- 2. Attendance Table
-- -------------------------------------------------------------
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    moodle_id VARCHAR(20) NOT NULL,
    amt1_attended INT DEFAULT 0,
    amt1_pct INT DEFAULT 0,
    adsa_attended INT DEFAULT 0,
    adsa_pct INT DEFAULT 0,
    dbms_attended INT DEFAULT 0,
    dbms_pct INT DEFAULT 0,
    at_attended INT DEFAULT 0,
    at_pct INT DEFAULT 0,
    oe_attended INT DEFAULT 0,
    oe_pct INT DEFAULT 0,
    fsjp_attended INT DEFAULT 0,
    fsjp_pct INT DEFAULT 0,
    evs_attended INT DEFAULT 0,
    evs_pct INT DEFAULT 0,
    ed_attended INT DEFAULT 0,
    ed_pct INT DEFAULT 0,
    mentoring_attended INT DEFAULT 0,
    mentoring_pct INT DEFAULT 0,
    theory_total_attended INT DEFAULT 0,
    theory_total_pct INT DEFAULT 0,
    practical_avg_pct INT DEFAULT 0,
    overall_pct INT DEFAULT 0,
    is_defaulter BOOLEAN GENERATED ALWAYS AS (overall_pct < 75) STORED,
    FOREIGN KEY (moodle_id) REFERENCES students(moodle_id) ON DELETE CASCADE
);

-- -------------------------------------------------------------
-- 3. Courses Table
-- -------------------------------------------------------------
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) DEFAULT 'Information Technology',
    semester INT DEFAULT 3,
    credits INT DEFAULT 2,
    theory_hours INT DEFAULT 0,
    practical_hours INT DEFAULT 2,
    term_work_marks INT DEFAULT 50,
    oral_practical_marks INT DEFAULT 0
);

-- -------------------------------------------------------------
-- 4. Syllabus Modules Table
-- -------------------------------------------------------------
CREATE TABLE syllabus_modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,
    module_number VARCHAR(10) NOT NULL,
    module_title VARCHAR(150) NOT NULL,
    detailed_content TEXT NOT NULL,
    teaching_hours INT NOT NULL,
    lo_mapping VARCHAR(20),
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
);

-- -------------------------------------------------------------
-- 5. Course Experiments Table
-- -------------------------------------------------------------
CREATE TABLE experiments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,
    exp_number INT NOT NULL,
    exp_title TEXT NOT NULL,
    hours INT DEFAULT 2,
    lab_outcome VARCHAR(20),
    FOREIGN KEY (course_code) REFERENCES courses(course_code) ON DELETE CASCADE
);

-- -------------------------------------------------------------
-- Insert Course Records
-- -------------------------------------------------------------
INSERT INTO courses (course_code, course_name, credits, term_work_marks) VALUES
('2993511', 'Entrepreneurship Development', 2, 50),
('2993512', 'Environmental Science', 2, 50),
('ITC301', 'Applied Mathematics Thinking-I', 3, 25),
('ITC302', 'Advance Data Structure & Analysis', 3, 25),
('ITC303', 'Database Management System & Application', 3, 25),
('ITC304', 'Automata Theory', 3, 25),
('ITC305', 'Open Elective (Banking)', 2, 25),
('ITL301', 'Mini-Project - Full Stack Java Programming', 2, 50);

-- -------------------------------------------------------------
-- Insert Entrepreneurship Development Syllabus Modules
-- -------------------------------------------------------------
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993511', '0', 'Prerequisite', 'Fundamentals of communication and leadership skills.', 1, '--');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993511', 'I', 'Introduction to Entrepreneurship', 'Definition, Characteristics, and Types of Entrepreneurs. Entrepreneurial Motivation and Traits. Start-up Ecosystem in India. Challenges in Entrepreneurship.', 2, 'LO1');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993511', 'II', 'Business Idea Generation & Validation', 'Ideation Techniques: Design Thinking, Brainstorming, Mind Mapping. Business Model Canvas (BMC). Market Research & Customer Validation. Minimum Viable Product (MVP) Concept.', 4, 'LO2');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993511', 'III', 'Business Planning & Strategy', 'Writing a Business Plan. SWOT Analysis and Competitive Analysis. Financial Planning and Budgeting. Risk Assessment and Management.', 4, 'LO3');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993511', 'IV', 'Funding and Legal Framework', 'Sources of Funding: Bootstrapping, Angel Investors, Venture Capital. Government Schemes & Start-up India Initiatives. Business Registration & Legal Formalities. Intellectual Property Rights (IPR) & Patents.', 5, 'LO4');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993511', 'V', 'Marketing & Digital Presence', 'Branding and Digital Marketing. Social Media Marketing & SEO. Customer Relationship Management (CRM). E-commerce & Online Business Models.', 5, 'LO5');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993511', 'VI', 'Business Pitching & Prototype Development', 'Pitch Deck Preparation & Presentation Techniques. Prototyping with Open-source Tools. Elevator Pitch & Investor Pitch. Case Studies of Successful Start-ups.', 5, 'LO6');

-- -------------------------------------------------------------
-- Insert Environmental Science Syllabus Modules
-- -------------------------------------------------------------
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993512', 'I', 'The Multidisciplinary Nature of Environmental Studies', 'Definition, scope and importance. Need for public awareness, Role of information technology in environment and human health. Human population and the environment: Population growth, variation among nations. Population Explosion- family welfare program. Environment and human health. Women and child welfare.', 3, 'LO1');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993512', 'II', 'Natural Resources', 'Renewable and non-renewable resources. Natural resources & associated problems: a) Forest resources, b) Water resources, c) Mineral resources, d) Food resources, e) Energy resources: Role of an individual in conservation of natural resources, f) Equitable use of resources for sustainable lifestyles.', 4, 'LO2');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993512', 'III', 'Ecosystems', 'Concepts of an ecosystem. Introduction, types, characteristic features, structure and function of the following ecosystem: a. Forest ecosystem, b. Grassland ecosystem, c. Desert ecosystem, d. Aquatic ecosystem (ponds, streams, lakes, rivers, oceans, estuaries). Case study on various ecosystems in India.', 5, 'LO3');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993512', 'IV', 'Biodiversity and its Conservation', 'Introduction-Definition: genetic species and ecosystem diversity. Bio-geographical classification of India. Value of biodiversity: Consumptive use, productive use, social, ethical, aesthetic and option values, Bio-diversity at global, national, local levels. India as a mega diversity nation. Case study on Bio diversity in India.', 5, 'LO4');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993512', 'V', 'Environmental Pollution', 'Definition. Causes, effects and control measures of: a) Air pollution, b) Water pollution, c) Soil pollution. Solid waste management: Causes, effect and control measures of urban and industrial wastes. Role of an individual in prevention of pollution, Case study on Pollution. Disaster management: floods, earthquake, cyclone and landslides. Carbon Credits for pollution prevention.', 5, 'LO5');
INSERT INTO syllabus_modules (course_code, module_number, module_title, detailed_content, teaching_hours, lo_mapping) VALUES ('2993512', 'VI', 'Social Issues and Environment', 'From unsustainable to sustainable development. Urban problems related to energy, Water conservation, rain water harvesting, watershed management. Environmental ethics: issues and possible solution. Climate change, global warming, acid rain, ozone layer depletion, nuclear accidents and holocaust. Case studies. Consumerism and waste products. Environment protection act. Public awareness. Case study on Environmental Ethics.', 4, 'LO6');

-- -------------------------------------------------------------
-- Insert Entrepreneurship Development Experiments
-- -------------------------------------------------------------
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 1, 'Business Idea Generation using Mind Mapping.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 2, 'Conducting Market Research & Customer Validation.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 3, 'Preparing a Business Model Canvas for a Startup Idea.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 4, 'Developing a Financial Plan & Break-even Analysis.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 5, 'Creating a Website using WordPress/Wix.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 6, 'Social Media Marketing Campaign using Open-source Tools.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 7, 'Digital Prototyping using Figma/Inkscape.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 8, 'Business Pitch Deck Preparation & Presentation.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 9, 'Exploring Government Schemes for Startups.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993511', 10, 'Legal Compliance & IPR Basics (Case Study).', 2);

-- -------------------------------------------------------------
-- Insert Environmental Science Experiments
-- -------------------------------------------------------------
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 1, 'Study of Environmental Components and Ecosystems.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 2, 'Visit and Report on Solid Waste Management Plant.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 3, 'Study of Renewable Energy Sources (Solar, Wind, Biogas).', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 4, 'Analysis of Air and Water Quality Parameters.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 5, 'Study of Local Biodiversity and Conservation Methods.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 6, 'Awareness Activity on Environmental Issues.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 7, 'Rainwater Harvesting System Design.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 8, 'Case Study on Environmental Pollution & Control Measures.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 9, 'Report on Climate Change Impact and Adaptation.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 10, 'Study of Environmental Laws and Acts.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 11, 'Study of Disaster Management Techniques.', 2);
INSERT INTO experiments (course_code, exp_number, exp_title, hours) VALUES ('2993512', 12, 'Report on Role of IT in Environmental Protection.', 2);

-- -------------------------------------------------------------
-- Insert 70 SE IT Div B Students
-- -------------------------------------------------------------
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104023', 'IT-2026-01', 'NILANCHAL SUNILKUMAR JENA', 'NILANCHAL', '08/04/2007', 'A+', '+91 980135791', '25104023@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104155', 'IT-2026-02', 'AJAY MADHUKAR JOSHI', 'AJAY', '15/07/2007', 'B+', '+91 980271582', '25104155@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104028', 'IT-2026-03', 'SRUSHTI SANTOSH KADAM', 'SRUSHTI', '22/10/2007', 'AB+', '+91 980407373', '25104028@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104164', 'IT-2026-04', 'TVISHA PANKAJ KADAM', 'TVISHA', '01/01/2007', 'O-', '+91 980543164', '25104164@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104138', 'IT-2026-05', 'ARYAN PRAVIN KALE', 'ARYAN', '08/04/2007', 'A-', '+91 980678955', '25104138@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104151', 'IT-2026-06', 'OM SANJAY KALE', 'OM', '15/07/2007', 'B-', '+91 980814746', '25104151@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104188', 'IT-2026-07', 'SOHAM ABHAY KALE', 'SOHAM', '22/10/2007', 'O+', '+91 980950537', '25104188@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104065', 'IT-2026-08', 'ARCHITA SANTOSH KAMBLE', 'ARCHITA', '01/01/2007', 'A+', '+91 981086328', '25104065@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104207', 'IT-2026-09', 'ASHISH ASHOK KAPADI', 'ASHISH', '08/04/2007', 'B+', '+91 981222119', '25104207@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104067', 'IT-2026-10', 'MANTHAN VINOD KARANDE', 'MANTHAN', '15/07/2007', 'AB+', '+91 981357910', '25104067@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104089', 'IT-2026-11', 'SNEHA CHANDRAKESH KESARWANI', 'SNEHA', '22/10/2007', 'O-', '+91 981493701', '25104089@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104002', 'IT-2026-12', 'RUJUL RAJENDRAKUM KHAIRNAR', 'RUJUL', '01/01/2007', 'A-', '+91 981629492', '25104002@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104012', 'IT-2026-13', 'UTKARSH NITIN KHAIRNAR', 'UTKARSH', '08/04/2007', 'B-', '+91 981765283', '25104012@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104035', 'IT-2026-14', 'MOHD ADEEL MOHD AZAM KHAN', 'MOHD', '15/07/2007', 'O+', '+91 981901074', '25104035@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104017', 'IT-2026-15', 'NISHTHA DINESH KHANVILKAR', 'NISHTHA', '22/10/2007', 'A+', '+91 982036865', '25104017@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104060', 'IT-2026-16', 'MANDAR NIVRUTTI KOLHE', 'MANDAR', '01/01/2007', 'B+', '+91 982172656', '25104060@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104015', 'IT-2026-17', 'NIHAL VINOD KORE', 'NIHAL', '08/04/2007', 'AB+', '+91 982308447', '25104015@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104167', 'IT-2026-18', 'SUMIT ROHITASH KUMAVAT', 'SUMIT', '15/07/2007', 'O-', '+91 982444238', '25104167@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104075', 'IT-2026-19', 'SWARA CHANDRAKANTKURLE', 'SWARA', '22/10/2007', 'A-', '+91 982580029', '25104075@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104041', 'IT-2026-20', 'AARUSH AJAY LAD', 'AARUSH', '01/01/2007', 'B-', '+91 982715820', '25104041@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104200', 'IT-2026-21', 'JAY RAMDAS LONE', 'JAY', '08/04/2007', 'O+', '+91 982851611', '25104200@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104156', 'IT-2026-22', 'SOHAM AVINASH MAHADIK', 'SOHAM', '15/07/2007', 'A+', '+91 982987402', '25104156@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104104', 'IT-2026-23', 'AYUSHI  VINOD MAHAJAN', 'AYUSHI', '22/10/2007', 'B+', '+91 983123193', '25104104@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104009', 'IT-2026-24', 'AYMAN RIZWAN MAHIMKAR', 'AYMAN', '01/01/2007', 'AB+', '+91 983258984', '25104009@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104192', 'IT-2026-25', 'NEHA UTTAM MAITY', 'NEHA', '08/04/2007', 'O-', '+91 983394775', '25104192@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104024', 'IT-2026-26', 'SALONI VIJAY MAKRIYE', 'SALONI', '15/07/2007', 'A-', '+91 983530566', '25104024@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104077', 'IT-2026-27', 'SAHIL SANDESH MALBARI', 'SAHIL', '22/10/2007', 'B-', '+91 983666357', '25104077@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104141', 'IT-2026-28', 'SAKSHI DINESH MANE', 'SAKSHI', '01/01/2007', 'O+', '+91 983802148', '25104141@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104152', 'IT-2026-29', 'SUMAN TARAK MANNA', 'SUMAN', '08/04/2007', 'A+', '+91 983937939', '25104152@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104048', 'IT-2026-30', 'KUNAL KRUSHNA MATE', 'KUNAL', '15/07/2007', 'B+', '+91 984073730', '25104048@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104134', 'IT-2026-31', 'AAKANKSHA SANJAY MATKAR', 'AAKANKSHA', '22/10/2007', 'AB+', '+91 984209521', '25104134@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104063', 'IT-2026-32', 'TOHID SHABBIR MEMON', 'TOHID', '01/01/2007', 'O-', '+91 984345312', '25104063@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104088', 'IT-2026-33', 'MAHI RAMESH MHASKE', 'MAHI', '08/04/2007', 'A-', '+91 984481103', '25104088@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104160', 'IT-2026-34', 'OM MAHENDRA MHASKE', 'OM', '15/07/2007', 'B-', '+91 984616894', '25104160@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104050', 'IT-2026-35', 'ALOK SURESH MHATRE', 'ALOK', '22/10/2007', 'O+', '+91 984752685', '25104050@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104014', 'IT-2026-36', 'SIDDHI DILIP MHATRE', 'SIDDHI', '01/01/2007', 'A+', '+91 984888476', '25104014@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104062', 'IT-2026-37', 'ARYAVART ARUN MISHRA', 'ARYAVART', '08/04/2007', 'B+', '+91 985024267', '25104062@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104021', 'IT-2026-38', 'JASMINI BABULA MOHANTY', 'JASMINI', '30/09/2007', 'O+', '+91 8779432270', '25104021@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104178', 'IT-2026-39', 'PRADUYUM YUVRAJ MOHITE', 'PRADUYUM', '22/10/2007', 'O-', '+91 985295849', '25104178@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104058', 'IT-2026-40', 'MRUNMAYEE MILIND MORE', 'MRUNMAYEE', '01/01/2007', 'A-', '+91 985431640', '25104058@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104081', 'IT-2026-41', 'ADVAIT VISHWAS NAIK', 'ADVAIT', '08/04/2007', 'B-', '+91 985567431', '25104081@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104132', 'IT-2026-42', 'DEVANG RAMBHUSHAN NAPHADE', 'DEVANG', '15/07/2007', 'O+', '+91 985703222', '25104132@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104103', 'IT-2026-43', 'SIDDHARTH MANOJ NIPANE', 'SIDDHARTH', '22/10/2007', 'A+', '+91 985839013', '25104103@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104189', 'IT-2026-44', 'KANISHKA HARENDRA NISHAD', 'KANISHKA', '01/01/2007', 'B+', '+91 985974804', '25104189@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104049', 'IT-2026-45', 'VIKRAM SATYANARAYAPAL', 'VIKRAM', '08/04/2007', 'AB+', '+91 986110595', '25104049@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104211', 'IT-2026-46', 'DEVESH SANTOSH PALKAR', 'DEVESH', '15/07/2007', 'O-', '+91 986246386', '25104211@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104173', 'IT-2026-47', 'PURVIKA VILAS PALODKAR', 'PURVIKA', '22/10/2007', 'A-', '+91 986382177', '25104173@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104191', 'IT-2026-48', 'JANVI RAJESH PANCHAL', 'JANVI', '01/01/2007', 'B-', '+91 986517968', '25104191@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104039', 'IT-2026-49', 'HARSH NEERAJ PANDEY', 'HARSH', '08/04/2007', 'O+', '+91 986653759', '25104039@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104086', 'IT-2026-50', 'SAMARTHA VIRENDRA PANDEY', 'SAMARTHA', '15/07/2007', 'A+', '+91 986789550', '25104086@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104169', 'IT-2026-51', 'ROHIT GAJENDRA PARMAR', 'ROHIT', '22/10/2007', 'B+', '+91 986925341', '25104169@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104010', 'IT-2026-52', 'VEDANT PANDURANG PARTE', 'VEDANT', '01/01/2007', 'AB+', '+91 987061132', '25104010@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104153', 'IT-2026-53', 'ANIKET RAKESH PATHAK', 'ANIKET', '08/04/2007', 'O-', '+91 987196923', '25104153@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104097', 'IT-2026-54', 'ISHAAN VINOD PATIL', 'ISHAAN', '15/07/2007', 'A-', '+91 987332714', '25104097@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104080', 'IT-2026-55', 'PREM ASHOK PATIL', 'PREM', '22/10/2007', 'B-', '+91 987468505', '25104080@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104006', 'IT-2026-56', 'SAKSHI NITIN PATIL', 'SAKSHI', '01/01/2007', 'O+', '+91 987604296', '25104006@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104135', 'IT-2026-57', 'SANSKRUTI JITENDRA PATIL', 'SANSKRUTI', '08/04/2007', 'A+', '+91 987740087', '25104135@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104083', 'IT-2026-58', 'TANVI UDAY PATIL', 'TANVI', '15/07/2007', 'B+', '+91 987875878', '25104083@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104092', 'IT-2026-59', 'VEDANTI RAJENDRA PATIL', 'VEDANTI', '22/10/2007', 'AB+', '+91 988011669', '25104092@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104020', 'IT-2026-60', 'MINAL VILAS PATNE', 'MINAL', '01/01/2007', 'O-', '+91 988147460', '25104020@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104059', 'IT-2026-61', 'YADNIK SHIVAJI PAWAR', 'YADNIK', '08/04/2007', 'A-', '+91 988283251', '25104059@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104054', 'IT-2026-62', 'KIRAN RAJNIKANT PEKE', 'KIRAN', '15/07/2007', 'B-', '+91 988419042', '25104054@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104112', 'IT-2026-63', 'SIDDHI DEEPAK PETKAR', 'SIDDHI', '22/10/2007', 'O+', '+91 988554833', '25104112@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104087', 'IT-2026-64', 'PIYUSH SUBHASH PHATTA', 'PIYUSH', '01/01/2007', 'A+', '+91 988690624', '25104087@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104203', 'IT-2026-65', 'SIDDHANT HEMANT POL', 'SIDDHANT', '08/04/2007', 'B+', '+91 988826415', '25104203@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104186', 'IT-2026-66', 'PRANAY ASHOK PRAJAPATI', 'PRANAY', '15/07/2007', 'AB+', '+91 988962206', '25104186@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104013', 'IT-2026-67', 'PRINCE DIWAKAR PRAJAPATI', 'PRINCE', '22/10/2007', 'O-', '+91 989097997', '25104013@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104026', 'IT-2026-68', 'PRINCE DADHIBAL PRAJAPATI', 'PRINCE', '01/01/2007', 'A-', '+91 989233788', '25104026@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104043', 'IT-2026-69', 'SEEMA INDRAJEET PRAJAPATI', 'SEEMA', '08/04/2007', 'B-', '+91 989369579', '25104043@Apsit');
INSERT INTO students (moodle_id, roll_no, full_name, first_name, dob, blood_group, contact, password_hash) VALUES ('25104046', 'IT-2026-70', 'VEDANT SANJAY RANE', 'VEDANT', '15/07/2007', 'O+', '+91 989505370', '25104046@Apsit');

-- -------------------------------------------------------------
-- Insert Attendance Records for 70 SE IT Div B Students
-- -------------------------------------------------------------
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104023', 11, 61, 16, 76, 16, 73, 24, 89, 11, 85, 7, 50, 9, 75, 11, 73, 1, 25, 106, 73, 80, 76);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104155', 1, 6, 3, 14, 3, 14, 2, 7, 0, 0, 1, 7, 1, 8, 1, 7, 0, 0, 12, 8, 14, 11);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104028', 15, 83, 13, 62, 15, 68, 23, 85, 10, 77, 7, 50, 5, 42, 10, 67, 1, 25, 99, 68, 71, 70);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104164', 15, 83, 20, 95, 18, 82, 26, 96, 12, 92, 8, 57, 6, 50, 12, 80, 2, 50, 119, 82, 77, 79);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104138', 0, 0, 1, 5, 0, 0, 4, 15, 0, 0, 0, 0, 0, 0, 1, 7, 0, 0, 6, 4, 26, 15);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104151', 9, 50, 10, 48, 8, 36, 15, 56, 7, 54, 7, 50, 6, 50, 6, 40, 0, 0, 68, 47, 37, 42);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104188', 2, 11, 5, 24, 4, 18, 5, 19, 1, 8, 4, 29, 2, 17, 3, 20, 0, 0, 26, 18, 26, 22);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104065', 0, 0, 0, 0, 0, 0, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 9, 5);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104207', 10, 56, 12, 57, 11, 50, 17, 63, 8, 62, 8, 57, 7, 58, 10, 67, 0, 0, 83, 57, 66, 61);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104067', 7, 39, 8, 38, 9, 41, 15, 56, 5, 38, 7, 50, 8, 67, 4, 27, 1, 25, 64, 44, 63, 53);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104089', 17, 94, 18, 86, 17, 77, 26, 96, 12, 92, 9, 64, 9, 75, 12, 80, 2, 50, 122, 84, 86, 85);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104002', 14, 78, 18, 86, 15, 68, 25, 93, 11, 85, 6, 43, 1, 8, 11, 73, 3, 75, 104, 71, 77, 74);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104012', 4, 22, 7, 33, 10, 45, 8, 30, 1, 8, 5, 36, 3, 25, 6, 40, 2, 50, 46, 32, 31, 31);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104035', 14, 78, 16, 76, 14, 64, 22, 82, 9, 69, 9, 64, 10, 83, 9, 60, 1, 25, 104, 71, 77, 74);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104017', 18, 100, 17, 81, 22, 100, 25, 93, 12, 92, 12, 86, 11, 92, 11, 73, 2, 50, 130, 89, 91, 90);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104060', 7, 39, 7, 33, 7, 32, 12, 44, 4, 31, 9, 64, 3, 25, 5, 33, 1, 25, 55, 38, 34, 36);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104015', 16, 89, 17, 81, 18, 82, 23, 85, 11, 85, 10, 71, 11, 92, 12, 80, 2, 50, 120, 82, 97, 90);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104167', 17, 94, 19, 90, 19, 86, 23, 85, 10, 77, 9, 64, 1, 8, 6, 40, 3, 75, 107, 73, 57, 65);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104075', 16, 89, 19, 90, 15, 68, 26, 96, 12, 92, 13, 93, 8, 67, 10, 67, 3, 75, 122, 84, 94, 89);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104041', 12, 67, 17, 81, 18, 82, 24, 89, 10, 77, 9, 64, 10, 83, 9, 60, 3, 75, 112, 77, 80, 78);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104200', 10, 56, 15, 71, 12, 55, 24, 89, 8, 62, 9, 64, 8, 67, 8, 53, 2, 50, 96, 66, 74, 70);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104156', 15, 83, 16, 76, 17, 77, 22, 82, 11, 85, 5, 36, 6, 50, 11, 73, 2, 50, 105, 72, 51, 62);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104104', 11, 61, 17, 81, 14, 64, 21, 78, 9, 69, 9, 64, 8, 67, 12, 80, 2, 50, 103, 71, 57, 64);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104009', 11, 61, 10, 48, 11, 50, 16, 59, 9, 69, 10, 71, 6, 50, 7, 47, 0, 0, 80, 55, 51, 53);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104192', 16, 89, 20, 95, 19, 86, 27, 100, 10, 77, 14, 100, 9, 75, 9, 60, 4, 100, 128, 88, 95, 91);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104024', 14, 78, 15, 71, 14, 64, 23, 85, 7, 54, 9, 64, 10, 83, 9, 60, 4, 100, 105, 72, 76, 74);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104077', 18, 100, 20, 95, 19, 86, 26, 96, 10, 77, 9, 64, 10, 83, 11, 73, 4, 100, 127, 87, 84, 85);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104141', 9, 50, 13, 62, 12, 55, 23, 85, 9, 69, 10, 71, 6, 50, 10, 67, 4, 100, 96, 66, 59, 63);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104152', 2, 11, 6, 29, 6, 27, 19, 70, 2, 15, 7, 50, 7, 58, 4, 27, 0, 0, 53, 36, 38, 37);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104048', 13, 72, 19, 90, 18, 82, 25, 93, 7, 54, 12, 86, 12, 100, 11, 73, 2, 50, 119, 82, 81, 81);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104134', 11, 61, 13, 62, 12, 55, 22, 82, 9, 69, 10, 71, 7, 58, 9, 60, 1, 25, 94, 64, 62, 63);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104063', 12, 67, 16, 76, 13, 59, 23, 85, 10, 77, 10, 71, 8, 67, 9, 60, 1, 25, 102, 70, 68, 69);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104088', 13, 72, 17, 81, 15, 68, 22, 82, 11, 85, 10, 71, 10, 83, 13, 87, 2, 50, 113, 77, 73, 75);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104160', 8, 44, 15, 71, 10, 45, 19, 70, 4, 31, 7, 50, 8, 67, 12, 80, 2, 50, 85, 58, 49, 53);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104050', 3, 17, 9, 43, 7, 32, 9, 33, 3, 23, 0, 0, 3, 25, 7, 47, 0, 0, 41, 28, 38, 33);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104014', 17, 94, 14, 67, 15, 68, 25, 93, 10, 77, 8, 57, 7, 58, 12, 80, 2, 50, 110, 75, 62, 69);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104062', 17, 94, 20, 95, 20, 91, 27, 100, 10, 77, 7, 50, 3, 25, 7, 47, 2, 50, 113, 77, 76, 77);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104021', 16, 89, 21, 100, 20, 91, 27, 100, 11, 85, 13, 93, 9, 75, 8, 53, 4, 100, 129, 88, 92, 90);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104178', 1, 6, 8, 38, 4, 18, 10, 37, 3, 23, 1, 7, 1, 8, 5, 33, 0, 0, 33, 23, 19, 21);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104058', 15, 83, 14, 67, 13, 59, 23, 85, 8, 62, 8, 57, 7, 58, 11, 73, 2, 50, 101, 69, 73, 71);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104081', 10, 56, 14, 67, 11, 50, 19, 70, 6, 46, 7, 50, 8, 67, 7, 47, 3, 75, 85, 58, 65, 62);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104132', 4, 22, 14, 67, 9, 41, 10, 37, 3, 23, 1, 7, 5, 42, 6, 40, 0, 0, 52, 36, 24, 30);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104103', 15, 83, 17, 81, 20, 91, 26, 96, 12, 92, 12, 86, 11, 92, 13, 87, 4, 100, 130, 89, 100, 95);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104189', 12, 67, 10, 48, 13, 59, 23, 85, 9, 69, 7, 50, 6, 50, 9, 60, 3, 75, 92, 63, 84, 73);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104049', 11, 61, 13, 62, 13, 59, 18, 67, 7, 54, 10, 71, 8, 67, 7, 47, 3, 75, 90, 62, 76, 69);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104211', 3, 17, 1, 5, 1, 5, 2, 7, 1, 8, 0, 0, 0, 0, 5, 33, 0, 0, 13, 9, 19, 14);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104173', 16, 89, 17, 81, 17, 77, 25, 93, 11, 85, 12, 86, 8, 67, 12, 80, 4, 100, 122, 84, 97, 90);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104191', 18, 100, 21, 100, 22, 100, 27, 100, 13, 100, 12, 86, 12, 100, 13, 87, 4, 100, 142, 97, 100, 99);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104039', 18, 100, 21, 100, 21, 95, 27, 100, 13, 100, 12, 86, 11, 92, 14, 93, 4, 100, 141, 97, 100, 98);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104086', 16, 89, 18, 86, 20, 91, 26, 96, 12, 92, 7, 50, 11, 92, 10, 67, 4, 100, 124, 85, 78, 82);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104169', 11, 61, 10, 48, 11, 50, 16, 59, 8, 62, 4, 29, 3, 25, 6, 40, 0, 0, 69, 47, 54, 51);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104010', 11, 61, 16, 76, 15, 68, 25, 93, 5, 38, 7, 50, 6, 50, 11, 73, 2, 50, 98, 67, 78, 73);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104153', 12, 67, 13, 62, 14, 64, 25, 93, 6, 46, 10, 71, 8, 67, 9, 60, 2, 50, 99, 68, 70, 69);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104097', 15, 83, 17, 81, 19, 86, 25, 93, 6, 46, 7, 50, 9, 75, 9, 60, 2, 50, 109, 75, 92, 83);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104080', 16, 89, 17, 81, 18, 82, 22, 82, 6, 46, 9, 64, 8, 67, 10, 67, 2, 50, 108, 74, 92, 83);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104006', 7, 39, 8, 38, 7, 32, 9, 33, 5, 38, 4, 29, 1, 8, 4, 27, 0, 0, 45, 31, 32, 32);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104135', 13, 72, 13, 62, 12, 55, 18, 67, 7, 54, 7, 50, 9, 75, 6, 40, 2, 50, 87, 60, 84, 72);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104083', 14, 78, 17, 81, 19, 86, 22, 82, 9, 69, 4, 29, 7, 58, 10, 67, 2, 50, 104, 71, 65, 68);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104092', 16, 89, 21, 100, 18, 82, 24, 89, 9, 69, 7, 50, 9, 75, 11, 73, 4, 100, 119, 82, 84, 83);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104020', 13, 72, 11, 52, 10, 45, 20, 74, 8, 62, 3, 21, 11, 92, 8, 53, 2, 50, 86, 59, 76, 67);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104059', 4, 22, 0, 0, 1, 5, 3, 11, 0, 0, 1, 7, 0, 0, 2, 13, 0, 0, 11, 8, 11, 9);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104054', 15, 83, 15, 71, 11, 50, 18, 67, 7, 54, 9, 64, 9, 75, 8, 53, 2, 50, 94, 64, 81, 73);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104112', 17, 94, 16, 76, 17, 77, 24, 89, 7, 54, 10, 71, 9, 75, 10, 67, 3, 75, 113, 77, 95, 86);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104087', 17, 94, 17, 81, 17, 77, 23, 85, 10, 77, 8, 57, 10, 83, 8, 53, 3, 75, 113, 77, 86, 82);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104203', 17, 94, 19, 90, 18, 82, 25, 93, 7, 54, 9, 64, 9, 75, 11, 73, 2, 50, 117, 80, 84, 82);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104186', 18, 100, 21, 100, 20, 91, 26, 96, 11, 85, 11, 79, 8, 67, 11, 73, 3, 75, 129, 88, 100, 94);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104013', 16, 89, 19, 90, 18, 82, 25, 93, 10, 77, 8, 57, 10, 83, 12, 80, 2, 50, 120, 82, 86, 84);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104026', 15, 83, 16, 76, 16, 73, 21, 78, 6, 46, 9, 64, 7, 58, 10, 67, 2, 50, 102, 70, 92, 81);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104043', 17, 94, 20, 95, 20, 91, 24, 89, 11, 85, 7, 50, 10, 83, 11, 73, 4, 100, 124, 85, 97, 91);
INSERT INTO attendance (moodle_id, amt1_attended, amt1_pct, adsa_attended, adsa_pct, dbms_attended, dbms_pct, at_attended, at_pct, oe_attended, oe_pct, fsjp_attended, fsjp_pct, evs_attended, evs_pct, ed_attended, ed_pct, mentoring_attended, mentoring_pct, theory_total_attended, theory_total_pct, practical_avg_pct, overall_pct) VALUES
('25104046', 16, 89, 17, 81, 17, 77, 26, 96, 12, 92, 9, 64, 11, 92, 11, 73, 2, 50, 121, 83, 95, 89);

-- -------------------------------------------------------------
-- Useful Views for Analytics
-- -------------------------------------------------------------
CREATE OR REPLACE VIEW view_student_summary AS
SELECT 
    s.roll_no,
    s.moodle_id,
    s.full_name,
    s.contact,
    a.theory_total_pct AS theory_attendance,
    a.practical_avg_pct AS practical_attendance,
    a.overall_pct AS overall_attendance,
    CASE 
        WHEN a.overall_pct >= 75 THEN 'Safe / Eligible'
        WHEN a.overall_pct >= 60 THEN 'Warning (Defaulter Risk)'
        ELSE 'Critical Defaulter'
    END AS attendance_status
FROM students s
JOIN attendance a ON s.moodle_id = a.moodle_id;
