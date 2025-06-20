using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.TaskType
{
    public class TaskTypeDto
    {
        public long Id { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "Name cannot exceed 255 characters.")]
        public string Name { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        // Return base64 encoded string for icon
        public string? Icon { get; set; }
    }
}