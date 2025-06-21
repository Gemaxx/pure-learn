using api.Models;
using System.Threading.Tasks;

namespace api.Interfaces;

public interface ITimerSettingsRepository
{
    Task<TimerSettings?> GetByLearnerIdAsync(long learnerId);
    Task<TimerSettings> CreateAsync(TimerSettings settings);
    Task<TimerSettings?> UpdateAsync(long learnerId, TimerSettings settings);
    Task<TimerSettings?> DeleteAsync(long learnerId);
} 