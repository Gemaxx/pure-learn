using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Learner;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LearnersController : ControllerBase
    {
    private readonly ILearnerRepository _learnerRepo;
    public LearnersController(ILearnerRepository learnerRepo)
    {
        _learnerRepo = learnerRepo;
    }
    
        
    // GET: api/learner
        [HttpGet("{learnerId}")]
        public async Task<ActionResult<LearnerDetailsDto>> GetLearner(long learnerId)
        {
            var learner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (learner == null) return NotFound(new { Message = "Learner not found." });
            return Ok(learner.ToLearnerDetailsDto());
        }
    
    }
}