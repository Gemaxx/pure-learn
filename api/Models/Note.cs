using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Note
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public string Body { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public long? CategoryId { get; set; }

    public long? GoalId { get; set; }

    public long? SubgoalId { get; set; }

    public long? TaskId { get; set; }

    public long LearnerId { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Goal? Goal { get; set; }

    public virtual Learner Learner { get; set; } = null!;

    public virtual Subgoal? Subgoal { get; set; }

    public virtual Task? Task { get; set; }
}
