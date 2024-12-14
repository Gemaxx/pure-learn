using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Demo.Models
{
    public class Goal
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Motivation { get; set; }
        public string Status { get; set; }
        public DateTime? CompletionDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public long? CategoryID { get; set; }
        public long LearnerID { get; set; }
        public Learner Learner { get; set; }
        public Category Category { get; set; }
    }
}
