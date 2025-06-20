using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using api.Dtos.Insights;

namespace api.Controllers;

[Route("api/insights/pomodoro")]
[ApiController]
[Authorize]
public class PomodoroInsightsController : ControllerBase
{
    private readonly IPomodoroInsightRepository _insightRepo;
    private readonly IMapper _mapper;

    public PomodoroInsightsController(IPomodoroInsightRepository insightRepo, IMapper mapper)
    {
        _insightRepo = insightRepo;
        _mapper = mapper;
    }

    private long GetCurrentUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (long.TryParse(userId, out var id))
        {
            return id;
        }
        throw new InvalidOperationException("User ID not found or invalid.");
    }
    
    [HttpGet]
    public async Task<IActionResult> GetInsights()
    {
        var userId = GetCurrentUserId();
        var insights = await _insightRepo.GetByLearnerIdAsync(userId);
        if (insights == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<PomodoroInsightDto>(insights));
    }

    [HttpPost("recalculate")]
    public async Task<IActionResult> Recalculate()
    {
        var userId = GetCurrentUserId();
        await _insightRepo.RecalculateInsightsAsync(userId);
        return Ok();
    }
} 