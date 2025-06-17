using api.Models;

namespace api.Interfaces;

public interface IStudySessionRepository
{
    System.Threading.Tasks.Task<StudySession> CreateAsync(StudySession session);
    System.Threading.Tasks.Task<List<StudySession>> GetByLearnerIdAsync(long learnerId);
    System.Threading.Tasks.Task<bool> DeleteAsync(long id);
    System.Threading.Tasks.Task<bool> IncrementCycleCountAsync(long studySessionId);
} 