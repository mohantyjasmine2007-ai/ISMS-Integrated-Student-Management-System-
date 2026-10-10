package com.apsit.isms.controller;

import com.apsit.isms.model.Course;
import com.apsit.isms.model.Experiment;
import com.apsit.isms.model.SyllabusModule;
import com.apsit.isms.repository.CourseRepository;
import com.apsit.isms.repository.ExperimentRepository;
import com.apsit.isms.repository.SyllabusModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SyllabusModuleRepository syllabusModuleRepository;

    @Autowired
    private ExperimentRepository experimentRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{courseCode}")
    public ResponseEntity<?> getCourseDetails(@PathVariable String courseCode) {
        Optional<Course> courseOpt = courseRepository.findByCourseCode(courseCode);
        if (courseOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Course course = courseOpt.get();
        List<SyllabusModule> modules = syllabusModuleRepository.findByCourseCourseCode(courseCode);
        List<Experiment> experiments = experimentRepository.findByCourseCourseCodeOrderByExpNumberAsc(courseCode);

        Map<String, Object> details = new HashMap<>();
        details.put("course", course);
        details.put("syllabusModules", modules);
        details.put("experiments", experiments);

        return ResponseEntity.ok(details);
    }

    @GetMapping("/{courseCode}/syllabus")
    public List<SyllabusModule> getSyllabus(@PathVariable String courseCode) {
        return syllabusModuleRepository.findByCourseCourseCode(courseCode);
    }

    @GetMapping("/{courseCode}/experiments")
    public List<Experiment> getExperiments(@PathVariable String courseCode) {
        return experimentRepository.findByCourseCourseCodeOrderByExpNumberAsc(courseCode);
    }
}
