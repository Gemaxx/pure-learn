using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ITimerSettingsRepository
    {
        Task<TimerSettings?> GetByUserIdAsync(long userId);
        Task<bool> UpdateAsync(TimerSettings settings);
        Task<TimerSettings> CreateDefaultAsync(long userId);
    }
} 