using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Demo.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Colour { get; set; }

        [ForeignKey("Learner")]
        public int Learnerid { get; set; }
        [JsonIgnore]
        public Learner learner { get; set; }

        public DateTime Createdat { get; set; }
        public DateTime Updatedat { get; set; }
        public virtual List<Task> task { get; set; }
        public virtual List<Resources> Resources { get; set; }


    }
}
