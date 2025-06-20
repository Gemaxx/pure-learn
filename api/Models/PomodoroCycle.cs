using api.Models;

namespace api.Models
{
    public class PomodoroCycle
    {
        public long Id { get; set; }                        // Cycle ID
        public long StudySessionId { get; set; }            // FK → StudySession
        public bool IsCompleted { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string BreakType { get; set; } = "Short";    // "Short" or "Long"
        public DateTime? BreakStart { get; set; }
        public DateTime? BreakEnd { get; set; }

        public virtual StudySession? StudySession { get; set; }
    }
} 