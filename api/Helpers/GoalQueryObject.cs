using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class GoalQueryObject
    {
        
        public string? Title { get; set; }
        public bool IsDeleted { get; set; } = false;
        public long? CategoryId { get; set; }
        public string? Status { get; set; }

        public string? Term { get; set;} // Short-Term, Medium-Term, Long-Term

        public bool IsSortAscending { get; set; } = true;
        public string? SortBy { get; set; } = "CreatedAt"; 
        public bool IsDescending { get; set; } = true;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}