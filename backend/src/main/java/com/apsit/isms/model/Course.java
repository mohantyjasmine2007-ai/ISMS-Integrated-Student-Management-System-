package com.apsit.isms.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_code", unique = true, nullable = false)
    private String courseCode;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "department")
    private String department = "Information Technology";

    @Column(name = "semester")
    private Integer semester = 3;

    @Column(name = "credits")
    private Integer credits = 2;

    @Column(name = "term_work_marks")
    private Integer termWorkMarks = 50;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SyllabusModule> modules = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Experiment> experiments = new ArrayList<>();

    public Course() {}

    public Course(String courseCode, String courseName, Integer credits, Integer termWorkMarks) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.credits = credits;
        this.termWorkMarks = termWorkMarks;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public Integer getTermWorkMarks() { return termWorkMarks; }
    public void setTermWorkMarks(Integer termWorkMarks) { this.termWorkMarks = termWorkMarks; }

    public List<SyllabusModule> getModules() { return modules; }
    public void setModules(List<SyllabusModule> modules) { this.modules = modules; }

    public List<Experiment> getExperiments() { return experiments; }
    public void setExperiments(List<Experiment> experiments) { this.experiments = experiments; }
}
