using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using api.Dtos.TimerSettings;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

[Route("api/settings/timer")]
[ApiController]
[Authorize] 
public class TimerSettingsController : ControllerBase
{
    private readonly ITimerSettingsRepository _timerSettingsRepo;
    private readonly IMapper _mapper;

    public TimerSettingsController(ITimerSettingsRepository timerSettingsRepo, IMapper mapper)
    {
        _timerSettingsRepo = timerSettingsRepo;
        _mapper = mapper;
    }

    private string GetCurrentUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!string.IsNullOrEmpty(userId))
        {
            return userId;
        }
        // TEMP: For local testing without authentication
        return "dummy-identity-001"; // or any valid test user IdentityId
    }

    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var userId = GetCurrentUserId();
        var settings = await _timerSettingsRepo.GetByUserIdAsync(userId);
        if (settings == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<TimerSettingsDto>(settings));
    }
    
    [HttpPost]
    [HttpPut]
    public async Task<IActionResult> UpsertSettings([FromBody] UpdateTimerSettingsDto settingsDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = GetCurrentUserId();
        var settingsModel = _mapper.Map<TimerSettings>(settingsDto);
        settingsModel.UserId = userId;

        var existingSettings = await _timerSettingsRepo.GetByUserIdAsync(userId);
        if (existingSettings == null)
        {
            var createdSettings = await _timerSettingsRepo.CreateAsync(settingsModel);
            return CreatedAtAction(nameof(GetSettings), new { }, _mapper.Map<TimerSettingsDto>(createdSettings));
        }
        else
        {
            var updatedSettings = await _timerSettingsRepo.UpdateAsync(userId, settingsModel);
            return Ok(_mapper.Map<TimerSettingsDto>(updatedSettings));
        }
    }
} 