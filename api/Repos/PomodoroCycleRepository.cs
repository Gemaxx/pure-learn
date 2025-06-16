using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repos
{
    public class PomodoroCycleRepository : IPomodoroCycleRepository
    {
        private readonly PureLearnDbContext _context;
        public PomodoroCycleRepository(PureLearnDbContext context) => _context = context;

        public async Task<List<PomodoroCycle>> GetBySessionAsync(long sessionId) =>
            await _context.PomodoroCycles
                          .Where(c => c.StudySessionId == sessionId)
                          .ToListAsync();

        public async Task<PomodoroCycle> CreateAsync(PomodoroCycle cycle)
        {
            await _context.PomodoroCycles.AddAsync(cycle);
            await _context.SaveChangesAsync();
            return cycle;
        }

        public async Task<PomodoroCycle?> UpdateAsync(PomodoroCycle cycle)
        {
            var existing = await _context.PomodoroCycles.FindAsync(cycle.Id);
            if (existing == null) return null;
            _context.Entry(existing).CurrentValues.SetValues(cycle);
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var entity = await _context.PomodoroCycles.FindAsync(id);
            if (entity == null) return false;
            _context.PomodoroCycles.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 