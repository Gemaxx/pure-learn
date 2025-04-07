using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class LearningResourceQueryObject
    {
        public string? Title { get; set; }

        public bool IsDeleted { get; set; } = false;     
        public long? GoalId { get; set; }
        public long? TypeId { get; set; }
        public int? ProgressMin { get; set; }
        public int? ProgressMax { get; set; }
        public string? SortBy { get; set; } = "CreatedAt"; 
        public bool IsDescending { get; set; } = true;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}