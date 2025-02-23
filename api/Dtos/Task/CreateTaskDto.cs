using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Task
{
    public class CreateTaskDto
    {
        [Required]
        [StringLength(255, MinimumLength = 0, ErrorMessage = "Title must be at most 255 characters.")]
        public string Title { get; set; } = "Untitled Task";

        [Required(ErrorMessage = "DueDate is required.")]
        public DateOnly? DueDate { get; set; }

        [Required(ErrorMessage = "EstimatedTime is required.")]
        public TimeOnly? EstimatedTime { get; set; }

        public TimeOnly? TimeSpent { get; set; }

        [Required(ErrorMessage = "EisenhowerStatus is required.")]
        [StringLength(50, ErrorMessage = "EisenhowerStatus cannot exceed 50 characters.")]
        public string EisenhowerStatus { get; set; } = "Urgent & Important";

        [Required(ErrorMessage = "TimeTaskRelated is required.")]
        [StringLength(50, ErrorMessage = "TimeTaskRelated cannot exceed 50 characters.")]
        public string TimeTaskRelated { get; set; } = "Today";

        [Required(ErrorMessage = "RepeatFrequency is required.")]
        [StringLength(50, ErrorMessage = "RepeatFrequency cannot exceed 50 characters.")]
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
        public string? RepeatEnds { get; set; }

        public DateOnly? RepeatEndDate { get; set; }
        public int? RepeatEndOccurrences { get; set; }
    }
}