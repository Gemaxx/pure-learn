using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Goal
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Motivation { get; set; } = null!;

    public string Term { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateOnly? CompletionDate { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public long? CategoryId { get; set; }

    public long LearnerId { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<KanbanStatus> KanbanStatuses { get; set; } = new List<KanbanStatus>();

    public virtual Learner Learner { get; set; } = null!;

    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();

    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();

    public virtual ICollection<Subgoal> Subgoals { get; set; } = new List<Subgoal>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
