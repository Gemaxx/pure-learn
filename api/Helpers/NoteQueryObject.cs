using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class NoteQueryObject
    {
         // Search by title (optional)
        public string? Title { get; set; }

        // Search by associated Category, Goal, Subgoal, or Task
        public long? CategoryId { get; set; }
        public long? GoalId { get; set; }
        public long? SubgoalId { get; set; }
        public long? TaskId { get; set; }

        // Sorting (e.g., "title", "createdAt", "updatedAt")
        public string? SortBy { get; set; } = "createdAt";
        public bool IsDescending { get; set; } = true;

        // Pagination
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public bool IsDeleted { get; set; } = false;

    }
}