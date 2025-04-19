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
        private readonly ILearnerRepository _learnerRepo;

        public LearningResourcesController(ILearningResourceRepository learningResourceRepository, ILearnerRepository learnerRepo)
        {
            _learningResourceRepo = learningResourceRepository;
            _learnerRepo = learnerRepo;
        } 
        
        
        // GetAll
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningResourceDto>>> 
        GetLearningResources(long learnerId, [FromQuery] LearningResourceQueryObject query)
        {
            var learningResources = await _learningResourceRepo.GetLearningResourcesAsync(learnerId,query);
            if (learningResources == null){
                return NotFound(new { Message = "Learner not found"});
            }
            return Ok(learningResources.Select(lr=> lr.ToLearningResourceDto()));
        }

        // GetDetailed
        [HttpGet("{learningResourceId}")]
        public async Task<ActionResult<LearningResourceDetailDto>>
        GetLearningResource(long learnerId, long learningResourceId){
            var existingLearningResource = await _learningResourceRepo.GetLearningResourceAsync(learnerId, learningResourceId);
            if (existingLearningResource == null)
            {
                return NotFound(new { Message = "Learner or Learning Resource not found"});
            }
            return Ok(existingLearningResource.ToLearningResourceDetailDto());
        }

        // Create
        [HttpPost]
        public async Task<ActionResult<LearningResourceDto>> CreateLearningResource(
            long learnerId,
            [FromBody] CreateLearningResourceRequestDto dto)
        {
            var existingLearner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (existingLearner == null) return NotFound(new{ Message = "Learner or Learning Resource not found"});

            var learningResource = dto.FromCreateDtoToLearningResource();
            await _learningResourceRepo.CreateLearningResourceAsync(learnerId, learningResource);
            
            return CreatedAtAction(nameof(GetLearningResource),
            new { learnerId = learnerId, learningResourceId = learningResource.Id }, 
            learningResource.ToLearningResourceDto());  
     
        }
        
        [HttpPatch("{learningResourcesId}")]
        public async Task<ActionResult<LearningResourceDto>> UpdateLearningResource(long learnerId,
        long learningResourcesId,
        [FromBody] PatchLearningResourceRequestDto dto)
        {
            var existingLearningResource = await _learningResourceRepo.GetLearningResourceAsync(learnerId, learningResourcesId);
            if (existingLearningResource == null) return NotFound(new {Message = "Learner or Learning Resource not found"});

            LearningResourceMapper.UpdateLearningResource(existingLearningResource, dto);
            await _learningResourceRepo.UpdateLearningResourceAsync(learnerId, learningResourcesId, existingLearningResource);

            return Ok(existingLearningResource.ToLearningResourceDto()); 
         }

         [HttpDelete("{learningResourceId}/hard-delete")]
         public async Task<ActionResult> HardDeleteLearningResource(long learnerId, long learningResourceId){
            if (await _learningResourceRepo.DeleteLearningResourceAsync(learnerId, learningResourceId)) return NoContent();
            return NotFound(new { Message = "Learner ID or Learning Resource ID is incorrect or does not exist." });
         }

         [HttpDelete("{learningResourceId}/soft-delete")]
         public async Task<ActionResult> SoftDeleteLearningResource(long learnerId, long learningResourceId){
            if (await _learningResourceRepo.SoftDeleteLearningResourceAsync(learnerId, learningResourceId)) return NoContent();
            return NotFound(new { Message = "Learner ID or Learning Resource ID is incorrect or does not exist." });
         }
         
         [HttpPatch("{learningResourceId}/restore")]
         public async Task<ActionResult> RestoreLearningResource(long learnerId, long learningResourceId){
            if (await _learningResourceRepo.RestoreLearningResourceAsync(learnerId, learningResourceId)) return Ok(new { Message = "Restored"});
            return NotFound(new { Message = "Learner ID or Learning Resource ID is incorrect or does not exist." });
         }
    }
}