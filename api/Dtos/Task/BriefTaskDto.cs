using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Task
{
    public class BriefTaskDto
    {
    public long Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public string Status { get; set; } = null!;
    }
}