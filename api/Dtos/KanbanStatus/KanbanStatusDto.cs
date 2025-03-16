using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.KanbanStatus
{
    public class KanbanStatusDto
    {
        public long Id { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "Name cannot exceed 255 characters.")]
        public string Name { get; set; } = "Default Status";

        // Maximum number of tasks allowed for this status.
        [Range(1, int.MaxValue, ErrorMessage = "MaxTasks must be a positive number.")]
        public int? MaxTasks { get; set; }

        // Optionally include audit fields if needed.
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}