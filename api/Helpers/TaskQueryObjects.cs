using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class TaskQueryObjects
    {
        public string? Title { get; set; }
        public long? GoalId { get; set; }
        public long? KanbanStatusId { get; set; } 
        public long? TypeId { get; set; }
        public string? EisenhowerStatus { get; set; }
        public string? TimeTaskRelated { get; set; }
        public DateOnly? DueDate { get; set; }

    //  public long? CategoryId { get; set; } 
        public bool? IsDeleted { get; set; } = false;
        public string? SortBy { get; set; } = "CreatedAt"; 
        public bool IsDescending { get; set; } = true;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}