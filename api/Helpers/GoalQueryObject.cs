using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class GoalQueryObject
    {
        
        public bool IsDeleted { get; set; } = false;
        public long? CategoryId { get; set; }
        public string? Status { get; set; }

        public string? Term { get; set;}

        public string? SortBy { get; set; } = null;

        public bool IsSortAscending { get; set; } = true;
    }
}