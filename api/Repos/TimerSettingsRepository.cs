using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace api.Repos;

public class TimerSettingsRepository : ITimerSettingsRepository
{
    private readonly PureLearnDbContext _context;

    public TimerSettingsRepository(PureLearnDbContext context)
    {
        _context = context;
    }

    public async Task<TimerSettings?> GetByLearnerIdAsync(long learnerId)
    {
        return await _context.TimerSettings.FirstOrDefaultAsync(t => t.LearnerId == learnerId);
    }

    public async Task<TimerSettings> CreateAsync(TimerSettings settings)
    {
        await _context.TimerSettings.AddAsync(settings);
        await _context.SaveChangesAsync();
        return settings;
    }

    public async Task<TimerSettings?> UpdateAsync(long learnerId, TimerSettings settings)
    {
        var existingSettings = await GetByLearnerIdAsync(learnerId);
        if (existingSettings == null)
        {
            return null;
        }

        existingSettings.FocusMinutes = settings.FocusMinutes;
        existingSettings.ShortBreakMin = settings.ShortBreakMin;
        existingSettings.LongBreakMin = settings.LongBreakMin;
        existingSettings.CyclesBeforeLongBreak = settings.CyclesBeforeLongBreak;
        
        await _context.SaveChangesAsync();
        return existingSettings;
    }

    public async Task<TimerSettings?> DeleteAsync(long learnerId)
    {
        var settings = await GetByLearnerIdAsync(learnerId);
        if (settings == null)
        {
            return null;
        }

        _context.TimerSettings.Remove(settings);
        await _context.SaveChangesAsync();
        return settings;
    }
} 