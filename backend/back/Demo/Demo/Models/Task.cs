using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Demo.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Tasktitle { get; set; }
        public string Status { get; set; }
        public int Priority { get; set; }
        public string Time_Task_Related { get; set; }
        public DateTime Createdat { get; set; }
        public DateTime Updatedat { get; set; }
        public int Estimatedtime { get; set; }
        public int Timespend { get; set; }
        public string Notestitle { get; set; }
        public string Notesbody { get; set; }

        [ForeignKey("Learner")]
        public int Learnerid { get; set; }
        [ForeignKey("Category")]
        public int Categoryid { get; set; }
        [JsonIgnore]
        public Learner learner { get; set; }
      
      


    }
}
