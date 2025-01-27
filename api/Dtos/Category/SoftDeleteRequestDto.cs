using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Category
{
    public class SoftDeleteRequestDto
    {
         public DateTime? DeletedAt { get; set; } 
    }
}