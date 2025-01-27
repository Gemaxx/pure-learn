using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Category
{
    public class CategoryDto
    {
        public long Id { get; set; }
        
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public string Color { get; set; } = null!;
    }
}