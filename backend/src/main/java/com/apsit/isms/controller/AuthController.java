package com.apsit.isms.controller;

import com.apsit.isms.model.Student;
import com.apsit.isms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String moodleId = loginRequest.get("moodleId");
        String password = loginRequest.get("password");

        if (moodleId == null || moodleId.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createError("Moodle ID and password are required."));
        }

        moodleId = moodleId.trim();
        password = password.trim();

        // 1. Verify student exists in SE IT Div B
        Optional<Student> studentOpt = studentRepository.findByMoodleId(moodleId);
        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createError("Moodle ID " + moodleId + " is not registered in SE IT Div B."));
        }

        Student student = studentOpt.get();

        // 2. Verify password format: moodleId + "@Apsit"
        String expectedPassword = moodleId + "@Apsit";
        if (!password.equals(expectedPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createError("Invalid password. Password format must be: " + moodleId + "@Apsit"));
        }

        // 3. Return success with student details
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login successful. Welcome, " + student.getFullName() + "!");
        response.put("student", student);
        response.put("token", "JWT_SIMULATED_" + moodleId + "_" + System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }

    private Map<String, Object> createError(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return error;
    }
}
