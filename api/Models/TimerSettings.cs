using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class TimerSettings
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public long UserId { get; set; }

        [Required]
        public int FocusMinutes { get; set; }

        [Required]
        public int ShortBreakMin { get; set; }

        [Required]
        public int LongBreakMin { get; set; }

        [Required]
        public int CyclesBeforeLongBreak { get; set; }
    }
} 