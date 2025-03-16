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
        public string Name { get; set; } = "Default Task Type";

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        // You can include Icon as base64 encoded string or leave it out if handling files differently.
        public byte[]? Icon { get; set; }
    }
}