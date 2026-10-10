package com.apsit.isms.controller;

import com.apsit.isms.model.Attendance;
import com.apsit.isms.model.Student;
import com.apsit.isms.repository.AttendanceRepository;
import com.apsit.isms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{moodleId}")
    public ResponseEntity<?> getStudentProfile(@PathVariable String moodleId) {
        Optional<Student> studentOpt = studentRepository.findByMoodleId(moodleId);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(studentOpt.get());
    }

    @GetMapping("/{moodleId}/attendance")
    public ResponseEntity<?> getStudentAttendance(@PathVariable String moodleId) {
        Optional<Student> studentOpt = studentRepository.findByMoodleId(moodleId);
        Optional<Attendance> attendanceOpt = attendanceRepository.findByMoodleId(moodleId);

        if (studentOpt.isEmpty() || attendanceOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> result = new HashMap<>();
        result.put("student", studentOpt.get());
        result.put("attendance", attendanceOpt.get());
        result.put("isDefaulter", attendanceOpt.get().isDefaulter());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/my-record")
    public ResponseEntity<?> getMyRecord(
            @RequestParam(required = false) String moodleId,
            @RequestHeader(value = "X-Moodle-Id", required = false) String headerMoodleId) {
        String activeId = (moodleId != null && !moodleId.isBlank()) ? moodleId : headerMoodleId;
        if (activeId == null || activeId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Moodle ID must be provided to retrieve individual student record."));
        }
        return getStudentAttendance(activeId.trim());
    }

    @GetMapping("/defaulters")
    public List<Attendance> getDefaultersList() {
        return attendanceRepository.findDefaulters();
    }
}
