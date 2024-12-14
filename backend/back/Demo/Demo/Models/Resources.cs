using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Demo.Models
{
    public class Resources
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public int Progress { get; set; }
        public int Tudone { get; set; }
        public string Link { get; set; }
        [ForeignKey("Learner")]
        public int Learnerid { get; set; }
        [ForeignKey("Category")]
        public int Categoryid { get; set; }
        [JsonIgnore]
        public virtual Learner Learner { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }
        public int Percentage
        {
            get
            {
                return Tudone != 0 ? (Progress * 100) / Tudone : 0; 
            }
        }

        public DateTime Createdat { get; set; }
        public DateTime Updatedat { get; set; }

    }
}
