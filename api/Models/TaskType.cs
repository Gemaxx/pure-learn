using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public partial class TaskType
{
    [Column("Id")]
    public long Id { get; set; }

    [Column("Name")]
    public string Name { get; set; } = null!;

    [Column("Description")]
    public string? Description { get; set; }

    [Column("Icon")]
    public byte[]? Icon { get; set; }

    [Column("LearnerId")]
    public long LearnerId { get; set; }

    [Column("DeletedAt")]
    public DateTime? DeletedAt { get; set; }

    [Column("IsDeleted")]
    public bool IsDeleted { get; set; }

    public virtual Learner Learner { get; set; } = null!;

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
