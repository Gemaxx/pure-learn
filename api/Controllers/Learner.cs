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
    public class LearnersController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public LearnersController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/learners
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Learner>>> GetLearners()
        {
            return await _context.Learners
                                
                                 .ToListAsync();
        }

        // GET: api/learners/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Learner>> GetLearner(long id)
        {
            var learner = await _context.Learners
                                         .Include(l => l.Categories)
                                         .Include(l => l.Goals)
                                         .Include(l => l.LearningResources)
                                         .Include(l => l.Notes)
                                         .Include(l => l.Tasks)
                                         .FirstOrDefaultAsync(l => l.Id == id);

            if (learner == null)
            {
                return NotFound();
            }

            return learner;
        }

        // PUT: api/learners/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLearner(long id, Learner learner)
        {
            if (id != learner.Id)
            {
                return BadRequest();
            }

            _context.Entry(learner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LearnerExists(id))
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

        // POST: api/learners
        [HttpPost]
        public async Task<ActionResult<Learner>> PostLearner(Learner learner)
        {
            _context.Learners.Add(learner);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLearner", new { id = learner.Id }, learner);
        }

        // DELETE: api/learners/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Learner>> DeleteLearner(long id)
        {
            var learner = await _context.Learners.FindAsync(id);
            if (learner == null)
            {
                return NotFound();
            }

            _context.Learners.Remove(learner);
            await _context.SaveChangesAsync();

            return learner;
        }

        private bool LearnerExists(long id)
        {
            return _context.Learners.Any(e => e.Id == id);
        }
    }
}