package com.apsit.isms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "moodle_id", unique = true, nullable = false)
    private String moodleId;

    @Column(name = "roll_no", nullable = false)
    private String rollNo;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "department")
    private String department = "Information Technology";

    @Column(name = "division")
    private String division = "B";

    @Column(name = "class_year")
    private String classYear = "S.E.";

    @Column(name = "semester")
    private Integer semester = 3;

    @Column(name = "academic_year")
    private String academicYear = "2026-27";

    @Column(name = "dob")
    private String dob;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "contact")
    private String contact;

    @Column(name = "password_hash")
    private String passwordHash;

    public Student() {}

    public Student(String moodleId, String rollNo, String fullName, String firstName, String dob, String bloodGroup, String contact, String passwordHash) {
        this.moodleId = moodleId;
        this.rollNo = rollNo;
        this.fullName = fullName;
        this.firstName = firstName;
        this.dob = dob;
        this.bloodGroup = bloodGroup;
        this.contact = contact;
        this.passwordHash = passwordHash;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMoodleId() { return moodleId; }
    public void setMoodleId(String moodleId) { this.moodleId = moodleId; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getDivision() { return division; }
    public void setDivision(String division) { this.division = division; }

    public String getClassYear() { return classYear; }
    public void setClassYear(String classYear) { this.classYear = classYear; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
}
