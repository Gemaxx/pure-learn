using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using api.Interfaces;
using api.Models;
using api.Dtos.TimerSettings;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TimerSettingsController : ControllerBase
    {
        private readonly ITimerSettingsRepository _repo;
        private readonly UserManager<ApplicationUser> _userManager;

        public TimerSettingsController(
            ITimerSettingsRepository repo,
            UserManager<ApplicationUser> userManager)
        {
            _repo = repo;
            _userManager = userManager;
        }

        private async Task<long> GetCurrentUserId()
        {
            var username = User.Identity?.Name;
            var user = await _userManager.FindByNameAsync(username!);
            return user!.Id;
        }

        [HttpGet]
        public async Task<ActionResult<TimerSettingsDto>> Get()
        {
            var userId = await GetCurrentUserId();
            var settings = await _repo.GetByUserIdAsync(userId);
            if (settings == null) return NotFound();

            return Ok(new TimerSettingsDto
            {
                FocusMinutes = settings.FocusMinutes,
                ShortBreakMin = settings.ShortBreakMin,
                LongBreakMin = settings.LongBreakMin,
                CyclesBeforeLongBreak = settings.CyclesBeforeLongBreak
            });
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateTimerSettingsDto dto)
        {
            var userId = await GetCurrentUserId();
            var settings = await _repo.GetByUserIdAsync(userId);
            if (settings == null) return NotFound();

            settings.FocusMinutes = dto.FocusMinutes;
            settings.ShortBreakMin = dto.ShortBreakMin;
            settings.LongBreakMin = dto.LongBreakMin;
            settings.CyclesBeforeLongBreak = dto.CyclesBeforeLongBreak;

            var updated = await _repo.UpdateAsync(settings);
            return updated ? NoContent() : StatusCode(500, "Failed to update");
        }
    }
} 