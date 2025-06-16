using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Dtos.StudySession;
using api.Helpers;
using api.Interfaces;
using api.Models;
using api.Exceptions;
using TaskEntity = api.Models.Task;

namespace api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class StudySessionsController : ControllerBase
{
    private readonly IStudySessionRepository _repo;
    private readonly IMapper _mapper;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly PureLearnDbContext _ctx;

    public StudySessionsController(
        IStudySessionRepository repo,
        IMapper mapper,
        UserManager<ApplicationUser> userManager,
        PureLearnDbContext ctx)
    {
        _repo = repo;
        _mapper = mapper;
        _userManager = userManager;
        _ctx = ctx;
    }

    private async Task<long> GetLearnerId()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null) throw new UnauthorizedAccessException("User not found");

        var learner = await _ctx.Learners
            .SingleOrDefaultAsync(l => l.IdentityId == user.Id);
        if (learner == null) throw new UnauthorizedAccessException("Learner not found");

        return learner.Id;
    }

    private async Task<bool> VerifyTaskOwnership(long learnerId, long? taskId)
    {
        if (!taskId.HasValue) return true;
        return await _ctx.Tasks
            .AnyAsync(t => t.Id == taskId.Value && t.LearnerId == learnerId);
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<StudySessionDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<List<StudySessionDto>>> Get([FromQuery] StudySessionQueryObject query)
    {
        var learnerId = await GetLearnerId();
        var sessions = await _repo.GetByLearnerAsync(learnerId, query);
        return Ok(_mapper.Map<List<StudySessionDto>>(sessions));
    }

    [HttpPost]
    [ProducesResponseType(typeof(StudySessionDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<StudySessionDto>> Create(CreateStudySessionRequestDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var learnerId = await GetLearnerId();
        
        if (!await VerifyTaskOwnership(learnerId, dto.TaskId))
            return Forbid("Task does not belong to the learner");

        var session = _mapper.Map<StudySession>(dto);
        session.LearnerId = learnerId;
        
        var created = await _repo.CreateAsync(session);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, _mapper.Map<StudySessionDto>(created));
    }

    [HttpPatch("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Patch(long id, PatchStudySessionRequestDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return NotFound();

        var learnerId = await GetLearnerId();
        if (existing.LearnerId != learnerId)
            return Forbid("Study session does not belong to the learner");

        try
        {
            _mapper.Map(dto, existing);
            await _repo.UpdateAsync(existing);
            return NoContent();
        }
        catch (ConcurrencyException)
        {
            return Conflict("The record was modified by another user.");
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(long id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null) return NotFound();

        var learnerId = await GetLearnerId();
        if (existing.LearnerId != learnerId)
            return Forbid("Study session does not belong to the learner");

        await _repo.DeleteAsync(id);
        return NoContent();
    }
} 