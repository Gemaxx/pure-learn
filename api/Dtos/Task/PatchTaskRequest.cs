using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Task
{
    public class PatchTaskRequest
    {
        
        public long? GoalId { get; set; }
        public long? KanbanStatusId { get; set; }
        public long? TypeId { get; set; }

        [StringLength(255, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 255 characters.")]
        public string? Title { get; set; }

        public DateOnly? DueDate { get; set; }

        public TimeOnly? EstimatedTime { get; set; }

        public TimeOnly? TimeSpent { get; set; }

        [StringLength(50, ErrorMessage = "EisenhowerStatus cannot exceed 50 characters.")]
        public string? EisenhowerStatus { get; set; }

        [StringLength(50, ErrorMessage = "TimeTaskRelated cannot exceed 50 characters.")]
        public string? TimeTaskRelated { get; set; }

        [StringLength(50, ErrorMessage = "RepeatFrequency cannot exceed 50 characters.")]
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
        public string? RepeatEnds { get; set; }

        public DateOnly? RepeatEndDate { get; set; }
        public int? RepeatEndOccurrences { get; set; }
    }
}