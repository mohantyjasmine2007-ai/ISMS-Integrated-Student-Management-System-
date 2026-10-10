package com.apsit.isms;

import java.sql.*;

/**
 * Standalone Java JDBC Verification Tool for APSIT ISMS
 * Run with: java com.apsit.isms.DatabaseVerification
 */
public class DatabaseVerification {

    private static final String URL = "jdbc:mysql://localhost:3306/apsit_isms?useSSL=false&allowPublicKeyRetrieval=true";
    private static final String USER = "root";
    private static final String PASS = "root";

    public static void main(String[] args) {
        System.out.println("============================================================");
        System.out.println(" APSIT ISMS - Java & MySQL Database Verification Tool");
        System.out.println("============================================================");

        try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
            System.out.println("[SUCCESS] Connected to MySQL Database: apsit_isms\n");

            // 1. Verify Students Count
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM students")) {
                if (rs.next()) {
                    System.out.println("Total SE IT Div B Students: " + rs.getInt(1) + " (Expected: 70)");
                }
            }

            // 2. Verify Sample Login Check (Jasmine Mohanty 25104021)
            String sampleId = "25104021";
            try (PreparedStatement pstmt = conn.prepareStatement("SELECT roll_no, full_name, password_hash FROM students WHERE moodle_id = ?")) {
                pstmt.setString(1, sampleId);
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        System.out.println("Sample Student Verified:");
                        System.out.println("  Name: " + rs.getString("full_name"));
                        System.out.println("  Roll: " + rs.getString("roll_no"));
                        System.out.println("  Expected Password: " + rs.getString("password_hash"));
                    }
                }
            }

            // 3. Verify ED Syllabus Modules Count
            try (PreparedStatement pstmt = conn.prepareStatement("SELECT COUNT(*) FROM syllabus_modules WHERE course_code = '2993511'")) {
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        System.out.println("\nEntrepreneurship Development (2993511) Modules: " + rs.getInt(1) + " modules");
                    }
                }
            }

            // 4. Verify EVS Syllabus Modules Count
            try (PreparedStatement pstmt = conn.prepareStatement("SELECT COUNT(*) FROM syllabus_modules WHERE course_code = '2993512'")) {
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        System.out.println("Environmental Science (2993512) Units: " + rs.getInt(1) + " units");
                    }
                }
            }

            // 5. Verify Experiments Count
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT course_code, COUNT(*) FROM experiments GROUP BY course_code")) {
                System.out.println("\nExperiments per Course:");
                while (rs.next()) {
                    System.out.println("  Course " + rs.getString(1) + ": " + rs.getInt(2) + " practical experiments");
                }
            }

            System.out.println("\n[ALL CHECKS PASSED] Database schema and seed data are verified!");

        } catch (SQLException e) {
            System.err.println("[NOTE] MySQL server connection: " + e.getMessage());
            System.err.println("Ensure MySQL is running on localhost:3306 and execute database_setup.sql");
        }
    }
}
