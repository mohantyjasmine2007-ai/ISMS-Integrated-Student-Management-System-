package com.apsit.isms.repository;

import com.apsit.isms.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByMoodleId(String moodleId);

    @Query("SELECT a FROM Attendance a WHERE a.overallPct < 75 ORDER BY a.overallPct ASC")
    List<Attendance> findDefaulters();

    @Query("SELECT a FROM Attendance a WHERE a.overallPct >= 75 ORDER BY a.overallPct DESC")
    List<Attendance> findEligibleStudents();
}
