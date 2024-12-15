using System;
using System.Collections.Generic;

namespace api.Models;

public partial class KanbanStatus
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public int? MaxTasks { get; set; }

    public long LearnerId { get; set; }

    public virtual Learner Learner { get; set; } = null!;

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
