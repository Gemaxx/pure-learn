using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Goal
{
    using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class CreateGoalRequestDto
    {
        [Required]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 255 characters.")]
        public required string Title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        public required string Description { get; set; }

        [Required(ErrorMessage = "Motivation is required.")]
        public required string Motivation { get; set; }

        [Required]
        [RegularExpression("Short-Term|Medium-Term|Long-Term", ErrorMessage = "Term must be Short-Term, Medium-Term, or Long-Term.")]
        public required string Term { get; set; }

        [Required]
        [RegularExpression("Not-Started|In-Progress|On-Hold|Done|Canceled", ErrorMessage = "Status must be Not-Started, In-Progress, On-Hold, Done, or Canceled.")]
        public required string Status { get; set; } = "Not-Started";

        public DateOnly? CompletionDate { get; set; }
        public long? CategoryId { get; set; }

        [Required(ErrorMessage = "LearnerId is required.")]
        public long LearnerId { get; set; }
    }



}
}