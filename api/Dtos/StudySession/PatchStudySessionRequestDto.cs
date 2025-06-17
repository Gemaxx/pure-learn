using System;

namespace api.Dtos.StudySession;

public class PatchStudySessionRequestDto
{
    public DateTime? EndTime { get; set; }
    public bool? IsCompleted { get; set; }
} 