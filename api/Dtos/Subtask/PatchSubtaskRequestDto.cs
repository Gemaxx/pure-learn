using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Subtask
{
    public class PatchSubtaskRequestDto
    {
        [StringLength(255, MinimumLength = 1, ErrorMessage = "Subtask title must be between 1 and 255 characters.")]
        public string? Title { get; set; }

        [StringLength(50, ErrorMessage = "Status cannot exceed 50 characters.")]
        public string? Status { get; set; }
    }
}