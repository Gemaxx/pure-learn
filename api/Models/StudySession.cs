using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class StudySession
{
    [Required]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [Column("learner_id")]
    public long LearnerId { get; set; }

    [Column("task_id")]
    public long? TaskId { get; set; }

    [Required]
    [Column("start_time")]
    public DateTime StartTime { get; set; }

    [Column("end_time")]
    public DateTime? EndTime { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    [Column("cycle_count")]
    public int CycleCount { get; set; }

    [Required]
    [Column("is_completed")]
    public bool IsCompleted { get; set; }
    
    // Audit fields
    [Column("created_at")]
    public DateTime? CreatedAt { get; set; }
    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }
    [Column("deleted_at")]
    public DateTime? DeletedAt { get; set; }
    [Column("is_deleted")]
    public bool IsDeleted { get; set; }

    // Concurrency control
    [Timestamp]
    [Column("RowVersion")]
    public byte[] RowVersion { get; set; } = null!;

    // Navigation properties
    public virtual Learner Learner { get; set; } = null!;
    public virtual Models.Task? Task { get; set; }
    public virtual ICollection<PomodoroCycle> PomodoroCycles { get; set; } = new List<PomodoroCycle>();

    [NotMapped]
    public TimeSpan Duration => (EndTime ?? DateTime.UtcNow) - StartTime;

    [NotMapped]
    public DateTime LastCycleTime => EndTime ?? StartTime;
} 