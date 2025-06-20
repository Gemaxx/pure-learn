using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.TaskType
{
    public class CreateTaskTypeDto
    {
        [Required]
        [StringLength(255, ErrorMessage = "Name must be provided and cannot exceed 255 characters.")]
        public string Name { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        // Accept base64 encoded string for icon, default to null
        public string? Icon { get; set; } = null;
    }
}
