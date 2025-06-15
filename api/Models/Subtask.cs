using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Subtask
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public bool IsCompleted { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public long TaskId { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Task Task { get; set; } = null!;
}
