using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public partial class Task
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;


    public long TypeId { get; set; }


    public long KanbanStatusId { get; set; }

   
    public string EisenhowerStatus { get; set; } = null!;

   
    public string TimeTaskRelated { get; set; } = null!;

    public DateOnly? DueDate { get; set; }

    
    public TimeOnly? EstimatedTime { get; set; }

    public TimeOnly? TimeSpent { get; set; }

    
    
    public string RepeatFrequency { get; set; } = null!;

    public int? RepeatInterval { get; set; }

    
    public bool? RepeatOnSunday { get; set; }

    public bool? RepeatOnMonday { get; set; }

    public bool? RepeatOnTuesday { get; set; }

    public bool? RepeatOnWednesday { get; set; }

    public bool? RepeatOnThursday { get; set; }

    public bool? RepeatOnFriday { get; set; }

    public bool? RepeatOnSaturday { get; set; }

    
    public string? RepeatEnds { get; set; }

    public DateOnly? RepeatEndDate { get; set; }

    public int? RepeatEndOccurrences { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public long LearnerId { get; set; }

    public long? CategoryId { get; set; }

    public long? GoalId { get; set; }

    public long? SubgoalId { get; set; }

    public long? LearningResourceId { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Goal? Goal { get; set; }

    public virtual KanbanStatus KanbanStatus { get; set; } = null!;

    public virtual Learner Learner { get; set; } = null!;

    public virtual LearningResource? LearningResource { get; set; }

    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();

    public virtual Subgoal? Subgoal { get; set; }

    public virtual ICollection<Subtask> Subtasks { get; set; } = new List<Subtask>();

    public virtual TaskType Type { get; set; } = null!;
    
}
