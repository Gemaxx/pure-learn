using api.Models;
using System.Threading.Tasks;

namespace api.Interfaces;

public interface IPomodoroInsightRepository
{
    System.Threading.Tasks.Task<PomodoroInsight?> GetCurrentWeekAsync(long learnerId);
    System.Threading.Tasks.Task<List<PomodoroInsight>> GetAllAsync(long learnerId);
    System.Threading.Tasks.Task RecalculateAsync(long learnerId);
} 