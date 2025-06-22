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

    public async Task<PomodoroInsight?> GetByLearnerIdAsync(long learnerId)
    {
        return await _context.PomodoroInsight
            .FirstOrDefaultAsync(i => i.LearnerId == learnerId);
    }

    public async Task<PomodoroInsight> CreateInsightAsync(PomodoroInsight insight)
    {
        await _context.PomodoroInsight.AddAsync(insight);
        await _context.SaveChangesAsync();
        return insight;
    }

    public async Task<PomodoroInsight> UpdateInsightAsync(PomodoroInsight insight)
    {
        _context.PomodoroInsight.Update(insight);
        await _context.SaveChangesAsync();
        return insight;
    }

    public async Task<IEnumerable<PomodoroInsight>> GetWeeklyInsightsAsync(long learnerId, DateTime weekOf)
    {
        var sessions = await _context.StudySession
            .Where(s => s.LearnerId == learnerId && s.CreatedAt >= weekOf && s.CreatedAt < weekOf.AddDays(7))
            .ToListAsync();

        // Calculate insights from sessions
        var totalPomodoros = sessions.Count;
        var totalFocusTime = sessions.Sum(s => (s.EndTime - s.StartTime)?.TotalMinutes ?? 0);

        var insight = new PomodoroInsight
        {
            LearnerId = learnerId,
            TotalPomodoros = totalPomodoros,
            TotalFocusTime = TimeSpan.FromMinutes(totalFocusTime),
            WeeklyPomodoros = totalPomodoros,
            WeeklyFocusTime = TimeSpan.FromMinutes(totalFocusTime),
            WeekOf = DateOnly.FromDateTime(weekOf)
        };

        return new List<PomodoroInsight> { insight };
    }

    public async System.Threading.Tasks.Task RecalculateInsightsAsync(long learnerId)
    {
        var insight = await _context.PomodoroInsight.FirstOrDefaultAsync(i => i.LearnerId == learnerId);
        if (insight == null)
        {
            insight = new PomodoroInsight { LearnerId = learnerId };
            await _context.PomodoroInsight.AddAsync(insight);
        }
        
        var sessions = await _context.StudySession
                                     .Where(s => s.LearnerId == learnerId && s.IsCompleted)
                                     .Include(s => s.Task)
                                     .ToListAsync();

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var startOfWeek = today.AddDays(-(int)today.DayOfWeek); // Assuming Sunday is the first day

        insight.TotalPomodoros = sessions.Sum(s => s.CycleCount);
        insight.TotalFocusTime = TimeSpan.FromMinutes(sessions.Sum(s => s.Duration.TotalMinutes));
        
        var weeklySessions = sessions.Where(s => DateOnly.FromDateTime(s.StartTime) >= startOfWeek).ToList();
        
        insight.WeeklyPomodoros = weeklySessions.Sum(s => s.CycleCount);
        insight.WeeklyFocusTime = TimeSpan.FromMinutes(weeklySessions.Sum(s => s.Duration.TotalMinutes));
        insight.WeekOf = startOfWeek;

        await _context.SaveChangesAsync();
    }
} 