package com.apsit.isms.repository;

import com.apsit.isms.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByMoodleId(String moodleId);
    Optional<Student> findByRollNo(String rollNo);
    boolean existsByMoodleId(String moodleId);
}
