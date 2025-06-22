using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class TimerSettings
    {
        [Key]
        [Column("Id")]
        public long Id { get; set; }

        [Required]
        [Column("LearnerId")]
        public long LearnerId { get; set; }

        [ForeignKey("LearnerId")]
        public Learner Learner { get; set; } = null!;

        [Required]
        [Column("FocusMinutes")]
        public int FocusMinutes { get; set; }

        [Required]
        [Column("ShortBreakMin")]
        public int ShortBreakMin { get; set; }

        [Required]
        [Column("LongBreakMin")]
        public int LongBreakMin { get; set; }

        [Required]
        [Column("CyclesBeforeLongBreak")]
        public int CyclesBeforeLongBreak { get; set; }
    }
} 