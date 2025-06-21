namespace api.Dtos.Task
{
    public class TaskDetailsDto
    {
        public long Id { get; set; }
        public long? GoalId { get; set; }


        public string Title { get; set; } = "Untitled Task";
        public bool? IsCompleted { get; set; } = false;  


        public long? TypeId { get; set; }

        public long? KanbanStatusId { get; set; }

        public string EisenhowerStatus { get; set; } = "Urgent & Important";

        /*
        public DateOnly? DueDate { get; set; }

        public TimeOnly? EstimatedTime { get; set; }

        public TimeOnly? TimeSpent { get; set; }

        public string RepeatFrequency { get; set; } = "None";

        public int? RepeatInterval { get; set; } = 0;

        public bool? RepeatOnSunday { get; set; } = false;

        public bool? RepeatOnMonday { get; set; } = false;

        public bool? RepeatOnTuesday { get; set; } = false;

        public bool? RepeatOnWednesday { get; set; } = false;

        public bool? RepeatOnThursday { get; set; } = false;

        public bool? RepeatOnFriday { get; set; } = false;

        public bool? RepeatOnSaturday { get; set; } = false;

        public string? RepeatEnds { get; set; }

        public DateOnly? RepeatEndDate { get; set; }

        public int? RepeatEndOccurrences { get; set; }
        */

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
     

        // public long? CategoryId { get; set; }

        // public long? SubgoalId { get; set; }

        // public long? LearningResourceId { get; set; }

        public DateTime? DeletedAt { get; set; }

        public bool IsDeleted { get; set; }
        public ICollection<Dtos.Subtask.SubtaskDto> SubTasks { get; set; } = new List<Dtos.Subtask.SubtaskDto>();
    }
}
