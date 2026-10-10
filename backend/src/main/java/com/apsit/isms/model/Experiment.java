package com.apsit.isms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "experiments")
public class Experiment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exp_number", nullable = false)
    private Integer expNumber;

    @Column(name = "exp_title", columnDefinition = "TEXT", nullable = false)
    private String expTitle;

    @Column(name = "hours")
    private Integer hours = 2;

    @Column(name = "lab_outcome")
    private String labOutcome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_code", referencedColumnName = "course_code")
    @JsonIgnore
    private Course course;

    public Experiment() {}

    public Experiment(Integer expNumber, String expTitle, Integer hours, String labOutcome, Course course) {
        this.expNumber = expNumber;
        this.expTitle = expTitle;
        this.hours = hours;
        this.labOutcome = labOutcome;
        this.course = course;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getExpNumber() { return expNumber; }
    public void setExpNumber(Integer expNumber) { this.expNumber = expNumber; }

    public String getExpTitle() { return expTitle; }
    public void setExpTitle(String expTitle) { this.expTitle = expTitle; }

    public Integer getHours() { return hours; }
    public void setHours(Integer hours) { this.hours = hours; }

    public String getLabOutcome() { return labOutcome; }
    public void setLabOutcome(String labOutcome) { this.labOutcome = labOutcome; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
