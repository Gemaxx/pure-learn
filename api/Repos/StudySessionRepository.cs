using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using api.Helpers;

namespace api.Repos;

public class StudySessionRepository : IStudySessionRepository
{
    private readonly PureLearnDbContext _context;

    public StudySessionRepository(PureLearnDbContext context)
    {
        _context = context;
    }

    public async Task<List<StudySession>> GetAllAsync(StudySessionQueryObject query)
    {
        var sessions = _context.StudySessions
                                .Include(s => s.Learner)
                                .Include(s => s.Task)
                                .AsQueryable();

        sessions = sessions.Where(query.ToExpression());

        if (!string.IsNullOrWhiteSpace(query.SortBy))
        {
            if (query.SortBy.Equals("StartTime", System.StringComparison.OrdinalIgnoreCase))
            {
                sessions = query.IsDescending ? sessions.OrderByDescending(s => s.StartTime) : sessions.OrderBy(s => s.StartTime);
            }
        }
        
        return await sessions.ToListAsync();
    }

    public async Task<StudySession?> GetByIdAsync(long id)
    {
        return await _context.StudySessions
                             .Include(s => s.Learner)
                             .Include(s => s.Task)
                             .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<StudySession?> GetActiveSessionAsync(long learnerId)
    {
        return await _context.StudySessions
                             .FirstOrDefaultAsync(s => s.LearnerId == learnerId && !s.IsCompleted);
    }

    public async Task<StudySession> CreateAsync(StudySession session)
    {
        await _context.StudySessions.AddAsync(session);
        await _context.SaveChangesAsync();
        return session;
    }

    public async Task<StudySession?> UpdateAsync(long id, StudySession sessionUpdate)
    {
        var existingSession = await _context.StudySessions.FindAsync(id);
        if (existingSession == null) return null;
        
        existingSession.EndTime = sessionUpdate.EndTime;
        existingSession.IsCompleted = sessionUpdate.IsCompleted;
        // CycleCount is updated through CreateCycleAsync
        
        await _context.SaveChangesAsync();
        return existingSession;
    }

    public async Task<StudySession?> DeleteAsync(long id)
    {
        var session = await _context.StudySessions.FindAsync(id);
        if (session == null) return null;

        session.IsDeleted = true; // Soft delete
        await _context.SaveChangesAsync();
        return session;
    }

    public async Task<PomodoroCycle> CreateCycleAsync(PomodoroCycle cycle)
    {
        var session = await _context.StudySessions.FindAsync(cycle.StudySessionId);
        if (session != null)
        {
            session.CycleCount++;
        }
        
        await _context.PomodoroCycles.AddAsync(cycle);
        await _context.SaveChangesAsync();
        return cycle;
    }

    public async Task<PomodoroCycle?> UpdateCycleAsync(long cycleId, PomodoroCycle cycleUpdate)
    {
        var existingCycle = await _context.PomodoroCycles.FindAsync(cycleId);
        if (existingCycle == null) return null;

        existingCycle.IsCompleted = cycleUpdate.IsCompleted;
        existingCycle.EndTime = cycleUpdate.EndTime;
        existingCycle.BreakStart = cycleUpdate.BreakStart;
        existingCycle.BreakEnd = cycleUpdate.BreakEnd;
        
        await _context.SaveChangesAsync();
        return existingCycle;
    }
} 