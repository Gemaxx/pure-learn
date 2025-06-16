using System;

namespace api.Helpers;

public class StudySessionQueryObject
{
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public bool? OnlyCompleted { get; set; }
    
    // Pagination
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
} 