using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.TaskType
{
    public class PatchTaskTypeDto
    {
        [StringLength(255, ErrorMessage = "Name cannot exceed 255 characters.")]
        public string? Name { get; set; }

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        // Accept base64 encoded string for icon, default to null
        public string? Icon { get; set; } = null;
    }
}