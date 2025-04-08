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
    [Route("api/goals/{goalId}/kanbanstatuses")]
    [ApiController]
    public class KanbanStatusesController : ControllerBase
    {
        private readonly IKanbanStatusRepository _kanbanStatusRepo;

        public KanbanStatusesController(IKanbanStatusRepository kanbanStatusRepo)
        {
            _kanbanStatusRepo = kanbanStatusRepo;
        }

        // GET: api/goals/{goalId}/kanbanstatuses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KanbanStatusDto>>> GetKanbanStatuses(long goalId)
        {
            var statuses = await _kanbanStatusRepo.GetKanbanStatusesAsync(goalId);
            return Ok(statuses.Select(s => s.ToKanbanStatusDto()));
        }

        // GET: api/goals/{goalId}/kanbanstatuses/{statusId:long}
        [HttpGet("{statusId:long}")]
        public async Task<ActionResult<KanbanStatusDto>> GetKanbanStatus(long goalId, long statusId)
        {
            var status = await _kanbanStatusRepo.GetKanbanStatusAsync(goalId, statusId);
            if (status == null)
                return NotFound(new { Message = "Kanban status not found." });

            return Ok(status.ToKanbanStatusDto());
        }

        // POST: api/goals/{goalId}/kanbanstatuses
        [HttpPost]
        public async Task<IActionResult> CreateKanbanStatus(long goalId, [FromBody] CreateKanbanStatusDto createDto)
        {
            var status = createDto.ToKanbanStatusFromCreateDto();
            var createdStatus = await _kanbanStatusRepo.CreateKanbanStatusAsync(goalId, status);
            return CreatedAtAction(nameof(GetKanbanStatus),
                new { goalId = goalId, statusId = createdStatus.Id },
                createdStatus.ToKanbanStatusDto());
        }

        // PATCH: api/goals/{goalId}/kanbanstatuses/{statusId:long}
        [HttpPatch("{statusId:long}")]
        public async Task<IActionResult> UpdateKanbanStatus(long goalId, long statusId, [FromBody] PatchKanbanStatusDto patchDto)
        {
            var existingStatus = await _kanbanStatusRepo.GetKanbanStatusAsync(goalId, statusId);
            if (existingStatus == null)
                return NotFound(new { Message = "Kanban status not found." });

            existingStatus.UpdateKanbanStatusFromPatchDto(patchDto);
            var updatedStatus = await _kanbanStatusRepo.UpdateKanbanStatusAsync(goalId, statusId, existingStatus);
            if (updatedStatus == null)
                return NotFound(new { Message = "Kanban status not found during update." });

            return Ok(updatedStatus.ToKanbanStatusDto());
        }

        // DELETE: api/goals/{goalId}/kanbanstatuses/{statusId:long}
        [HttpDelete("{statusId:long}")]
        public async Task<IActionResult> DeleteKanbanStatus(long goalId, long statusId)
        {
            var result = await _kanbanStatusRepo.DeleteKanbanStatusAsync(goalId, statusId);
            if (!result)
                return NotFound(new { Message = "Kanban status not found or deletion failed." });
            return NoContent();
        }
    }
}