using System.Threading.Tasks;
using TaskEntity = api.Models.Task;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
namespace api.Repos;

public class StudySessionRepository : IStudySessionRepository
{
    private readonly PureLearnDbContext _context;

    public StudySessionRepository(PureLearnDbContext context) => _context = context;

    public async System.Threading.Tasks.Task<List<StudySession>> GetByLearnerIdAsync(long learnerId)
    {
        return await _context.StudySessions
            .Where(s => s.LearnerId == learnerId)
            .OrderByDescending(s => s.StartTime)
            .ToListAsync();
    }

    public async System.Threading.Tasks.Task<List<StudySession>> GetByLearnerAsync(long learnerId, StudySessionQueryObject query)
    {
        var sessions = _context.StudySessions
            .AsNoTracking()
            .Where(s => s.LearnerId == learnerId && !s.IsDeleted);

        if (query.From.HasValue)
            sessions = sessions.Where(s => s.StartTime >= query.From.Value);
        if (query.To.HasValue)
            sessions = sessions.Where(s => s.StartTime <= query.To.Value);
        if (query.OnlyCompleted == true)
            sessions = sessions.Where(s => s.IsCompleted);

        // Apply pagination
        if (query.PageSize > 0)
        {
            sessions = sessions
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize);
        }

        return await sessions.ToListAsync();
    }

    public async System.Threading.Tasks.Task<StudySession?> GetByIdAsync(long id)
    {
        return await _context.StudySessions.FindAsync(id);
    }

    public async System.Threading.Tasks.Task<StudySession> CreateAsync(StudySession session)
    {
        await _context.StudySessions.AddAsync(session);
        await _context.SaveChangesAsync();
        return session;
    }

    public async System.Threading.Tasks.Task<bool> UpdateAsync(StudySession session)
    {
        var existingSession = await _context.StudySessions.FindAsync(session.Id);
        if (existingSession == null)
            return false;

        existingSession.EndTime = session.EndTime;
        await _context.SaveChangesAsync();
        return true;
    }

    public async System.Threading.Tasks.Task<bool> IncrementCycleCountAsync(long studySessionId)
    {
        var session = await _context.StudySessions.FindAsync(studySessionId);
        if (session == null) return false;

        session.CycleCount++;
        session.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }

    public async System.Threading.Tasks.Task<bool> DeleteAsync(long id)
    {
        var session = await _context.StudySessions.FindAsync(id);
        if (session == null) return false;

        _context.StudySessions.Remove(session);
        await _context.SaveChangesAsync();
        return true;
    }
} 