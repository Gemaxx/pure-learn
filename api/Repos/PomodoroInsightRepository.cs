using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace api.Repos;

public class PomodoroInsightRepository : IPomodoroInsightRepository
{
    private readonly PureLearnDbContext _context;

    public PomodoroInsightRepository(PureLearnDbContext context)
    {
        _context = context;
    }

    public async System.Threading.Tasks.Task<PomodoroInsight?> GetByLearnerIdAsync(long learnerId)
    {
        return await _context.PomodoroInsights
                             .FirstOrDefaultAsync(i => i.LearnerId == learnerId);
    }

    public async System.Threading.Tasks.Task RecalculateInsightsAsync(long learnerId)
    {
        var insight = await _context.PomodoroInsights.FirstOrDefaultAsync(i => i.LearnerId == learnerId);
        if (insight == null)
        {
            insight = new PomodoroInsight { LearnerId = learnerId };
            await _context.PomodoroInsights.AddAsync(insight);
        }
        
        var sessions = await _context.StudySessions
                                     .Where(s => s.LearnerId == learnerId && s.IsCompleted)
                                     .Include(s => s.Task)
                                     .ToListAsync();

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var startOfWeek = today.AddDays(-(int)today.DayOfWeek); // Assuming Sunday is the first day

        insight.TotalPomodoros = sessions.Sum(s => s.CycleCount);
        insight.TotalFocusTime = sessions.Aggregate(TimeSpan.Zero, (total, s) => total + s.Duration);
        
        var weeklySessions = sessions.Where(s => DateOnly.FromDateTime(s.StartTime) >= startOfWeek).ToList();
        
        insight.WeeklyPomodoros = weeklySessions.Sum(s => s.CycleCount);
        insight.WeeklyFocusTime = weeklySessions.Aggregate(TimeSpan.Zero, (total, s) => total + s.Duration);
        insight.WeekOf = startOfWeek;

        await _context.SaveChangesAsync();
    }
} 