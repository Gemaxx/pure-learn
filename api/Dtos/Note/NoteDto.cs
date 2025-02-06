using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Note
{
    public class NoteDto
    {
        public long Id { get; set; }

        public string Title { get; set; } = null!;
    }
}