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

        // GET: api/learners/{learnerId}/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDetailsDto>>> GetTasks(long learnerId, [FromQuery] TaskQueryObjects query)
        {
            var learner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (learner == null) return NotFound(new { Message = "Learner not found." });

            var tasks = await _taskRepo.GetTasksAsync(learnerId, query);
            return Ok(tasks.Select(t=> t.ToTaskDto()));
        }

        // GET: api/learners/{learnerId}/tasks/{taskId:long}
        [HttpGet("{taskId:long}")]
        public async Task<ActionResult<TaskDetailsDto>> GetTask(long learnerId, long taskId)
        {
            var learner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (learner == null) return NotFound(new { Message = "Learner not found." });

            var task = await _taskRepo.GetTaskAsync(learnerId, taskId);
            if (task == null) return NotFound(new { Message = "Task not found." });

            return Ok(task.ToTaskDetailsDto());
        }

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

        // PATCH: api/learners/{learnerId}/tasks/{taskId:long}
        [HttpPatch("{taskId:long}")]
        public async Task<IActionResult> UpdateTask(long learnerId, long taskId, [FromBody] PatchTaskRequestDto patchTaskDto)
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

        [HttpDelete("{taskId:long}/hard-delete")]
        public async Task<IActionResult> HardDeleteTask(long learnerId, long taskId)
        {
            if (await _taskRepo.DeleteTaskAsync(learnerId, taskId)) return NoContent();
            return NotFound(new { Message = "Learner ID or Task ID is incorrect or does not exist." });
        }

        [HttpDelete("{taskId:long}/soft-delete")]
        public async Task<IActionResult> SoftDeleteTask(long learnerId, long taskId)
        {
            if (await _taskRepo.SoftDeleteTaskAsync(learnerId, taskId)) return NoContent();
            return NotFound(new { Message = "Learner ID or Task ID is incorrect or does not exist." });
        }

        [HttpPatch("{taskId:long}/restore")]
        public async Task<IActionResult> RestoreTask(long learnerId, long taskId)
        {
            if (await _taskRepo.RestoreTaskAsync(learnerId, taskId)) return Ok(new { Message = "Restored" });
            return NotFound(new { Message = "Learner ID or Task ID is incorrect or does not exist." });
        }

    }
}