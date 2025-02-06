using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Task
{
   

    public class TaskDto
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        public  string Title { get; set; } = null!;

    }

   
}