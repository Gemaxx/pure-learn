using System;

namespace api.Models;

public class PomodoroInsight
{
    public long Id { get; set; }
    public long LearnerId { get; set; }
    public int TotalPomodoros { get; set; }
    public TimeSpan TotalFocusTime { get; set; }
    public int WeeklyPomodoros { get; set; }
    public TimeSpan WeeklyFocusTime { get; set; }
    public DateOnly WeekOf { get; set; } // starting Monday

    public Learner Learner { get; set; } = null!;
} 