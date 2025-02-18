using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Category
{
    public class CategoryDetailDto : CategoryDto
    {
        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public long? ParentCategoryId { get; set; }

        public long LearnerId { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}