using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.KanbanStatus
{
    public class CreateKanbanStatusDto
    {
        [Required]
        [StringLength(255, ErrorMessage = "Name must be provided and cannot exceed 255 characters.")]
        public string Name { get; set; } = "Default Status";

        [Range(1, int.MaxValue, ErrorMessage = "MaxTasks must be a positive number.")]
        public int? MaxTasks { get; set; }
    }
}