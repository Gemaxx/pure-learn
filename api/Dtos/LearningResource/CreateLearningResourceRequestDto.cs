using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Dtos.LearningResourceType;

namespace api.Dtos.LearningResource
{
    public class CreateLearningResourceRequestDto
    {        
        [ForeignKey("Goal")]
        public long? GoalId { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title length can't be more than 100 characters.")]
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "TypeId is required.")]
        [ForeignKey("LearningResourceType")]
       
       // Option 1: Specify an existing LearningResourceType
        public long TypeId { get; set; }

        // Option 2: Provide data to create a new LearningResourceType
        public CreateLearningResourceTypeRequestDto? NewLearningResourceType { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "TotalUnits must be greater than 0.")]
        public int? TotalUnits { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Progress cannot be negative.")]
        public int? Progress { get; set; }

        [Url(ErrorMessage = "Link must be a valid URL.")]
        public string? Link { get; set; }        
    }
}