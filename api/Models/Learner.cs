using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Learner
{ 
    public long Id { get; set; }

    [Required]
    public string IdentityId { get; set; } = null!;

    public virtual ApplicationUser IdentityUser { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string? ProfilePicture { get; set; }

    public string? Bio { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? LastLogin { get; set; }

    public DateTime? DeletedAt { get; set; }

    public bool IsDeleted { get; set; }

    // Add this to enable the one-to-one relationship
    

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();

    public virtual ICollection<Goal> Goals { get; set; } = new List<Goal>();

    public virtual ICollection<LearningResourceType> LearningResourceTypes { get; set; } = new List<LearningResourceType>();

    public virtual ICollection<LearningResource> LearningResources { get; set; } = new List<LearningResource>();

    public virtual ICollection<Note> Notes { get; set; } = new List<Note>();

    public virtual ICollection<TaskType> TaskTypes { get; set; } = new List<TaskType>();

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();

    public virtual ICollection<StudySession> StudySessions { get; set; } = new List<StudySession>();
}
