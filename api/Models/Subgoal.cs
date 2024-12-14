using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Subgoal
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public long GoalId { get; set; }

    public virtual Goal Goal { get; set; } = null!;

    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();

    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
