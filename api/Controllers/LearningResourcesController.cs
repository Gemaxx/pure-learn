using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.LearningResource;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/learners/{learnerId}/LearningResources")]
    public class LearningResourcesController : ControllerBase
    {
        private readonly ILearningResourceRepository _learningResourceRepo;

        public LearningResourcesController(ILearningResourceRepository learningResourceRepository)
        {
            _learningResourceRepo = learningResourceRepository;
        } 
        
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningResourceDto>>> GetLearningResources(long learnerId, [FromQuery] LearningResourceQueryObject query)
        {
            var learningResources = await _learningResourceRepo.GetLearningResourcesAsync(learnerId,query);
            if (learningResources == null){
                return NotFound(new { Message = "Learner not found"});
            }
            return Ok(learningResources.Select(lr=> lr.ToLearningResourceDto()));
        }   

    }
}

/*
            var existedgoal = await _goalRepo.GetGoalAsync(learnerId, createLearningResourceTypeRequestDto.goalId);
            if (existedgoal == null) return NotFound(new { Message = "goal not found." });
*/