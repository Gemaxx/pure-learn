using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Dtos.LearningResourceType
{

    public class LearningResourceTypeDetailDto
    {
        public long Id { get; set; }

        [ForeignKey("Learner")]
        public long LearnerId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Name must be between 1 and 100 characters.")]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "UnitType must be between 1 and 100 characters.")]
        public string UnitType { get; set; } = null!;
    }
}