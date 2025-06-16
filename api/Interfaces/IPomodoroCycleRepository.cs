using api.Models;

namespace api.Interfaces
{
    public interface IPomodoroCycleRepository
    {
        Task<List<PomodoroCycle>> GetBySessionAsync(long sessionId);
        Task<PomodoroCycle> CreateAsync(PomodoroCycle cycle);
        Task<PomodoroCycle?> UpdateAsync(PomodoroCycle cycle);
        Task<bool> DeleteAsync(long id);
    }
} 