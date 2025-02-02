using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Goal
{
        public class UpdateGoalRequestDto
    {
        [StringLength(255, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 255 characters.")]
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;
        public string Motivation { get; set; } = null!;

        [RegularExpression("Short-Term|Medium-Term|Long-Term", ErrorMessage = "Term must be Short-Term, Medium-Term, or Long-Term.")]
        public string Term { get; set; } = null!;

        [RegularExpression("Not-Started|In-Progress|On-Hold|Done|Canceled", ErrorMessage = "Status must be Not-Started, In-Progress, On-Hold, Done, or Canceled.")]
        public string Status { get; set; } = null!;

        public DateOnly? CompletionDate { get; set; }
        public long? CategoryId { get; set; }
    }

}
