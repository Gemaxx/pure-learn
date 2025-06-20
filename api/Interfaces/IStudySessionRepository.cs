using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;
using api.Helpers;

namespace api.Interfaces;

public interface IStudySessionRepository
{
    Task<List<StudySession>> GetAllAsync(StudySessionQueryObject query);
    Task<StudySession?> GetByIdAsync(long id);
    Task<StudySession?> GetActiveSessionAsync(long learnerId);
    Task<StudySession> CreateAsync(StudySession session);
    Task<StudySession?> UpdateAsync(long id, StudySession session);
    Task<StudySession?> DeleteAsync(long id);

    // Pomodoro Cycle Methods
    Task<PomodoroCycle> CreateCycleAsync(PomodoroCycle cycle);
    Task<PomodoroCycle?> UpdateCycleAsync(long cycleId, PomodoroCycle cycle);
} 