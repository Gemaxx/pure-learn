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
        [Required]
        public long GoalId { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title length can't be more than 100 characters.")]
        public string Title { get; set; } = null!;
       
        [RegularExpression("Not-Started|In-Progress|On-Hold|Done|Canceled", ErrorMessage = "Status must be Not-Started, In-Progress, On-Hold, Done, or Canceled.")]
        public  string? Status { get; set; } = "Not-Started";


        [Required(ErrorMessage = "TypeId is required.")]
        [ForeignKey("LearningResourceType")]               
        public long TypeId { get; set; }
    
        [Range(1, int.MaxValue, ErrorMessage = "TotalUnits must be greater than 0.")]
        public int? TotalUnits { get; set; }

        [CustomValidation(typeof(CreateLearningResourceRequestDto), nameof(ValidateProgress))]
        public int? Progress { get; set; }

        public static ValidationResult? ValidateProgress(int? progress, ValidationContext context)
        {            var instance = (CreateLearningResourceRequestDto)context.ObjectInstance;
            if (progress < 0 || (instance.TotalUnits.HasValue && progress > instance.TotalUnits.Value))
            {
                return new ValidationResult("Progress cannot be negative or greater than TotalUnits.");
            }
            return ValidationResult.Success;
        }

        [Url(ErrorMessage = "Link must be a valid URL.")]
        public string? Link { get; set; }  = null;      

    }
}