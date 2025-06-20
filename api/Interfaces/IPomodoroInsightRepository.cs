using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces;

public interface IPomodoroInsightRepository
{
    Task<PomodoroInsight?> GetByLearnerIdAsync(long learnerId);
    System.Threading.Tasks.Task RecalculateInsightsAsync(long learnerId);
} 