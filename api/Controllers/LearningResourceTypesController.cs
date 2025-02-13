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

        public LearningResourceTypesController (ILearningResourceTypeRepository learningResourceTypeRepo)
        {
            _learningResourceTypeRepo = learningResourceTypeRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningResourceTypeDto>>> GetLearningResourceTypes (long learnerId, [FromQuery] LearningResourceTypeQueryObject query) {
            var learningResourceTypes = await _learningResourceTypeRepo
            .GetLearningResourceTypesAsync(learnerId, query);

            if (learningResourceTypes == null)
            {
                return NotFound( new { Message = "Learner not found"});                
            }
            return Ok(learningResourceTypes.Select(lrt => lrt.ToLearningResourceTypeDto()));
        }
    }
}