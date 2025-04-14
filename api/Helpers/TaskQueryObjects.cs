using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class TaskQueryObjects
    {
        public string? Title { get; set; }
        public DateOnly? DueDate { get; set; }
        public string? EisenhowerStatus { get; set; }
        public long? CategoryId { get; set; } 
        public long? GoalId { get; set; }
        public string? Status { get; set; } // Not-Started, In-Progress, Done, etc.
        public string? Priority { get; set; } // Low, Medium, High

        public bool? IsDeleted { get; set; } = false;
        public string? SortBy { get; set; } = "CreatedAt"; 
        public bool IsDescending { get; set; } = true;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public long? KanbanStatusId { get; set; }

        // 🧠 Range filters
        public TimeOnly? EstimatedTimeMin { get; set; }
        public TimeOnly? EstimatedTimeMax { get; set; }
        public TimeOnly? TimeSpentMin { get; set; }
        public TimeOnly? TimeSpentMax { get; set; }
  public DateOnly? DueDateStart { get; set; }
    public DateOnly? DueDateEnd { get; set; }
  
 
    }
}