using System;

namespace api.Dtos.StudySession;

public class StudySessionDetailsDto
{
    public long Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public int CycleCount { get; set; }
    public bool IsCompleted { get; set; }
    public long LearnerId { get; set; }
    public long? TaskId { get; set; }

    // Nested information
    public LearnerInfoDto? Learner { get; set; }
    public TaskInfoDto? Task { get; set; }
}

public class LearnerInfoDto
{
    public long Id { get; set; }
    public string Name { get; set; } = null!;
    public string? ProfilePicture { get; set; }
}

public class TaskInfoDto
{
    public long Id { get; set; }
    public string Title { get; set; } = null!;
    public bool? IsCompleted { get; set; }
} 