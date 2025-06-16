using System;

namespace api.Dtos.StudySession;

public class StudySessionDto
{
    public long Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public int CycleCount { get; set; }
    public bool IsCompleted { get; set; }
    public long LearnerId { get; set; }
    public long? TaskId { get; set; }
} 