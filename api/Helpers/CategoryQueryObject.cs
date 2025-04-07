using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class CategoryQueryObject
    {
        public string? Title { get; set; }

        public bool IsDeleted { get; set; } = false;
        public string? SortBy { get; set; } = "CreatedAt";  // Default sorting
        public bool IsDescending { get; set; } = true; // Default to newest first
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

    }
}