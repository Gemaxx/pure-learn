using api.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class PomodoroCycle
    {
        [Column("id")]
        public long Id { get; set; }                        // Cycle ID
        [Column("study_session_id")]
        public long StudySessionId { get; set; }            // FK → StudySession
        [Column("is_completed")]
        public bool IsCompleted { get; set; }
        [Column("start_time")]
        public DateTime StartTime { get; set; }
        [Column("end_time")]
        public DateTime EndTime { get; set; }
        [Column("break_type")]
        public string BreakType { get; set; } = "Short";    // "Short" or "Long"
        [Column("break_start")]
        public DateTime? BreakStart { get; set; }
        [Column("break_end")]
        public DateTime? BreakEnd { get; set; }

        public virtual StudySession? StudySession { get; set; }
    }
} 