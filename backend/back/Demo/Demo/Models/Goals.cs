using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Demo.Models
{
    public class Goals
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Motivation { get; set; }

        public string Status { get; set; }

        public int Priority { get; set; }
        [ForeignKey("Learner")]
        public int Learnerid { get; set; }
        [JsonIgnore]
        public virtual Learner Learner { get; set; }
        public DateTime Createdat { get; set; }
        public DateTime Updatedat { get; set; }
       





    }
}
