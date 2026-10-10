package com.apsit.isms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "syllabus_modules")
public class SyllabusModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "module_number", nullable = false)
    private String moduleNumber;

    @Column(name = "module_title", nullable = false)
    private String moduleTitle;

    @Column(name = "detailed_content", columnDefinition = "TEXT", nullable = false)
    private String detailedContent;

    @Column(name = "teaching_hours", nullable = false)
    private Integer teachingHours;

    @Column(name = "lo_mapping")
    private String loMapping;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_code", referencedColumnName = "course_code")
    @JsonIgnore
    private Course course;

    public SyllabusModule() {}

    public SyllabusModule(String moduleNumber, String moduleTitle, String detailedContent, Integer teachingHours, String loMapping, Course course) {
        this.moduleNumber = moduleNumber;
        this.moduleTitle = moduleTitle;
        this.detailedContent = detailedContent;
        this.teachingHours = teachingHours;
        this.loMapping = loMapping;
        this.course = course;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getModuleNumber() { return moduleNumber; }
    public void setModuleNumber(String moduleNumber) { this.moduleNumber = moduleNumber; }

    public String getModuleTitle() { return moduleTitle; }
    public void setModuleTitle(String moduleTitle) { this.moduleTitle = moduleTitle; }

    public String getDetailedContent() { return detailedContent; }
    public void setDetailedContent(String detailedContent) { this.detailedContent = detailedContent; }

    public Integer getTeachingHours() { return teachingHours; }
    public void setTeachingHours(Integer teachingHours) { this.teachingHours = teachingHours; }

    public String getLoMapping() { return loMapping; }
    public void setLoMapping(String loMapping) { this.loMapping = loMapping; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
