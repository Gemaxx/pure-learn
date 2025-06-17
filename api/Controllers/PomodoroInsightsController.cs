using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using api.Dtos.Insights;
using api.Interfaces;
using api.Models;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PomodoroInsightsController : ControllerBase
{
    private readonly IPomodoroInsightRepository _repo;
    private readonly IMapper _mapper;
    private readonly UserManager<ApplicationUser> _userManager;

    public PomodoroInsightsController(
        IPomodoroInsightRepository repo, 
        IMapper mapper, 
        UserManager<ApplicationUser> userManager)
    {
        _repo = repo;
        _mapper = mapper;
        _userManager = userManager;
    }

    private async Task<long> GetCurrentLearnerId()
    {
        var username = User.Identity?.Name ?? throw new UnauthorizedAccessException();
        var user = await _userManager.FindByNameAsync(username);
        return user!.Id;
    }

    [Authorize]
    [HttpGet("current-week")]
    public async Task<ActionResult<PomodoroInsightDto>> GetCurrent()
    {
        var learnerId = await GetCurrentLearnerId();
        var data = await _repo.GetCurrentWeekAsync(learnerId);
        if (data == null) return NotFound();
        return Ok(_mapper.Map<PomodoroInsightDto>(data));
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<PomodoroInsightDto>>> GetAll()
    {
        var learnerId = await GetCurrentLearnerId();
        var data = await _repo.GetAllAsync(learnerId);
        return Ok(_mapper.Map<List<PomodoroInsightDto>>(data));
    }

    [Authorize]
    [HttpPost("recalculate")]
    public async Task<IActionResult> Recalculate()
    {
        var learnerId = await GetCurrentLearnerId();
        await _repo.RecalculateAsync(learnerId);
        return NoContent();
    }
} 