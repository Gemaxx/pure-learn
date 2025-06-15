using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Subtask
{
    public class SubtaskDto
    {
        public long Id { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 1, ErrorMessage = "Subtask title must be between 1 and 255 characters.")]
        public string Title { get; set; } = "Untitled Subtask";

        [Required]
        [StringLength(50, ErrorMessage = "Status cannot exceed 50 characters.")]
        public bool IsCompleted { get; set; }

        // Optionally include audit fields if you want to expose them
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}