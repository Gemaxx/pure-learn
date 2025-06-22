using System.Linq.Expressions;
using api.Models;

namespace api.Helpers;

public class StudySessionQueryObject
{
    public long? LearnerId { get; set; }
    public long? TaskId { get; set; }
    public bool IsCompleted { get; set; } = false;
    public string SortBy { get; set; } = "StartTime";
    public bool IsDescending { get; set; } = true;

    // Filtering expression
    public Expression<Func<StudySession, bool>> ToExpression()
    {
        var predicate = PredicateBuilder.True<StudySession>();
        if (LearnerId.HasValue)
        {
            predicate = predicate.And(s => s.LearnerId == LearnerId.Value);
        }
        if (TaskId.HasValue)
        {
            predicate = predicate.And(s => s.TaskId == TaskId.Value);
        }
        predicate = predicate.And(s => s.IsCompleted == IsCompleted);
        return predicate;
    }
} 