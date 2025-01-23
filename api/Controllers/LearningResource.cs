using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LearningResourcesController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public LearningResourcesController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/learningresources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningResource>>> GetLearningResources()
        {
            return await _context.LearningResources
                                 .Include(lr => lr.Learner)
                                 .Include(lr => lr.Category)
                                 .Include(lr => lr.Goal)
                                 .Include(lr => lr.Subgoal)
                                 .Include(lr => lr.Type)
                                 .Include(lr => lr.Tasks)
                                 .ToListAsync();
        }

        // GET: api/learningresources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LearningResource>> GetLearningResource(long id)
        {
            var learningResource = await _context.LearningResources
                                                 .Include(lr => lr.Learner)
                                                 .Include(lr => lr.Category)
                                                 .Include(lr => lr.Goal)
                                                 .Include(lr => lr.Subgoal)
                                                 .Include(lr => lr.Type)
                                                 .Include(lr => lr.Tasks)
                                                 .FirstOrDefaultAsync(lr => lr.Id == id);

            if (learningResource == null)
            {
                return NotFound();
            }

            return learningResource;
        }

        // PUT: api/learningresources/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLearningResource(long id, LearningResource learningResource)
        {
            if (id != learningResource.Id)
            {
                return BadRequest();
            }

            _context.Entry(learningResource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LearningResourceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/learningresources
        [HttpPost]
        public async Task<ActionResult<LearningResource>> PostLearningResource(LearningResource learningResource)
        {
            _context.LearningResources.Add(learningResource);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLearningResource", new { id = learningResource.Id }, learningResource);
        }

        // DELETE: api/learningresources/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LearningResource>> DeleteLearningResource(long id)
        {
            var learningResource = await _context.LearningResources.FindAsync(id);
            if (learningResource == null)
            {
                return NotFound();
            }

            _context.LearningResources.Remove(learningResource);
            await _context.SaveChangesAsync();

            return learningResource;
        }

        private bool LearningResourceExists(long id)
        {
            return _context.LearningResources.Any(e => e.Id == id);
        }
    }
}