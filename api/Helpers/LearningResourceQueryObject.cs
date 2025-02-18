using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class LearningResourceQueryObject
    {
        public bool IsDeleted { get; set; } = false;     
        public long? GoalId { get; set; }

    }
}