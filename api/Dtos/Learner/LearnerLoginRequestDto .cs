using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Learner
{
    using System;
    using System.ComponentModel.DataAnnotations;

    namespace api.Dtos.Learner
    {
        public class LearnerRegistrationRequestDto
        {
            // Fields needed for ApplicationUser
            [Required(ErrorMessage = "Username is required.")]
            [StringLength(100, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 100 characters.")]
            public string UserName { get; set; } = null!;

            [Required(ErrorMessage = "Email is required.")]
            [EmailAddress(ErrorMessage = "Invalid email format.")]
            public string Email { get; set; } = null!;

            [Required(ErrorMessage = "Password is required.")]
            [StringLength(255, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters.")]
            public string Password { get; set; } = null!;

            [Compare("Password", ErrorMessage = "Passwords do not match.")]
            public string Confirmpassword { get; set; } = null!;

            // Fields needed for Learner entity
            [Required(ErrorMessage = "Name is required.")]
            public string Name { get; set; } = null!;

            public string? ProfilePicture { get; set; }

            public string? Bio { get; set; }
        }
    }

}