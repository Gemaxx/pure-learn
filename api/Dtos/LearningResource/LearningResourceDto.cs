using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Dtos.LearningResource
{
    public class LearningResourceDto
    {
        public long Id { get; set; }

        [ForeignKey("Goal")]
        public long? GoalId { get; set; }
        
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title length can't be more than 100 characters.")]
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "TypeId is required.")]
        [ForeignKey("LearningResourceType")]
        public string? Status { get; set; }
        public long TypeId { get; set; }


        [Range(1, int.MaxValue, ErrorMessage = "TotalUnits must be greater than 0.")]
        public int? TotalUnits { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Progress cannot be negative.")]
        public int? Progress { get; set; }
        public double ProgressPercentage {get; set;}
        public string? Link { get; set; } 
    }
}