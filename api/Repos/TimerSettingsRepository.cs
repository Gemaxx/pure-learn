using Microsoft.EntityFrameworkCore;
using api.Interfaces;
using api.Models;
using api.Data;

namespace api.Repos
{
    public class TimerSettingsRepository : ITimerSettingsRepository
    {
        private readonly PureLearnDbContext _context;
        public TimerSettingsRepository(PureLearnDbContext context) => _context = context;

        public async Task<TimerSettings?> GetByUserIdAsync(long userId)
        {
            return await _context.TimerSettings.FirstOrDefaultAsync(s => s.UserId == userId);
        }

        public async Task<bool> UpdateAsync(TimerSettings settings)
        {
            _context.TimerSettings.Update(settings);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<TimerSettings> CreateDefaultAsync(long userId)
        {
            var settings = new TimerSettings
            {
                UserId = userId,
                FocusMinutes = 25,
                ShortBreakMin = 5,
                LongBreakMin = 15,
                CyclesBeforeLongBreak = 4
            };

            await _context.TimerSettings.AddAsync(settings);
            await _context.SaveChangesAsync();
            return settings;
        }
    }
} 