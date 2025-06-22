using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public partial class LearningResourceType
{
    [Column("Id")]
    public long Id { get; set; }

    [Column("Name")]
    public string Name { get; set; } = null!;

    [Column("UnitType")]
    public string UnitType { get; set; } = null!;

    [Column("LearnerId")]
    public long LearnerId { get; set; }

    [Column("DeletedAt")]
    public DateTime? DeletedAt { get; set; }

    [Column("IsDeleted")]
    public bool IsDeleted { get; set; }

    public virtual Learner Learner { get; set; } = null!;

    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();
}
