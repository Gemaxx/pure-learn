using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Task
{
    public class PatchTaskRequestDto
    {
        public long? GoalId { get; set; }
        public long? KanbanStatusId { get; set; }
        public long? TypeId { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 100 characters.")]
        public string? Title { get; set; }
        public bool? IsCompleted { get; set; } 


        public DateOnly? DueDate { get; set; }

        public TimeOnly? EstimatedTime { get; set; }

        [CompareTime(nameof(EstimatedTime), ErrorMessage = "Time spent cannot exceed estimated time.")]
        public TimeOnly? TimeSpent { get; set; }

        [StringLength(50, ErrorMessage = "EisenhowerStatus cannot exceed 50 characters.")]
        [RegularExpression(
            "Not Urgent & Not Important|Urgent but Not Important|Not Urgent but Important|Urgent & Important",
            ErrorMessage = "Invalid EisenhowerStatus value."
        )]
        public string? EisenhowerStatus { get; set; }

        [StringLength(50, ErrorMessage = "RepeatFrequency cannot exceed 50 characters.")]
        [RegularExpression(
            "Custom|Annually|Monthly|Weekly|Daily|None",
            ErrorMessage = "Invalid RepeatFrequency value."
        )]
        public string? RepeatFrequency { get; set; }

        public int? RepeatInterval { get; set; }
        public bool? RepeatOnSunday { get; set; }
        public bool? RepeatOnMonday { get; set; }
        public bool? RepeatOnTuesday { get; set; }
        public bool? RepeatOnWednesday { get; set; }
        public bool? RepeatOnThursday { get; set; }
        public bool? RepeatOnFriday { get; set; }
        public bool? RepeatOnSaturday { get; set; }

        [StringLength(50, ErrorMessage = "RepeatEnds cannot exceed 50 characters.")]
        [RegularExpression(
            "After Occurrences|On Date|Never",
            ErrorMessage = "Invalid RepeatEnds value."
        )]
        public string? RepeatEnds { get; set; }

        public DateOnly? RepeatEndDate { get; set; }
        public int? RepeatEndOccurrences { get; set; }

    }

    // Custom validation attribute for TimeSpent
    public class CompareTimeAttribute : ValidationAttribute
    {
        private readonly string _comparisonProperty;

        public CompareTimeAttribute(string comparisonProperty)
        {
            _comparisonProperty = comparisonProperty;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var currentValue = value as TimeOnly?;
            var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

            if (property == null)
                return new ValidationResult($"Property '{_comparisonProperty}' not found.");

            var comparisonValue = property.GetValue(validationContext.ObjectInstance) as TimeOnly?;

            if (currentValue.HasValue && comparisonValue.HasValue && currentValue > comparisonValue)
                return new ValidationResult(ErrorMessage);

            return ValidationResult.Success;
        }
    }
}
