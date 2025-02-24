using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.KanbanStatus;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/learners/{learnerId}/kanbanstatuses")]
    [ApiController]
    public class KanbanStatusesController : ControllerBase
    {
        private readonly IKanbanStatusRepository _kanbanStatusRepo;

        public KanbanStatusesController(IKanbanStatusRepository kanbanStatusRepo)
        {
            _kanbanStatusRepo = kanbanStatusRepo;
        }

        // GET: api/learners/{learnerId}/kanbanstatuses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KanbanStatusDto>>> GetKanbanStatuses(long learnerId)
        {
            var statuses = await _kanbanStatusRepo.GetKanbanStatusesAsync(learnerId);
            return Ok(statuses.Select(s => s.ToKanbanStatusDto()));
        }

        // GET: api/learners/{learnerId}/kanbanstatuses/{statusId:long}
        [HttpGet("{statusId:long}")]
        public async Task<ActionResult<KanbanStatusDto>> GetKanbanStatus(long learnerId, long statusId)
        {
            var status = await _kanbanStatusRepo.GetKanbanStatusAsync(learnerId, statusId);
            if (status == null)
                return NotFound(new { Message = "Kanban status not found." });

            return Ok(status.ToKanbanStatusDto());
        }

        // POST: api/learners/{learnerId}/kanbanstatuses
        [HttpPost]
        public async Task<IActionResult> CreateKanbanStatus(long learnerId, [FromBody] CreateKanbanStatusDto createDto)
        {
            var status = createDto.ToKanbanStatusFromCreateDto();
            var createdStatus = await _kanbanStatusRepo.CreateKanbanStatusAsync(learnerId, status);
            return CreatedAtAction(nameof(GetKanbanStatus),
                new { learnerId = learnerId, statusId = createdStatus.Id },
                createdStatus.ToKanbanStatusDto());
        }

        // PATCH: api/learners/{learnerId}/kanbanstatuses/{statusId:long}
        [HttpPatch("{statusId:long}")]
        public async Task<IActionResult> UpdateKanbanStatus(long learnerId, long statusId, [FromBody] PatchKanbanStatusDto patchDto)
        {
            var existingStatus = await _kanbanStatusRepo.GetKanbanStatusAsync(learnerId, statusId);
            if (existingStatus == null)
                return NotFound(new { Message = "Kanban status not found." });

            existingStatus.UpdateKanbanStatusFromPatchDto(patchDto);
            var updatedStatus = await _kanbanStatusRepo.UpdateKanbanStatusAsync(learnerId, statusId, existingStatus);
            if (updatedStatus == null)
                return NotFound(new { Message = "Kanban status not found during update." });

            return Ok(updatedStatus.ToKanbanStatusDto());
        }

        // DELETE: api/learners/{learnerId}/kanbanstatuses/{statusId:long}
        [HttpDelete("{statusId:long}")]
        public async Task<IActionResult> DeleteKanbanStatus(long learnerId, long statusId)
        {
            var result = await _kanbanStatusRepo.DeleteKanbanStatusAsync(learnerId, statusId);
            if (!result)
                return NotFound(new { Message = "Kanban status not found or deletion failed." });
            return NoContent();
        }
    }
}