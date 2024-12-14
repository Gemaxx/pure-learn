using System;
using System.Collections.Generic;

namespace api.Models;
//salma change

public partial class Category
{
    public long idd { get; set; }

    public string? ch { get; set; }

    public string Color { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public long? ParentCategoryId { get; set; }

    public long LearnerId { get; set; }

    public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();

    public virtual ICollection<Category> InverseParentCategory { get; set; } = new List<Category>();

    public virtual Learner Learner { get; set; } = null!;

    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();

    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();

    public virtual Category? ParentCategory { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
