package com.apsit.isms.controller;

import com.apsit.isms.model.Student;
import com.apsit.isms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    private static final List<Map<String, String>> FACULTY_ROSTER = List.of(
        Map.of("id", "FAC01", "name", "Puja Chavan", "title", "Prof. Puja Chavan", "subject", "Applied Mathematics Thinking-I", "subjectKey", "amt1"),
        Map.of("id", "FAC02", "name", "Sonia Aneesh", "title", "Dr. Sonia Aneesh", "subject", "Advance Data Structure & Analysis", "subjectKey", "adsa"),
        Map.of("id", "FAC03", "name", "Shital Agarwal", "title", "Prof. Shital Agarwal", "subject", "Database Management System & Application", "subjectKey", "dbms"),
        Map.of("id", "FAC04", "name", "Charul Singh", "title", "Prof. Charul Singh", "subject", "Automata Theory", "subjectKey", "at"),
        Map.of("id", "FAC05", "name", "Anupama Singh", "title", "Prof. Anupama Singh", "subject", "Open Elective / ADSA Lab", "subjectKey", "oe"),
        Map.of("id", "FAC08", "name", "Mandar Ganjapurkar", "title", "Prof. Mandar Ganjapurkar", "subject", "Mini-Project - Full Stack Java Programming", "subjectKey", "fsjp"),
        Map.of("id", "FAC09", "name", "Randeep Kaur Kahlon", "title", "Prof. Randeep Kaur Kahlon", "subject", "Entrepreneurship Development", "subjectKey", "ed"),
        Map.of("id", "FAC10", "name", "Pranali Vhora", "title", "Prof. Pranali Vhora", "subject", "Environmental Science", "subjectKey", "evs")
    );

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String moodleId = loginRequest.get("moodleId");
        String facultyName = loginRequest.get("facultyName");
        String password = loginRequest.get("password");

        // Handle Faculty Login
        if (facultyName != null && !facultyName.trim().isEmpty()) {
            return handleFacultyLogin(facultyName.trim(), password != null ? password.trim() : "");
        }

        // Handle Student Login
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
        response.put("role", "student");
        response.put("message", "Login successful. Welcome, " + student.getFullName() + "!");
        response.put("student", student);
        response.put("token", "JWT_SIMULATED_" + moodleId + "_" + System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/faculty-login")
    public ResponseEntity<?> facultyLogin(@RequestBody Map<String, String> request) {
        String facultyName = request.get("facultyName");
        String password = request.get("password");
        if (facultyName == null || facultyName.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createError("Faculty Name and password are required."));
        }
        return handleFacultyLogin(facultyName.trim(), password.trim());
    }

    private ResponseEntity<?> handleFacultyLogin(String facultyInput, String password) {
        String cleanInput = facultyInput.toLowerCase()
                .replaceAll("^(prof\\.|dr\\.|prof|dr|mr\\.|mrs\\.|ms\\.)\\s*", "")
                .trim();

        Map<String, String> matched = null;
        for (Map<String, String> f : FACULTY_ROSTER) {
            String fName = f.get("name").toLowerCase();
            String fFirst = fName.split(" ")[0];
            if (fName.contains(cleanInput) || cleanInput.contains(fName) || cleanInput.contains(fFirst)) {
                matched = f;
                break;
            }
        }

        if (matched == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createError("Faculty member not found. Please verify your registered name."));
        }

        String fFirst = matched.get("name").split(" ")[0];
        boolean validPass = password.equalsIgnoreCase(matched.get("name") + "@Apsit")
                || password.equalsIgnoreCase(fFirst + "@Apsit")
                || password.equalsIgnoreCase(matched.get("name").replace(" ", "") + "@Apsit");

        if (!validPass) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(createError("Invalid password. Faculty format: " + fFirst + "@Apsit"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("role", "faculty");
        response.put("message", "Welcome, " + matched.get("title") + "! Academic Portal Activated.");
        response.put("faculty", matched);
        response.put("token", "JWT_FACULTY_" + matched.get("id") + "_" + System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }

    private Map<String, Object> createError(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return error;
    }
}
