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

    private long GetCurrentLearnerId()
    {
        var learnerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (long.TryParse(learnerId, out var id))
        {
            return id;
        }
        throw new InvalidOperationException("Learner ID not found or invalid.");
    }
    
    [HttpGet]
    public async Task<IActionResult> GetInsights()
    {
        var learnerId = GetCurrentLearnerId();
        var insights = await _insightRepo.GetByLearnerIdAsync(learnerId);
        if (insights == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<PomodoroInsightDto>(insights));
    }

    [HttpPost("recalculate")]
    public async Task<IActionResult> Recalculate()
    {
        var learnerId = GetCurrentLearnerId();
        await _insightRepo.RecalculateInsightsAsync(learnerId);
        return Ok();
    }
} 