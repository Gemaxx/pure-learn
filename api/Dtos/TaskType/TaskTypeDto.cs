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
        public string Name { get; set; } = "Default Task Type";

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        // Optionally expose additional fields, e.g., an icon (base64 string or URL)
        public byte[]? Icon { get; set; }
    }
}