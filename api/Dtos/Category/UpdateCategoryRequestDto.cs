using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Category
{
    public class UpdateCategoryRequestDto
    {
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public string Color { get; set; } = null!;
    }
}