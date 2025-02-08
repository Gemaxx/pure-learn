using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Goal;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using api.Models;
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
                var categoryExists = await _categoryRepo.CategoryExistsAsync(goalDto.CategoryId.Value);
                if (!categoryExists) return NotFound(new { Message = "Category not found." });
            }
            
            var goal = goalDto.ToGoalFromCreateDto();
            goal.LearnerId = learnerId;

            await _goalRepo.CreateGoalAsync(learnerId, goal);
            return Ok(goal.ToGoalDto());
        }
    }
}