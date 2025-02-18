using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Dtos.LearningResourceType;

namespace api.Dtos.LearningResource
{
    public class LearningResourceDetailDto
    {
        public long Id { get; set; }

        [ForeignKey("Goal")]
        public long? GoalId { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title length can't be more than 100 characters.")]
        public string Title { get; set; } = null!;

        // Learning Resource Type {   
        [Required(ErrorMessage = "TypeId is required.")]
        [ForeignKey("LearningResourceType")]
        public long TypeId { get; set; }

        public string TypeName { get; set; } = null!; // Store name directly
        public string TypeUnitType { get; set; } = null!; // Store unit type directly

        
        [Range(1, int.MaxValue, ErrorMessage = "TotalUnits must be greater than 0.")]
        public int? TotalUnits { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Progress cannot be negative.")]
        public int? Progress { get; set; }

        public double ProgressPercentage {get; set;}

        [Url(ErrorMessage = "Link must be a valid URL.")]
        public string? Link { get; set; } 

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        public bool IsDeleted { get; set; }   
    }
}