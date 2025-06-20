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

[Route("api/sessions")]
[ApiController]
// [Authorize] // Temporarily removed for Swagger testing
public class StudySessionsController : ControllerBase
{
    private readonly IStudySessionRepository _sessionRepo;
    private readonly IMapper _mapper;

    public StudySessionsController(IStudySessionRepository sessionRepo, IMapper mapper)
    {
        _sessionRepo = sessionRepo;
        _mapper = mapper;
    }

    private long GetCurrentUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (long.TryParse(userId, out var id))
        {
            return id;
        }
        // TEMP: For local testing without authentication
        return 1; // or any valid test user ID in your DB
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] StudySessionQueryObject query)
    {
        query.LearnerId = GetCurrentUserId();
        var sessions = await _sessionRepo.GetAllAsync(query);
        var sessionDtos = _mapper.Map<List<StudySessionDto>>(sessions);
        return Ok(sessionDtos);
    }
    
    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetById([FromRoute] long id)
    {
        var session = await _sessionRepo.GetByIdAsync(id);
        if (session == null || session.LearnerId != GetCurrentUserId())
        {
            return NotFound();
        }
        return Ok(_mapper.Map<StudySessionDetailsDto>(session));
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateStudySessionRequestDto sessionDto)
    {
        var sessionModel = _mapper.Map<StudySession>(sessionDto);
        sessionModel.LearnerId = GetCurrentUserId();
        
        var createdSession = await _sessionRepo.CreateAsync(sessionModel);
        return CreatedAtAction(nameof(GetById), new { id = createdSession.Id }, _mapper.Map<StudySessionDto>(createdSession));
    }
    
    [HttpPatch("{id:long}")]
    public async Task<IActionResult> Update([FromRoute] long id, [FromBody] PatchStudySessionRequestDto patchDto)
    {
        var sessionModel = await _sessionRepo.GetByIdAsync(id);
        if (sessionModel == null || sessionModel.LearnerId != GetCurrentUserId())
        {
            return NotFound();
        }
        
        if (patchDto.EndTime.HasValue) sessionModel.EndTime = patchDto.EndTime.Value;
        if (patchDto.IsCompleted.HasValue) sessionModel.IsCompleted = patchDto.IsCompleted.Value;

        var updatedSession = await _sessionRepo.UpdateAsync(id, sessionModel);
        return Ok(_mapper.Map<StudySessionDto>(updatedSession));
    }
    
    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete([FromRoute] long id)
    {
        var sessionModel = await _sessionRepo.GetByIdAsync(id);
        if (sessionModel == null || sessionModel.LearnerId != GetCurrentUserId())
        {
            return NotFound();
        }
        
        await _sessionRepo.DeleteAsync(id);
        return NoContent();
    }
    
    [HttpPost("cycles")]
    public async Task<IActionResult> AddCycleToSession([FromBody] CreatePomodoroCycleRequestDto cycleDto)
    {
        var session = await _sessionRepo.GetByIdAsync(cycleDto.StudySessionId);
        if (session == null || session.LearnerId != GetCurrentUserId())
        {
            return Forbid(); // Or BadRequest
        }

        var cycleModel = _mapper.Map<PomodoroCycle>(cycleDto);
        var createdCycle = await _sessionRepo.CreateCycleAsync(cycleModel);
        
        return CreatedAtAction(nameof(AddCycleToSession), new { id = createdCycle.Id }, _mapper.Map<PomodoroCycleDto>(createdCycle));
    }
} 