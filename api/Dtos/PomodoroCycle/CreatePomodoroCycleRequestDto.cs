namespace api.Dtos.PomodoroCycle
{
    public class CreatePomodoroCycleRequestDto
    {
        public long StudySessionId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string BreakType { get; set; } = "Short";
        public DateTime? BreakStart { get; set; }
        public DateTime? BreakEnd { get; set; }
    }
} 