using api.Dtos.Task;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/learners/{learnerId}/tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _taskRepo;
        // Assume ILearnerRepository is available to validate learner existence.
        private readonly ILearnerRepository _learnerRepo;

        public TasksController(ITaskRepository taskRepo, ILearnerRepository learnerRepo)
        {
            _taskRepo = taskRepo;
            _learnerRepo = learnerRepo;
        }

        //هنجيب كل التاسكات
        // GET: api/learners/{learnerId}/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks(long learnerId, [FromQuery] TaskQueryObjects query)
        {
            var learner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (learner == null) return NotFound(new { Message = "Learner not found." });

            var tasks = await _taskRepo.GetTasksAsync(learnerId, query);
            return Ok(tasks.Select(t => t.ToTaskDto()));
        }

        //هنجيب تاسك معين   
        // GET: api/learners/{learnerId}/tasks/{taskId:long}
        [HttpGet("{taskId:long}")]
        public async Task<ActionResult<TaskDto>> GetTask(long learnerId, long taskId)
        {
            var learner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (learner == null) return NotFound(new { Message = "Learner not found." });

            var task = await _taskRepo.GetTaskAsync(learnerId, taskId);
            if (task == null) return NotFound(new { Message = "Task not found." });

            return Ok(task.ToTaskDto());
        }

        //هنعمل تاسك جديد
        // POST: api/learners/{learnerId}/tasks
        [HttpPost]
        public async Task<IActionResult> CreateTask(long learnerId, [FromBody] CreateTaskRequestDto createTaskDto)
        {
            var learner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (learner == null) return NotFound(new { Message = "Learner not found." });

            var task = createTaskDto.ToTaskEntity();
            var createdTask = await _taskRepo.CreateTaskAsync(learnerId, task);

            return CreatedAtAction(nameof(GetTask),
                new { learnerId = learnerId, taskId = createdTask.Id },
                createdTask.ToTaskDto());
        }

        //هنعمل تعديل على تاسك معين
        // PATCH: api/learners/{learnerId}/tasks/{taskId:long}
        [HttpPatch("{taskId:long}")]
        public async Task<IActionResult> UpdateTask(long learnerId, long taskId, [FromBody] PatchTaskRequest patchTaskDto)
        {
            var task = await _taskRepo.GetTaskAsync(learnerId, taskId);
            if (task == null)
                return NotFound(new { Message = "Task not found or does not belong to the learner." });

            task.UpdateTaskFromPatch(patchTaskDto);
            var updatedTask = await _taskRepo.UpdateTaskAsync(learnerId, taskId, task);
            if (updatedTask == null)
                return NotFound(new { Message = "Task not found during update." });

            return Ok(updatedTask.ToTaskDto());
        }

        //هنمسح تاسك معين
        // DELETE: api/learners/{learnerId}/tasks/{taskId:long}
        [HttpDelete("{taskId:long}")]
        public async Task<IActionResult> DeleteTask(long learnerId, long taskId)
        {
            var result = await _taskRepo.DeleteTaskAsync(learnerId, taskId);
            if (!result)
                return NotFound(new { Message = "Task not found or deletion failed." });

            return NoContent();
        }

        // 🔥 SOFT DELETE Task
// PATCH: api/learners/{learnerId}/tasks/soft-delete/{taskId}
[HttpPatch("soft-delete/{taskId:long}")]
public async Task<IActionResult> SoftDeleteTask(long learnerId, long taskId)
{
    var learner = await _learnerRepo.GetLearnerAsync(learnerId);
    if (learner == null)
        return NotFound(new { Message = "Learner not found." });

    var result = await _taskRepo.SoftDeleteTaskAsync(learnerId, taskId);
    if (!result)
        return NotFound(new { Message = "Task not found or already deleted." });

    return Ok(new { Message = "Task soft deleted successfully." });
}

// 🔄 RESTORE Soft Deleted Task
// PATCH: api/learners/{learnerId}/tasks/restore/{taskId}
[HttpPatch("restore/{taskId:long}")]
public async Task<IActionResult> RestoreTask(long learnerId, long taskId)
{
    var learner = await _learnerRepo.GetLearnerAsync(learnerId);
    if (learner == null)
        return NotFound(new { Message = "Learner not found." });

    var result = await _taskRepo.RestoreTaskAsync(learnerId, taskId);
    if (!result)
        return NotFound(new { Message = "Task not found or not soft deleted." });

    return Ok(new { Message = "Task restored successfully." });
}

    }
}