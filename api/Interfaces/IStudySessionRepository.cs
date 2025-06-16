using api.Models;
using api.Helpers;
using System.Threading.Tasks;

namespace api.Interfaces;

public interface IStudySessionRepository
{
    Task<List<StudySession>> GetByLearnerAsync(long learnerId);
    Task<List<StudySession>> GetByLearnerAsync(long learnerId, StudySessionQueryObject query);
    Task<StudySession?> GetByIdAsync(long id);
    Task<StudySession> CreateAsync(StudySession session);
    Task<StudySession> UpdateAsync(StudySession session);
    Task<bool> DeleteAsync(long id);
} 