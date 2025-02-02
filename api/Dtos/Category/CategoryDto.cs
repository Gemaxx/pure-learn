using System;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Category
{
    public class CategoryDto
    {
        public long Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 100 characters.")]
        public string Title { get; set; } = "Untitled Category";

        [Required]
        [RegularExpression(@"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = "Color must be a valid HEX code (e.g., #FFFFFF or #FFF).")]
        public string Color { get; set; } = "#808080";
    }
   
}
