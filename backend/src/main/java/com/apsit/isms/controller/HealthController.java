package com.apsit.isms.controller;

import com.apsit.isms.config.DataSourceConfig;
import com.apsit.isms.repository.CourseRepository;
import com.apsit.isms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HealthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("connected", true);
        status.put("service", "APSIT ISMS Backend API");
        status.put("port", 8080);
        status.put("database", DataSourceConfig.getActiveDbType());
        status.put("totalStudents", studentRepository.count());
        status.put("totalCourses", courseRepository.count());
        status.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(status);
    }
}
