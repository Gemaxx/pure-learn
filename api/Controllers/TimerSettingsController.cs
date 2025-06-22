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

    private long GetCurrentLearnerId()
    {
        var learnerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (long.TryParse(learnerId, out var id))
            return id;
        throw new InvalidOperationException("Learner ID not found or invalid.");
    }

    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var learnerId = GetCurrentLearnerId();
        var settings = await _timerSettingsRepo.GetByLearnerIdAsync(learnerId);
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

        var learnerId = GetCurrentLearnerId();
        var settingsModel = _mapper.Map<TimerSettings>(settingsDto);
        settingsModel.LearnerId = learnerId;

        var existingSettings = await _timerSettingsRepo.GetByLearnerIdAsync(learnerId);
        if (existingSettings == null)
        {
            var createdSettings = await _timerSettingsRepo.CreateAsync(settingsModel);
            return CreatedAtAction(nameof(GetSettings), new { }, _mapper.Map<TimerSettingsDto>(createdSettings));
        }
        else
        {
            var updatedSettings = await _timerSettingsRepo.UpdateAsync(learnerId, settingsModel);
            return Ok(_mapper.Map<TimerSettingsDto>(updatedSettings));
        }
    }
} 