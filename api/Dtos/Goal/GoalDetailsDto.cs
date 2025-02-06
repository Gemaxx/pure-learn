using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.LearningResource;
using api.Dtos.Note;
using api.Dtos.Task;
using api.Models;

namespace api.Dtos.Goal
{
     public class GoalDetailDto : GoalDto
    {
        [Required(ErrorMessage = "Description is required.")]
        public required string Description { get; set; }

        [Required(ErrorMessage = "Motivation is required.")]
        public required string Motivation { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [Required(ErrorMessage = "CategoryId is required.")]
        public long? CategoryId { get; set; } = null!;
        public string? CategoryName { get; set; }

        public List<TaskDto> Tasks { get; set; } = new();
        public List<LearningResourceDto> LearningResources { get; set; } = new();

        public List<NoteDto> Notes { get; set; } = new();
    }
}