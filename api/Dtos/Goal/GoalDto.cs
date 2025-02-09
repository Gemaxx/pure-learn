using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Goal 
{
     public class GoalDto
    {
        public long Id { get; set; }

        public long? CategoryId { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 255 characters.")]
        public required string Title { get; set; }

        [Required]
        [RegularExpression("Short-Term|Medium-Term|Long-Term", ErrorMessage = "Term must be Short-Term, Medium-Term, or Long-Term.")]
        public required string Term { get; set; }

        [Required]
        [RegularExpression("Not-Started|In-Progress|On-Hold|Done|Canceled", ErrorMessage = "Status must be Not-Started, In-Progress, On-Hold, Done, or Canceled.")]
        public required string Status { get; set; }
    }
}