using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using api.Interfaces;
using api.Helpers;

namespace api.Repos;

public class PomodoroInsightRepository : IPomodoroInsightRepository
{
    private readonly PureLearnDbContext _context;
    public PomodoroInsightRepository(PureLearnDbContext context) => _context = context;

    public async System.Threading.Tasks.Task<PomodoroInsight?> GetCurrentWeekAsync(long learnerId)
    {
        var thisWeek = DateHelper.GetWeekStart(DateTime.UtcNow);
        return await _context.PomodoroInsights
            .FirstOrDefaultAsync(x => x.LearnerId == learnerId && x.WeekOf == thisWeek);
    }

    public async System.Threading.Tasks.Task<List<PomodoroInsight>> GetAllAsync(long learnerId)
    {
        return await _context.PomodoroInsights
            .Where(x => x.LearnerId == learnerId)
            .OrderByDescending(x => x.WeekOf)
            .ToListAsync();
    }

    public async System.Threading.Tasks.Task RecalculateAsync(long learnerId)
    {
        var cycles = await _context.PomodoroCycles
            .Include(c => c.StudySession)
            .Where(c => c.StudySession != null && c.StudySession.LearnerId == learnerId && c.IsCompleted)
            .ToListAsync();

        var grouped = cycles
            .GroupBy<PomodoroCycle, DateOnly>(c => DateHelper.GetWeekStart(c.StartTime))
            .Select(g => new PomodoroInsight
            {
                LearnerId = learnerId,
                WeekOf = g.Key,
                TotalPomodoros = g.Count(),
                TotalFocusTime = TimeSpan.FromMinutes(g.Sum(x => (x.EndTime - x.StartTime).TotalMinutes)),
                WeeklyPomodoros = g.Count(),
                WeeklyFocusTime = TimeSpan.FromMinutes(g.Sum(x => (x.EndTime - x.StartTime).TotalMinutes))
            });

        var existing = await _context.PomodoroInsights.Where(x => x.LearnerId == learnerId).ToListAsync();
        _context.PomodoroInsights.RemoveRange(existing);
        await _context.PomodoroInsights.AddRangeAsync(grouped.ToList());
        await _context.SaveChangesAsync();
    }
} 