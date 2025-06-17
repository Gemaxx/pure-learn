namespace api.Helpers;

public static class DateHelper
{
    public static DateOnly GetWeekStart(DateTime dateTime)
    {
        var monday = dateTime.Date.AddDays(-(int)dateTime.DayOfWeek + (int)DayOfWeek.Monday);
        return DateOnly.FromDateTime(monday);
    }
} 