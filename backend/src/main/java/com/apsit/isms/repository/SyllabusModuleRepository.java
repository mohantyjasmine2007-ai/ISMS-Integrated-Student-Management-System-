package com.apsit.isms.repository;

import com.apsit.isms.model.SyllabusModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SyllabusModuleRepository extends JpaRepository<SyllabusModule, Long> {
    List<SyllabusModule> findByCourseCourseCode(String courseCode);
}
