using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public partial class Subtask
{
    [Column("id")]
    public long Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = null!;

    [Column("status")]
    public string Status { get; set; } = "Not Started";

    [Column("CREATEd_at")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }

    [Column("task_id")]
    public long TaskId { get; set; }

    [Column("deleted_at")]
    public DateTime? DeletedAt { get; set; }

    [Column("IsDeleted")]
    public bool IsDeleted { get; set; } = false;

    public virtual Task Task { get; set; } = null!;
}
