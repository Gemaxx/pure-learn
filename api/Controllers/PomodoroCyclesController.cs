using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using api.Dtos.PomodoroCycle;
using api.Interfaces;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PomodoroCyclesController : ControllerBase
    {
        private readonly IPomodoroCycleRepository _repo;
        private readonly IMapper _mapper;

        public PomodoroCyclesController(IPomodoroCycleRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("session/{sessionId}")]
        public async Task<ActionResult<List<PomodoroCycleDto>>> GetBySession(long sessionId)
        {
            var result = await _repo.GetBySessionAsync(sessionId);
            return Ok(_mapper.Map<List<PomodoroCycleDto>>(result));
        }

        [HttpPost]
        public async Task<ActionResult<PomodoroCycleDto>> Create(CreatePomodoroCycleRequestDto dto)
        {
            var entity = _mapper.Map<PomodoroCycle>(dto);
            var created = await _repo.CreateAsync(entity);
            return CreatedAtAction(nameof(GetBySession), new { sessionId = created.StudySessionId }, _mapper.Map<PomodoroCycleDto>(created));
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(long id, PatchPomodoroCycleRequestDto dto)
        {
            var entity = _mapper.Map<PomodoroCycle>(dto);
            entity.Id = id;
            var updated = await _repo.UpdateAsync(entity);
            if (updated == null) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var success = await _repo.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
} 