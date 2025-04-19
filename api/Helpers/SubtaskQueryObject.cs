using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace api.Helpers
{
    public class SubtaskQueryObject
    {
        // 🔍 Filters
        public string? Title { get; set; }
        public string? Status { get; set; } // e.g. Not-Started, In-Progress, Done
        public bool? IsDeleted { get; set; } = false;


        // 🔃 Sorting
        public string? SortBy { get; set; } = "CreatedAt"; // Title, Status, UpdatedAt
        public bool IsDescending { get; set; } = true;

        // 📄 Pagination
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10; 
           
}}