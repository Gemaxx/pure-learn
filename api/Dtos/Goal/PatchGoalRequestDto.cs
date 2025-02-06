using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Goal
{
    
    public class PatchGoalRequestDto
    {
        [StringLength(255, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 255 characters.")]
        public string? Title { get; set; }

        public string? Description { get; set; }
        public string? Motivation { get; set; }

        [RegularExpression("Short-Term|Medium-Term|Long-Term", ErrorMessage = "Term must be Short-Term, Medium-Term, or Long-Term.")]
        public string? Term { get; set; }

        [RegularExpression("Not-Started|In-Progress|On-Hold|Done|Canceled", ErrorMessage = "Status must be Not-Started, In-Progress, On-Hold, Done, or Canceled.")]
        public string? Status { get; set; }

        public DateOnly? CompletionDate { get; set; }
        public long? CategoryId { get; set; }
    }
}