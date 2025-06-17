using System;

namespace api.Dtos.Insights;

public class PomodoroInsightDto
{
    public int TotalPomodoros { get; set; }
    public double TotalFocusHours { get; set; }
    public int WeeklyPomodoros { get; set; }
    public double WeeklyFocusHours { get; set; }
    public DateOnly WeekOf { get; set; }
} 