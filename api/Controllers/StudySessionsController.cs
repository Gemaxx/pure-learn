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

    private async System.Threading.Tasks.Task<long> GetCurrentLearnerId()
    {
        var username = User.Identity?.Name;
        if (string.IsNullOrEmpty(username)) throw new UnauthorizedAccessException();

        var user = await _userManager.FindByNameAsync(username);
        if (user == null)
            throw new UnauthorizedAccessException("User not found");
            
        return long.Parse(user.Id);
    }

    [Authorize]
    [HttpGet]
    [ProducesResponseType(typeof(List<StudySessionDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async System.Threading.Tasks.Task<ActionResult<List<StudySessionDto>>> GetMySessions()
    {
        var learnerId = await GetCurrentLearnerId();
        var sessions = await _repo.GetByLearnerIdAsync(learnerId);
        return Ok(_mapper.Map<List<StudySessionDto>>(sessions));
    }

    [Authorize]
    [HttpPost]
    [ProducesResponseType(typeof(StudySessionDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async System.Threading.Tasks.Task<ActionResult<StudySessionDto>> Create([FromBody] CreateStudySessionRequestDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var learnerId = await GetCurrentLearnerId();
        var entity = _mapper.Map<StudySession>(dto);
        entity.LearnerId = learnerId;

        var created = await _repo.CreateAsync(entity);
        return CreatedAtAction(nameof(Create), null, _mapper.Map<StudySessionDto>(created));
    }

    [Authorize]
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async System.Threading.Tasks.Task<IActionResult> Delete(long id)
    {
        var deleted = await _repo.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }

    [Authorize]
    [HttpPost("{id}/increment-cycle")]
    public async System.Threading.Tasks.Task<IActionResult> IncrementCycle(long id)
    {
        var incremented = await _repo.IncrementCycleCountAsync(id);
        return incremented ? NoContent() : NotFound();
    }
} 