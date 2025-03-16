using api.Dtos.Subtask;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/tasks/{taskId:long}/subtasks")]
    [ApiController]
    public class SubtasksController : ControllerBase
    {
        private readonly ISubtaskRepository _subtaskRepo;

        public SubtasksController(ISubtaskRepository subtaskRepo)
        {
            _subtaskRepo = subtaskRepo;
        }

        //هيرجع كل السب تاسك
        // GET: api/tasks/{taskId}/subtasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubtaskDto>>> GetSubtasks(long taskId, [FromQuery] SubtaskQueryObject query)
        {
            var subtasks = await _subtaskRepo.GetSubtasksAsync(taskId, query);
            return Ok(subtasks.Select(s => s.ToSubtaskDto()));
        }

        //هيرجع سب تاسك معين
        // GET: api/tasks/{taskId}/subtasks/{subtaskId:long}
        [HttpGet("{subtaskId:long}")]
        public async Task<ActionResult<SubtaskDto>> GetSubtask(long taskId, long subtaskId)
        {
            var subtask = await _subtaskRepo.GetSubtaskAsync(taskId, subtaskId);
            if (subtask == null)
                return NotFound(new { Message = "Subtask not found." });

            return Ok(subtask.ToSubtaskDto());
        }

        //هنعمل سب تاسك جديد
        // POST: api/tasks/{taskId}/subtasks
        [HttpPost]
        public async Task<IActionResult> CreateSubtask(long taskId, [FromBody] CreateSubtaskRequestDto createDto)
        {
            var subtask = createDto.ToSubtaskFromCreateDto();
            var createdSubtask = await _subtaskRepo.CreateSubtaskAsync(taskId, subtask);
            return CreatedAtAction(nameof(GetSubtask), new { taskId = taskId, subtaskId = createdSubtask.Id }, createdSubtask.ToSubtaskDto());
        }

        //هنعمل تعديل على سب تاسك معين
        // PATCH: api/tasks/{taskId}/subtasks/{subtaskId:long}
        [HttpPatch("{subtaskId:long}")]
        public async Task<IActionResult> UpdateSubtask(long taskId, long subtaskId, [FromBody] PatchSubtaskRequestDto patchDto)
        {
            var subtask = await _subtaskRepo.GetSubtaskAsync(taskId, subtaskId);
            if (subtask == null)
                return NotFound(new { Message = "Subtask not found." });

            subtask.UpdateSubtaskFromPatchDto(patchDto);
            var updatedSubtask = await _subtaskRepo.UpdateSubtaskAsync(taskId, subtaskId, subtask);
            if (updatedSubtask == null)
                return NotFound(new { Message = "Subtask not found during update." });

            return Ok(updatedSubtask.ToSubtaskDto());
        }

        //هنمسح سب تاسك معين
        // DELETE: api/tasks/{taskId}/subtasks/{subtaskId:long}
        [HttpDelete("{subtaskId:long}")]
        public async Task<IActionResult> DeleteSubtask(long taskId, long subtaskId)
        {
            var result = await _subtaskRepo.DeleteSubtaskAsync(taskId, subtaskId);
            if (!result)
                return NotFound(new { Message = "Subtask not found or deletion failed." });

            return NoContent();
        }
    }
}