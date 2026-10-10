package com.apsit.isms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "moodle_id", nullable = false)
    private String moodleId;

    @Column(name = "amt1_attended")
    private Integer amt1Attended = 0;

    @Column(name = "amt1_pct")
    private Integer amt1Pct = 0;

    @Column(name = "adsa_attended")
    private Integer adsaAttended = 0;

    @Column(name = "adsa_pct")
    private Integer adsaPct = 0;

    @Column(name = "dbms_attended")
    private Integer dbmsAttended = 0;

    @Column(name = "dbms_pct")
    private Integer dbmsPct = 0;

    @Column(name = "at_attended")
    private Integer atAttended = 0;

    @Column(name = "at_pct")
    private Integer atPct = 0;

    @Column(name = "oe_attended")
    private Integer oeAttended = 0;

    @Column(name = "oe_pct")
    private Integer oePct = 0;

    @Column(name = "fsjp_attended")
    private Integer fsjpAttended = 0;

    @Column(name = "fsjp_pct")
    private Integer fsjpPct = 0;

    @Column(name = "evs_attended")
    private Integer evsAttended = 0;

    @Column(name = "evs_pct")
    private Integer evsPct = 0;

    @Column(name = "ed_attended")
    private Integer edAttended = 0;

    @Column(name = "ed_pct")
    private Integer edPct = 0;

    @Column(name = "mentoring_attended")
    private Integer mentoringAttended = 0;

    @Column(name = "mentoring_pct")
    private Integer mentoringPct = 0;

    @Column(name = "theory_total_attended")
    private Integer theoryTotalAttended = 0;

    @Column(name = "theory_total_pct")
    private Integer theoryTotalPct = 0;

    @Column(name = "practical_avg_pct")
    private Integer practicalAvgPct = 0;

    @Column(name = "overall_pct")
    private Integer overallPct = 0;

    public Attendance() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMoodleId() { return moodleId; }
    public void setMoodleId(String moodleId) { this.moodleId = moodleId; }

    public Integer getAmt1Attended() { return amt1Attended; }
    public void setAmt1Attended(Integer amt1Attended) { this.amt1Attended = amt1Attended; }
    public Integer getAmt1Pct() { return amt1Pct; }
    public void setAmt1Pct(Integer amt1Pct) { this.amt1Pct = amt1Pct; }

    public Integer getAdsaAttended() { return adsaAttended; }
    public void setAdsaAttended(Integer adsaAttended) { this.adsaAttended = adsaAttended; }
    public Integer getAdsaPct() { return adsaPct; }
    public void setAdsaPct(Integer adsaPct) { this.adsaPct = adsaPct; }

    public Integer getDbmsAttended() { return dbmsAttended; }
    public void setDbmsAttended(Integer dbmsAttended) { this.dbmsAttended = dbmsAttended; }
    public Integer getDbmsPct() { return dbmsPct; }
    public void setDbmsPct(Integer dbmsPct) { this.dbmsPct = dbmsPct; }

    public Integer getAtAttended() { return atAttended; }
    public void setAtAttended(Integer atAttended) { this.atAttended = atAttended; }
    public Integer getAtPct() { return atPct; }
    public void setAtPct(Integer atPct) { this.atPct = atPct; }

    public Integer getOeAttended() { return oeAttended; }
    public void setOeAttended(Integer oeAttended) { this.oeAttended = oeAttended; }
    public Integer getOePct() { return oePct; }
    public void setOePct(Integer oePct) { this.oePct = oePct; }

    public Integer getFsjpAttended() { return fsjpAttended; }
    public void setFsjpAttended(Integer fsjpAttended) { this.fsjpAttended = fsjpAttended; }
    public Integer getFsjpPct() { return fsjpPct; }
    public void setFsjpPct(Integer fsjpPct) { this.fsjpPct = fsjpPct; }

    public Integer getEvsAttended() { return evsAttended; }
    public void setEvsAttended(Integer evsAttended) { this.evsAttended = evsAttended; }
    public Integer getEvsPct() { return evsPct; }
    public void setEvsPct(Integer evsPct) { this.evsPct = evsPct; }

    public Integer getEdAttended() { return edAttended; }
    public void setEdAttended(Integer edAttended) { this.edAttended = edAttended; }
    public Integer getEdPct() { return edPct; }
    public void setEdPct(Integer edPct) { this.edPct = edPct; }

    public Integer getMentoringAttended() { return mentoringAttended; }
    public void setMentoringAttended(Integer mentoringAttended) { this.mentoringAttended = mentoringAttended; }
    public Integer getMentoringPct() { return mentoringPct; }
    public void setMentoringPct(Integer mentoringPct) { this.mentoringPct = mentoringPct; }

    public Integer getTheoryTotalAttended() { return theoryTotalAttended; }
    public void setTheoryTotalAttended(Integer theoryTotalAttended) { this.theoryTotalAttended = theoryTotalAttended; }
    public Integer getTheoryTotalPct() { return theoryTotalPct; }
    public void setTheoryTotalPct(Integer theoryTotalPct) { this.theoryTotalPct = theoryTotalPct; }

    public Integer getPracticalAvgPct() { return practicalAvgPct; }
    public void setPracticalAvgPct(Integer practicalAvgPct) { this.practicalAvgPct = practicalAvgPct; }

    public Integer getOverallPct() { return overallPct; }
    public void setOverallPct(Integer overallPct) { this.overallPct = overallPct; }

    public boolean isDefaulter() {
        return overallPct != null && overallPct < 75;
    }
}
