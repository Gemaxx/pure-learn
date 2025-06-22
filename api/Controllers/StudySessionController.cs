using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using api.Dtos.StudySession;
using api.Helpers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using api.Dtos.PomodoroCycle;
using api.Data;

namespace api.Controllers;

[Route("api/learners/{learnerId}/studysession")]
[ApiController]
[Authorize]
public class StudySessionController : ControllerBase
{
    private readonly IStudySessionRepository _sessionRepo;
    private readonly IMapper _mapper;

    public StudySessionController(IStudySessionRepository sessionRepo, IMapper mapper)
    {
        _sessionRepo = sessionRepo;
        _mapper = mapper;
    }

    private long GetCurrentLearnerId()
    {
        if (User?.Identity?.IsAuthenticated != true)
        {
            return 0;
        }
        var learnerIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!long.TryParse(learnerIdClaim, out var id))
        {
            throw new UnauthorizedAccessException("JWT missing learner id");
        }
        return id;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll(long learnerId, [FromQuery] StudySessionQueryObject query)
    {
        // Add debugging
        var currentLearnerId = GetCurrentLearnerId();
        
        query = query ?? new StudySessionQueryObject();
        query.LearnerId = learnerId;
        var sessions = await _sessionRepo.GetAllAsync(query);
        var sessionDtos = _mapper.Map<List<StudySessionDto>>(sessions);
        
        if (!sessions.Any())
        {
            return NotFound($"No sessions found for learner {learnerId} with query IsCompleted={query.IsCompleted}. Current authenticated learner: {currentLearnerId}");
        }
        
        return Ok(sessionDtos);
    }
    
    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetById(long learnerId, [FromRoute] long id)
    {
        var session = await _sessionRepo.GetByIdAsync(id);
        if (session == null || session.LearnerId != learnerId)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<StudySessionDetailsDto>(session));
    }
    
    [HttpPost]
    public async Task<IActionResult> Create(long learnerId, [FromBody] CreateStudySessionRequestDto sessionDto)
    {
        var sessionModel = _mapper.Map<StudySession>(sessionDto);
        sessionModel.LearnerId = learnerId;
        
        var createdSession = await _sessionRepo.CreateAsync(sessionModel);
        return CreatedAtAction(nameof(GetById), new { learnerId, id = createdSession.Id }, _mapper.Map<StudySessionDto>(createdSession));
    }
    
    [HttpPatch("{id:long}")]
    public async Task<IActionResult> Update(long learnerId, [FromRoute] long id, [FromBody] PatchStudySessionRequestDto patchDto)
    {
        var sessionModel = await _sessionRepo.GetByIdAsync(id);
        if (sessionModel == null || sessionModel.LearnerId != learnerId)
        {
            return NotFound();
        }
        if (patchDto.EndTime.HasValue) sessionModel.EndTime = patchDto.EndTime.Value;
        if (patchDto.IsCompleted.HasValue) sessionModel.IsCompleted = patchDto.IsCompleted.Value;
        var updatedSession = await _sessionRepo.UpdateAsync(id, sessionModel);
        return Ok(_mapper.Map<StudySessionDto>(updatedSession));
    }
    
    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long learnerId, [FromRoute] long id)
    {
        var sessionModel = await _sessionRepo.GetByIdAsync(id);
        if (sessionModel == null || sessionModel.LearnerId != learnerId)
        {
            return NotFound();
        }
        await _sessionRepo.DeleteAsync(id);
        return NoContent();
    }
    
    [HttpPost("cycles")]
    public async Task<IActionResult> AddCycleToSession(long learnerId, [FromBody] CreatePomodoroCycleRequestDto cycleDto)
    {
        var session = await _sessionRepo.GetByIdAsync(cycleDto.StudySessionId);
        if (session == null || session.LearnerId != learnerId)
        {
            return Forbid();
        }
        var cycleModel = _mapper.Map<PomodoroCycle>(cycleDto);
        var createdCycle = await _sessionRepo.CreateCycleAsync(cycleModel);
        return CreatedAtAction(nameof(AddCycleToSession), new { learnerId, id = createdCycle.Id }, _mapper.Map<PomodoroCycleDto>(createdCycle));
    }
} 