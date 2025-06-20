using api.Models;
using System.Threading.Tasks;

namespace api.Interfaces;

public interface ITimerSettingsRepository
{
    Task<TimerSettings?> GetByUserIdAsync(string userId);
    Task<TimerSettings> CreateAsync(TimerSettings settings);
    Task<TimerSettings?> UpdateAsync(string userId, TimerSettings settings);
    Task<TimerSettings?> DeleteAsync(string userId);
} 