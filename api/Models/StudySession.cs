using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class StudySession
{
    [Required]
    public long Id { get; set; }

    [Required]
    public long LearnerId { get; set; }

    public long? TaskId { get; set; }

    [Required]
    public DateTime StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    public int CycleCount { get; set; }

    [Required]
    public bool IsCompleted { get; set; }
    
    // Audit fields
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public bool IsDeleted { get; set; }

    // Concurrency control
    [Timestamp]
    public byte[] RowVersion { get; set; } = null!;

    // Navigation properties
    public virtual Learner Learner { get; set; } = null!;
    public virtual Task? Task { get; set; }
    public virtual ICollection<PomodoroCycle> PomodoroCycles { get; set; } = new List<PomodoroCycle>();
} 