namespace api.Models;

public partial class LearningResource
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Status { get; set; }
    public long TypeId { get; set; }    

    public int TotalUnits { get; set; }

    public int Progress { get; set; }

    public double ProgressPercentage => TotalUnits > 0 ? ((double) Progress / TotalUnits) * 100 : 0;

    public string? Link { get; set; }

    public DateTime? CreatedAt { get; set; } 

    public DateTime? UpdatedAt { get; set; }

    public long LearnerId { get; set; }

    public long? CategoryId { get; set; }

    public long? GoalId { get; set; }

    public long? SubgoalId { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Goal? Goal { get; set; }

    public virtual Learner Learner { get; set; } = null!;

    public virtual Subgoal? Subgoal { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    public virtual LearningResourceType Type { get; set; } = null!;

    public string TypeName => Type.Name;

    public string TypeUnitType => Type.UnitType;
}
