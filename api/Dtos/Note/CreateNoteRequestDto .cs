using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Note
{
    public class CreateNoteRequestDto 
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "Title must be between 3 and 255 characters.")]
        public string Title { get; set; } = "Untitled Note";

        [Required(ErrorMessage = "Body is required.")]
        [MaxLength(5000, ErrorMessage = "Body cannot exceed 5000 characters.")]
        public string Body { get; set; } = null!;

        public long LearnerId { get; set; }

        public long? CategoryId { get; set; }
        public long? GoalId { get; set; }
        public long? SubgoalId { get; set; }
        public long? TaskId { get; set; }
    }
}