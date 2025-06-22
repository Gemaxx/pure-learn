using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public partial class Note
{
    [Column("Id")]
    public long Id { get; set; }

    [Column("Title")]
    public string Title { get; set; } = null!;

    [Column("Body")]
    public string Body { get; set; } = null!;

    [Column("CreatedAt")]
    public DateTime? CreatedAt { get; set; }

    [Column("UpdatedAt")]
    public DateTime? UpdatedAt { get; set; }

    [Column("CategoryId")]
    public long? CategoryId { get; set; }

    [Column("GoalId")]
    public long? GoalId { get; set; }

    [Column("SubgoalId")]
    public long? SubgoalId { get; set; }

    [Column("TaskId")]
    public long? TaskId { get; set; }

    [Column("LearnerId")]
    public long LearnerId { get; set; }

    [Column("DeletedAt")]
    public DateTime? DeletedAt { get; set; }

    [Column("IsDeleted")]
    public bool IsDeleted { get; set; } = false;

    // Navigation properties - only essential ones
    public virtual Learner Learner { get; set; } = null!;
}
