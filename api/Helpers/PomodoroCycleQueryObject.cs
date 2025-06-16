namespace api.Helpers
{
    public class PomodoroCycleQueryObject
    {
        public bool? IsCompleted { get; set; }
        public string? BreakType { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
} 