using api.Dtos.TaskType;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/learners/{learnerId}/tasktypes")]
    [ApiController]
    public class TaskTypesController : ControllerBase
    {
        private readonly ITaskTypeRepository _taskTypeRepo;

        public TaskTypesController(ITaskTypeRepository taskTypeRepo)
        {
            _taskTypeRepo = taskTypeRepo;
        }

        // GET: api/learners/{learnerId}/tasktypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskTypeDto>>> GetTaskTypes(long learnerId)
        {
            var taskTypes = await _taskTypeRepo.GetTaskTypesAsync(learnerId);
            return Ok(taskTypes.Select(tt => tt.ToTaskTypeDto()));
        }

        // GET: api/learners/{learnerId}/tasktypes/{taskTypeId:long}
        [HttpGet("{taskTypeId:long}")]
        public async Task<ActionResult<TaskTypeDto>> GetTaskType(long learnerId, long taskTypeId)
        {
            var taskType = await _taskTypeRepo.GetTaskTypeAsync(learnerId, taskTypeId);
            if (taskType == null)
                return NotFound(new { Message = "TaskType not found." });

            return Ok(taskType.ToTaskTypeDto());
        }

        // POST: api/learners/{learnerId}/tasktypes
        [HttpPost]
        public async Task<IActionResult> CreateTaskType(long learnerId, [FromBody] CreateTaskTypeDto createDto)
        {
            var taskType = createDto.ToTaskTypeFromCreateDto();
            var createdTaskType = await _taskTypeRepo.CreateTaskTypeAsync(learnerId, taskType);

            return CreatedAtAction(nameof(GetTaskType), new { learnerId = learnerId, taskTypeId = createdTaskType.Id }, createdTaskType.ToTaskTypeDto());
        }

        // PATCH: api/learners/{learnerId}/tasktypes/{taskTypeId:long}
        [HttpPatch("{taskTypeId:long}")]
        public async Task<IActionResult> UpdateTaskType(long learnerId, long taskTypeId, [FromBody] PatchTaskTypeDto patchDto)
        {
            var existingTaskType = await _taskTypeRepo.GetTaskTypeAsync(learnerId, taskTypeId);
            if (existingTaskType == null)
                return NotFound(new { Message = "TaskType not found." });

            existingTaskType.UpdateTaskTypeFromPatchDto(patchDto);
            var updatedTaskType = await _taskTypeRepo.UpdateTaskTypeAsync(learnerId, taskTypeId, existingTaskType);
            if (updatedTaskType == null)
                return NotFound(new { Message = "TaskType not found during update." });

            return Ok(updatedTaskType.ToTaskTypeDto());
        }

        // DELETE: api/learners/{learnerId}/tasktypes/{taskTypeId:long}
        [HttpDelete("{taskTypeId:long}")]
        public async Task<IActionResult> DeleteTaskType(long learnerId, long taskTypeId)
        {
            var result = await _taskTypeRepo.DeleteTaskTypeAsync(learnerId, taskTypeId);
            if (!result)
                return NotFound(new { Message = "TaskType not found or deletion failed." });
            return NoContent();
        }

    }
}