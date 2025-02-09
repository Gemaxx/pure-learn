using api.Dtos.Goal;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/learners/{learnerId}/goals")]
    public class GoalsController : ControllerBase
    {
        private readonly IGoalRepository _goalRepo;
        private readonly ICategoryRepository _categoryRepo;
        private readonly ILearnerRepository _learnerRepo;

        public GoalsController(IGoalRepository goalRepo, ICategoryRepository categoryRepo, ILearnerRepository learnerRepo)
        {
            _goalRepo = goalRepo;
            _categoryRepo = categoryRepo;
            _learnerRepo = learnerRepo;
        }

        // GET: api/learners/{learnerId}/goals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GoalDto>>> GetGoals(int learnerId, [FromQuery] GoalQueryObject query)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

            var goals = await _goalRepo.GetGoalsAsync(learnerId, query);
            return Ok(goals.Select(g => g.ToGoalDto()));
        }

        // Post: api/learners/{learnerId}/goals
        [HttpPost]
        public async Task<IActionResult> CreateLearnerGoal(long learnerId, [FromBody] CreateGoalRequestDto goalDto)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

            // Check if category exists
            if (goalDto.CategoryId.HasValue)
            {
                var categoryExists = await _categoryRepo.CategoryExistsAsync(learnerId, goalDto.CategoryId.Value);
                if (!categoryExists) return NotFound(new { Message = "Category not found." });
            }
            
            var goal = goalDto.ToGoalFromCreateDto();
            goal.LearnerId = learnerId;

            await _goalRepo.CreateGoalAsync(learnerId, goal);
            return Ok(goal.ToGoalDto());
        }
    

        // GET: api/learners/{learnerId}/goals/{goalId}
        [HttpGet("{goalId}")]
        public async Task<ActionResult<GoalDetailDto>> GetGoal(int learnerId, long goalId)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

            var goal = await _goalRepo.GetGoalAsync(learnerId, goalId);
            if (goal == null) return NotFound(new { Message = "Goal not found." });

            return Ok(goal.ToGoalDetailDto());
        }
        
        // PATCH: api/learners/{learnerId}/goals/{goalId}
        [HttpPatch("{goalId}")]
        public async Task<IActionResult> UpdateGoal(int learnerId, long goalId, [FromBody] PatchGoalRequestDto goalDto)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

             // Check if category exists
            if (goalDto.CategoryId.HasValue)
            {
                var categoryExists = await _categoryRepo.CategoryExistsAsync(learnerId, goalDto.CategoryId.Value);
                if (!categoryExists) return NotFound(new { Message = "Category not found." });
            }
            
            var goal = await _goalRepo.GetGoalAsync(learnerId, goalId);
            if (goal == null) return NotFound(new { Message = "Goal not found." });           

            var updatedGoal = goalDto.ToGoalFromPatchDto();
            updatedGoal.Id = goalId;
            updatedGoal.LearnerId = learnerId;

            await _goalRepo.UpdateGoalAsync(learnerId, goalId, updatedGoal);
            return Ok(updatedGoal.ToGoalDto());
        }

        // DELETE: api/learners/{learnerId}/goals/{goalId}
        [HttpDelete("{goalId}/hard-delete")]
        public async Task<IActionResult> DeleteGoal(int learnerId, long goalId)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

            var goal = await _goalRepo.GetGoalAsync(learnerId, goalId);
            if (goal == null) return NotFound(new { Message = "Goal not found." });

            await _goalRepo.SoftDeleteGoalAsync(learnerId, goalId);
            return Ok(new { Message = "Goal hard deleted." });
        }

        // PATCH: api/learners/{learnerId}/goals/{goalId}/delete
        [HttpDelete("{goalId}/soft-delete")]
        public async Task<IActionResult> SoftDeleteGoal(int learnerId, long goalId)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

            var goal = await _goalRepo.GetGoalAsync(learnerId, goalId);
            if (goal == null) return NotFound(new { Message = "Goal not found." });

            await _goalRepo.SoftDeleteGoalAsync(learnerId, goalId);
            return Ok(new { Message = "Goal soft deleted." });
        }

        // PATCH: api/learners/{learnerId}/goals/{goalId}/restore
        [HttpPatch("{goalId}/restore")]
        public async Task<IActionResult> RestoreGoal(int learnerId, long goalId)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });
            
            var goal = await _goalRepo.FindDeletedGoalAsync(learnerId, goalId);
            if (goal == null) return NotFound(new { Message = "Goal not Soft-Deleted." });

            await _goalRepo.RestoreGoalAsync(learnerId, goalId);
            return Ok(new { Message = "Goal restored." }); 
         }         
    }
}