namespace api.Dtos.PomodoroCycle
{
    public class PatchPomodoroCycleRequestDto
    {
        public bool? IsCompleted { get; set; }
        public DateTime? EndTime { get; set; }
        public DateTime? BreakStart { get; set; }
        public DateTime? BreakEnd { get; set; }
    }
} 