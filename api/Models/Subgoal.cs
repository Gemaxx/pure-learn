using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public partial class Subgoal
{
    [Column("Id")]
    public long Id { get; set; }

    [Column("Title")]
    public string Title { get; set; } = null!;

    [Column("Description")]
    public string Description { get; set; } = null!;

    [Column("Status")]
    public string Status { get; set; } = null!;

    [Column("CreatedAt")]
    public DateTime? CreatedAt { get; set; }

    [Column("UpdatedAt")]
    public DateTime? UpdatedAt { get; set; }

    [Column("GoalId")]
    public long GoalId { get; set; }

    [Column("DeletedAt")]
    public DateTime? DeletedAt { get; set; }

    [Column("IsDeleted")]
    public bool? IsDeleted { get; set; }

    // Navigation properties - only essential ones
    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();
    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();
    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
