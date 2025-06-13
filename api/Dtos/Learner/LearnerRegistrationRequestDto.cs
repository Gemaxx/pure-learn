using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Learner
{
    public class LearnerRegistrationRequestDto
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(100, MinimumLength = 2)]
        public string UserName { get; set; } = null!;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(255, MinimumLength = 6)]
        public string Password { get; set; } = null!;

        public string Confirmpassword { get; set; } = null!;

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; } = null!;

        public string? ProfilePicture { get; set; }
        public string? Bio { get; set; }
    }
}