using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class LearningResourceTypeQueryObject
    {
        public string? Name { get; set; }
        public bool IsDeleted { get; set; } = false;   
    }
}