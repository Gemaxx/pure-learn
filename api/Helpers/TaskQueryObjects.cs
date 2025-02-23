using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class TaskQueryObjects
    {
        public string? Title { get; set; }
        public DateOnly? DueDate { get; set; }
        public string? EisenhowerStatus { get; set; }
    }
}