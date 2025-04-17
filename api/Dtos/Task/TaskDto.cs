using System;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Task
{
    public class TaskDto
    {
        public long Id { get; set; }
        public long GoalId { get; set; }
        public long KanbanStatusId { get; set; }
        public long TypeId { get; set; }

        public TimeOnly? TimeSpent { get; set; }
        
        [Required]
        [StringLength(255, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 255 characters.")]
        public string Title { get; set; } = "Untitled Task";

        [Required(ErrorMessage = "DueDate is required.")]
        public DateOnly? DueDate { get; set; }

        [Required(ErrorMessage = "EstimatedTime is required.")]
        public TimeOnly? EstimatedTime { get; set; }

        [Required(ErrorMessage = "EisenhowerStatus is required.")]
        [StringLength(50, ErrorMessage = "EisenhowerStatus cannot exceed 50 characters.")]
        public string EisenhowerStatus { get; set; } = "Urgent & Important";

        [Required(ErrorMessage = "TimeTaskRelated is required.")]
        [StringLength(50, ErrorMessage = "TimeTaskRelated cannot exceed 50 characters.")]
        public string TimeTaskRelated { get; set; } = "Today";

        [Required(ErrorMessage = "RepeatFrequency is required.")]
        [StringLength(50, ErrorMessage = "RepeatFrequency cannot exceed 50 characters.")]
        public string RepeatFrequency { get; set; } = "None";

        public int? RepeatInterval { get; set; } = 0;
        public bool? RepeatOnSunday { get; set; } = false; 
        public bool? RepeatOnMonday { get; set; } = false;
        public bool? RepeatOnTuesday { get; set; } = false;
        public bool? RepeatOnWednesday { get; set; } = false;
        public bool? RepeatOnThursday { get; set; } = false;
        public bool? RepeatOnFriday { get; set; } = false;
        public bool? RepeatOnSaturday { get; set; } = false;

        [StringLength(50, ErrorMessage = "RepeatEnds cannot exceed 50 characters.")]
        public string? RepeatEnds { get; set; }

        public DateOnly? RepeatEndDate { get; set; }
        public int? RepeatEndOccurrences { get; set; }
        [RegularExpression("Low|Medium|High", ErrorMessage = "Priority must be Low, Medium, or High.")]
        public string Priority { get; set; } = "Medium";

    }
}
