using System;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Task
{
    public class CreateTaskRequestDto
    {
        [Required]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 100 characters.")]
        public string Title { get; set; } = "Untitled Task";

        public long? GoalId { get; set; }
        // public long? CategoryId { get; set; }
        // public long? SubgoalId { get; set; }
        // public long? LearningResourceId { get; set; }

        [Required]
        public long TypeId { get; set; }

        [Required]
        public long KanbanStatusId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "EisenhowerStatus cannot exceed 50 characters.")]
        [RegularExpression(
            "Not Urgent & Not Important|Urgent but Not Important|Not Urgent but Important|Urgent & Important",
            ErrorMessage = "Invalid EisenhowerStatus value."
        )]
        public string EisenhowerStatus { get; set; } = "Urgent & Important";

        [Required]
        [RegularExpression(
            "Someday|This Week|Tomorrow|Today",
            ErrorMessage = "Invalid TimeTaskRelated value."
        )]
        public string TimeTaskRelated { get; set; } = "Today";

        public DateOnly? DueDate { get; set; }
        public TimeOnly? EstimatedTime { get; set; }
        public TimeOnly? TimeSpent { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "RepeatFrequency cannot exceed 50 characters.")]
        [RegularExpression(
            "Custom|Annually|Monthly|Weekly|Daily|None",
            ErrorMessage = "Invalid RepeatFrequency value."
        )]
        public string RepeatFrequency { get; set; } = "None";

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
}