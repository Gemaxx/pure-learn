using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.LearningResource
{
    public class PatchLearningResourceRequestDto
    {
        [ForeignKey("Goal")]
        public long? GoalId { get; set; }

        [StringLength(100, ErrorMessage = "Title length can't be more than 100 characters.")]
        public string? Title { get; set; } = null!;

        [RegularExpression("Not-Started|In-Progress|On-Hold|Done|Canceled", ErrorMessage = "Status must be Not-Started, In-Progress, On-Hold, Done, or Canceled.")]
        public  string? Status { get; set; } = "Not-Started";

        [ForeignKey("LearningResourceType")]
        public long? TypeId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "TotalUnits must be greater than 0.")]
        public int? TotalUnits { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Progress cannot be negative.")]
        public int? Progress { get; set; }

        [Url(ErrorMessage = "Link must be a valid URL.")]
        public string? Link { get; set; } 
    }
}