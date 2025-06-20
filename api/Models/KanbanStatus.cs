using System;
using System.Collections.Generic;

namespace api.Models;

public partial class KanbanStatus
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public int? MaxTasks { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsDeleted { get; set; }

    public long? GoalId { get; set; }

    public virtual Goal? Goal { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
