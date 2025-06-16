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
    private readonly PureLearnDbContext _ctx;

    public StudySessionRepository(PureLearnDbContext ctx)
    {
        _ctx = ctx;
    }

    public async Task<List<StudySession>> GetByLearnerAsync(long learnerId)
    {
        return await _ctx.StudySessions
            .AsNoTracking()
            .Where(s => s.LearnerId == learnerId && !s.IsDeleted)
            .ToListAsync();
    }

    public async Task<List<StudySession>> GetByLearnerAsync(long learnerId, StudySessionQueryObject query)
    {
        var sessions = _ctx.StudySessions
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

    public async Task<StudySession?> GetByIdAsync(long id)
    {
        return await _ctx.StudySessions
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
    }

    public async Task<StudySession> CreateAsync(StudySession session)
    {
        await _ctx.StudySessions.AddAsync(session);
        await _ctx.SaveChangesAsync();
        return session;
    }

    public async Task<StudySession> UpdateAsync(StudySession session)
    {
        _ctx.StudySessions.Update(session);
        await _ctx.SaveChangesAsync();
        return session;
    }

    public async Task<bool> DeleteAsync(long id)
    {
        var session = await _ctx.StudySessions.FindAsync(id);
        if (session is not null)
        {
            session.IsDeleted = true;
            session.DeletedAt = DateTime.UtcNow;
            await _ctx.SaveChangesAsync();
            return true;
        }
        return false;
    }
} 