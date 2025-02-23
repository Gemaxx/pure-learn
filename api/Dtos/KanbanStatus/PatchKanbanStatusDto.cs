using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.KanbanStatus
{
    public class PatchKanbanStatusDto
    {
        [StringLength(255, ErrorMessage = "Name cannot exceed 255 characters.")]
        public string? Name { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "MaxTasks must be a positive number.")]
        public int? MaxTasks { get; set; }
    }
}