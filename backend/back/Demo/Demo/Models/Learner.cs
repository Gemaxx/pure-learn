using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Demo.Models
{
    public class Learner
    {
        public int Id { get; set; }

        public virtual List<Category> Categories { get; set; }
        public virtual List<Goals> Goal { get; set; }
        public virtual List<Task> task { get; set; }
      
        public virtual List<Resources> resources { get; set; }
       


    }
}
