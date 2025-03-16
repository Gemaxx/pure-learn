using System;
using System.Collections.Generic;
namespace api.Models;

public partial class Learner
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? ProfilePicture { get; set; }

    public string? Bio { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? LastLogin { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();

    public virtual ICollection<KanbanStatus> KanbanStatuses { get; set; } = new List<KanbanStatus>();

    public virtual ICollection<LearningResourceType> LearningResourceTypes { get; set; } = new List<LearningResourceType>();

    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();

    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();

    public virtual ICollection<TaskType> TaskTypes { get; set; } = new List<TaskType>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
