using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using api.Dtos.Insights;

namespace api.Controllers;

[Route("api/learners/{learnerId}/pomodoroinsight")]
[ApiController]
[Authorize]
public class PomodoroInsightController : ControllerBase
{
    private readonly IPomodoroInsightRepository _insightRepo;
    private readonly IMapper _mapper;

    public PomodoroInsightController(IPomodoroInsightRepository insightRepo, IMapper mapper)
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
    public async Task<IActionResult> GetInsights(long learnerId)
    {
        var currentLearnerId = GetCurrentLearnerId();
        
        var insights = await _insightRepo.GetByLearnerIdAsync(learnerId);
        if (insights == null)
        {
            return NotFound($"No insights found for learner {learnerId}. Current authenticated learner: {currentLearnerId}");
        }
        return Ok(_mapper.Map<PomodoroInsightDto>(insights));
    }

    [HttpPost("recalculate")]
    public async Task<IActionResult> Recalculate(long learnerId)
    {
        await _insightRepo.RecalculateInsightsAsync(learnerId);
        return Ok();
    }
} 