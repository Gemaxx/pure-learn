using Microsoft.AspNetCore.Identity;

namespace api.Models;

public class ApplicationUser : IdentityUser<long>
{
    // Add any additional user properties here
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }

    public virtual Learner LearnerProfile { get; set; } = null!;
}
