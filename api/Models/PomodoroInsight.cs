using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class PomodoroInsight
{
    [Column("id")]
    public long Id { get; set; }
    [Column("learner_id")]
    public long LearnerId { get; set; }
    [Column("total_pomodoros")]
    public int TotalPomodoros { get; set; }
    [Column("total_focus_time")]
    public TimeSpan TotalFocusTime { get; set; }
    [Column("weekly_pomodoros")]
    public int WeeklyPomodoros { get; set; }
    [Column("weekly_focus_time")]
    public TimeSpan WeeklyFocusTime { get; set; }
    [Column("week_of")]
    public DateOnly WeekOf { get; set; } // starting Monday

    public Learner Learner { get; set; } = null!;
} 