using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Task
{
    public class CreateTaskRequestDto
    {
        [Required]
        public long GoalId { get; set; }

        [Required]
        public long KanbanStatusId { get; set; }

        [Required]
        public long TypeId { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 255 characters.")]
        public string Title { get; set; } = "Untitled Task";

        [Required]
        [StringLength(50, ErrorMessage = "EisenhowerStatus cannot exceed 50 characters.")]
        public string EisenhowerStatus { get; set; } ="Urgent & Important";

        [Required]
        [StringLength(50, ErrorMessage = "TimeTaskRelated cannot exceed 50 characters.")]
        public string TimeTaskRelated { get; set; } = "Today";

        // Optional fields
        public DateOnly? DueDate { get; set; }
        public TimeOnly? EstimatedTime { get; set; }
        public TimeOnly? TimeSpent { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "RepeatFrequency cannot exceed 50 characters.")]
        public string RepeatFrequency { get; set; } = "None"; // Allowed: "None", "Daily", etc.

        public int? RepeatInterval { get; set; }
        public bool RepeatOnSunday { get; set; } = false;
        public bool RepeatOnMonday { get; set; } = false;
        public bool RepeatOnTuesday { get; set; } = false;
        public bool RepeatOnWednesday { get; set; } = false;
        public bool RepeatOnThursday { get; set; } = false;
        public bool RepeatOnFriday { get; set; } = false;
        public bool RepeatOnSaturday { get; set; } = false;

        [StringLength(50, ErrorMessage = "RepeatEnds cannot exceed 50 characters.")]
        public string? RepeatEnds { get; set; }

        public DateOnly? RepeatEndDate { get; set; }
        public int? RepeatEndOccurrences { get; set; }
    }
}