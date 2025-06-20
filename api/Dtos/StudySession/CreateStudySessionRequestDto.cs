using System;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.StudySession;

public class CreateStudySessionRequestDto
{
    public long? TaskId { get; set; }

    [Required]
    public DateTime StartTime { get; set; }
    // EndTime, CycleCount, IsCompleted omitted on create
} 