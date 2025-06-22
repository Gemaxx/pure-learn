using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public partial class LearningResource
{
    [Column("id")]
    public long Id { get; set; }

    [Column("title")]
    public string Title { get; set; } = null!;

    [Column("Status")]
    public string? Status { get; set; }
    
    [Column("type_id")]
    public long TypeId { get; set; }    

    [Column("TotalUnits")]
    public int TotalUnits { get; set; }

    [Column("Progress")]
    public int Progress { get; set; }

    public double ProgressPercentage => TotalUnits > 0 ? ((double) Progress / TotalUnits) * 100 : 0;

    [Column("Link")]
    public string? Link { get; set; }

    [Column("created_at")]
    public DateTime? CreatedAt { get; set; } 

    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }

    [Column("LearnerId")]
    public long LearnerId { get; set; }

    [Column("CategoryId")]
    public long? CategoryId { get; set; }

    [Column("goal_id")]
    public long? GoalId { get; set; }

    [Column("SubgoalId")]
    public long? SubgoalId { get; set; }

    [Column("DeletedAt")]
    public DateTime? DeletedAt { get; set; }

    [Column("is_deleted")]
    public bool IsDeleted { get; set; }

    // Navigation properties - only essential ones
    public virtual Learner Learner { get; set; } = null!;
    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
    public virtual LearningResourceType Type { get; set; } = null!;

    public string TypeName => Type.Name;
    public string TypeUnitType => Type.UnitType;
}
