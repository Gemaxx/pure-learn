using System;
using System.Collections.Generic;

namespace api.Models;

public partial class TaskType
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public byte[]? Icon { get; set; }

    public long LearnerId { get; set; }

    public virtual Learner Learner { get; set; } = null!;

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
