using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.LearningResourceType
{
    public class PatchLearningResourceTypeRequestDto
    {
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Name must be between 1 and 100 characters.")]
        public string? Name { get; set; } = null!;

        [StringLength(100, MinimumLength = 1, ErrorMessage = "UnitType must be between 1 and 100 characters.")]
        public string? UnitType { get; set; } = null!;
    }

}