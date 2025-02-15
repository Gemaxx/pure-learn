using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.LearningResourceType;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/learners/{learnerId}/learningResourceTypes")]
    public class LearningResourceTypesController : ControllerBase
    {
        private readonly ILearningResourceTypeRepository _learningResourceTypeRepo;
        private readonly ILearnerRepository _learnerRepo;
        private readonly IGoalRepository _goalRepo;

        public LearningResourceTypesController(
            ILearningResourceTypeRepository learningResourceTypeRepo,
            ILearnerRepository learnerRepo,
            IGoalRepository goalRepo)
        {
            _learningResourceTypeRepo = learningResourceTypeRepo;
            _learnerRepo = learnerRepo;
            _goalRepo = goalRepo;
        }

        // Get all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningResourceTypeDto>>> GetLearningResourceTypes(
            long learnerId,
            [FromQuery] LearningResourceTypeQueryObject query)
        {
            var learningResourceTypes = await _learningResourceTypeRepo.GetLearningResourceTypesAsync(learnerId, query);

            if (!learningResourceTypes.Any())
            {
                return Ok(new List<LearningResourceTypeDto>());
            }
            return Ok(learningResourceTypes.Select(lrt => lrt.ToLearningResourceTypeDto()));
        }

        // Get detailed
        [HttpGet("{learningResourceTypeId}")]
        public async Task<ActionResult<LearningResourceTypeDetailDto>> GetLearningResourceType(
            long learnerId, 
            long learningResourceTypeId)
        {
            var existingLearningResourceType = await _learningResourceTypeRepo
                .GetLearningResourceTypeAsync(learnerId, learningResourceTypeId);
            
            if (existingLearningResourceType == null)
            {
                return NotFound(new { Message = "Learner ID or Learning Resource Type ID is incorrect or does not exist." });
            }
            return Ok(existingLearningResourceType.ToLearningResourceTypeDetailDto());
        }

        // Create
        [HttpPost]
        public async Task<ActionResult> CreateLearningResourceType(
            long learnerId, 
            [FromBody] CreateLearningResourceTypeRequestDto learningResourceTypeDto)
        {
            var existingLearner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (existingLearner == null) return NotFound(new { Message = "Learner not found." });

            var learningResourceType = learningResourceTypeDto.ToLearningResourceType();
            await _learningResourceTypeRepo.CreateLearningResourceTypeAsync(learnerId, learningResourceType);

            return CreatedAtAction(nameof(GetLearningResourceType), 
                new { learnerId = learnerId, learningResourceTypeId = learningResourceType.Id }, 
                learningResourceType);
        }

        // Update
        [HttpPatch("{learningResourceTypeId}")]
        public async Task<ActionResult<LearningResourceTypeDto>> UpdateLearningResourceType(
            long learnerId, 
            long learningResourceTypeId, 
            [FromBody] PatchLearningResourceTypeRequestDto dto)
        {
            var existingLearningResourceType = await _learningResourceTypeRepo
                .GetLearningResourceTypeAsync(learnerId, learningResourceTypeId);
            
            if (existingLearningResourceType == null)
            {
                return NotFound(new { Message = "Learner or Learning Resource Type not found" });
            }

            LearningResourceTypeMapper.UpdateLearningResourceType(existingLearningResourceType, dto);
            await _learningResourceTypeRepo.UpdateLearningResourceTypeAsync(learnerId, learningResourceTypeId, existingLearningResourceType);

            return Ok(existingLearningResourceType.ToLearningResourceTypeDto());
        }

        // Hard Delete
        [HttpDelete("{learningResourceTypeId}/hard-delete")]
        public async Task<ActionResult> HardDeleteLearningResourceType(long learnerId, long learningResourceTypeId)
        {
            if (await _learningResourceTypeRepo.DeleteLearningResourceTypeAsync(learnerId, learningResourceTypeId))
            {
                return NoContent();
            }
            return NotFound(new { Message = "Learner ID or Learning Resource Type ID is incorrect or does not exist." });
        }

        // Soft Delete
        [HttpDelete("{learningResourceTypeId}/soft-delete")]
        public async Task<ActionResult> SoftDeleteLearningResourceType(long learnerId, long learningResourceTypeId)
        {
            if (await _learningResourceTypeRepo.SoftDeleteLearningResourceTypeAsync(learnerId, learningResourceTypeId))
            {
                return NoContent();
            }
            return NotFound(new { Message = "Learner ID or Learning Resource Type ID is incorrect or does not exist." });
        }

        // Restore
        [HttpPatch("{learningResourceTypeId}/restore")]
        public async Task<ActionResult> RestoreLearningResourceType(long learnerId, long learningResourceTypeId)
        {
            if (await _learningResourceTypeRepo.RestoreLearningResourceTypeAsync(learnerId, learningResourceTypeId))
            {
                return Ok(new { Message = "Learning Resource Type restored." });
            }
            return NotFound(new { Message = "Learner ID or Learning Resource Type ID is incorrect or does not exist." });
        }
    }
}
