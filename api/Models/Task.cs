using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public partial class Task
{
    [Column("Id")]
    public long Id { get; set; }

    [Column("Title")]
    public string Title { get; set; } = null!;
    
    [Column("IsCompleted")]
    public bool? IsCompleted { get; set; }

    [Column("TypeId")]
    public long? TypeId { get; set; }

    [Column("KanbanStatusId")]
    public long? KanbanStatusId { get; set; }

    [Column("EisenhowerStatus")]
    public string? EisenhowerStatus { get; set; }

    [Column("CreatedAt")]
    public DateTime? CreatedAt { get; set; }

    [Column("UpdatedAt")]
    public DateTime? UpdatedAt { get; set; }

    [Column("LearnerId")]
    public long LearnerId { get; set; }

    [Column("CategoryId")]
    public long? CategoryId { get; set; }

    [Column("GoalId")]
    public long? GoalId { get; set; }

    [Column("SubgoalId")]
    public long? SubgoalId { get; set; }

    [Column("LearningResourceId")]
    public long? LearningResourceId { get; set; }

    [Column("DeletedAt")]
    public DateTime? DeletedAt { get; set; }

    [Column("IsDeleted")]
    public bool IsDeleted { get; set; } = false;

    // Navigation properties - only essential ones
    public virtual Category? Category { get; set; }
    public virtual KanbanStatus? KanbanStatus { get; set; }
    public virtual Learner Learner { get; set; } = null!;
    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();
    public virtual ICollection<Subtask> SubTasks { get; set; } = new List<Subtask>();
    public virtual TaskType? Type { get; set; }
}
