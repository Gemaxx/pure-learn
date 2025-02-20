using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Note
{
    public class NoteDetailDto : NoteDto
    {
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        
        public long LearnerId { get; set; }
        // public long? CategoryId { get; set; }
        // public long? SubgoalId { get; set; }
        // public long? TaskId { get; set; }

        public bool IsDeleted { get; set; } = false;  }
}