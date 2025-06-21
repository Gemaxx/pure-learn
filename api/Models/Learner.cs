using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

public class Learner : IdentityUser<long>
{
    public string Name { get; set; } = null!;
    [Column("profile_picture")]
    public string? ProfilePicture { get; set; }
    public string? Bio { get; set; }
    [Column("CREATEd_at")]
    public DateTime? CreatedAt { get; set; }
    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }
    public DateTime? LastLogin { get; set; }
    [Column("deleted_at")]
    public DateTime? DeletedAt { get; set; }
    public bool IsDeleted { get; set; }
    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
    public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();
    public virtual ICollection<LearningResourceType> LearningResourceTypes { get; set; } = new List<LearningResourceType>();
    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();
    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();
    public virtual ICollection<TaskType> TaskTypes { get; set; } = new List<TaskType>();
    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
    public virtual ICollection<StudySession> StudySessions { get; set; } = new List<StudySession>();
    public virtual ICollection<PomodoroInsight> PomodoroInsights { get; set; } = new List<PomodoroInsight>();
}
