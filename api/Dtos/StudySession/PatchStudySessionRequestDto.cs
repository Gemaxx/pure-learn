using System;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.StudySession;

public class PatchStudySessionRequestDto
{
    public DateTime? EndTime { get; set; }

    [Range(0, int.MaxValue)]
    public int? CycleCount { get; set; }

    public bool? IsCompleted { get; set; }
} 