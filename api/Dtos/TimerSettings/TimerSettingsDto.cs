namespace api.Dtos.TimerSettings
{
    public class TimerSettingsDto
    {
        public int FocusMinutes { get; set; }
        public int ShortBreakMin { get; set; }
        public int LongBreakMin { get; set; }
        public int CyclesBeforeLongBreak { get; set; }
    }

    public class UpdateTimerSettingsDto : TimerSettingsDto {}
} 