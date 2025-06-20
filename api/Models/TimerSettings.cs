using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class TimerSettings
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string UserId { get; set; } = null!;

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; } = null!;

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