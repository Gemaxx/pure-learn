using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Task
{
    public class TaskDetailDto : TaskDto
    {
        // Optional actual time spent on the task
        public TimeOnly? TimeSpent { get; set; }

        // Recurrence options
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

        // Audit fields (set automatically)
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}