using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubgoalsController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public SubgoalsController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/subgoals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subgoal>>> GetSubgoals()
        {
            return await _context.Subgoals
                .Include(s => s.Goal)
                .Include(s => s.LearningResources)
                .Include(s => s.Notes)
                .Include(s => s.Tasks)
                .ToListAsync();
        }

        // GET: api/subgoals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subgoal>> GetSubgoal(long id)
        {
            var subgoal = await _context.Subgoals
                .Include(s => s.Goal)
                .Include(s => s.LearningResources)
                .Include(s => s.Notes)
                .Include(s => s.Tasks)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subgoal == null)
            {
                return NotFound();
            }

            return subgoal;
        }

        // PUT: api/subgoals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubgoal(long id, Subgoal subgoal)
        {
            if (id != subgoal.Id)
            {
                return BadRequest();
            }

            _context.Entry(subgoal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubgoalExists(id))
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

        // POST: api/subgoals
        [HttpPost]
        public async Task<ActionResult<Subgoal>> PostSubgoal(Subgoal subgoal)
        {
            _context.Subgoals.Add(subgoal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubgoal", new { id = subgoal.Id }, subgoal);
        }

        // DELETE: api/subgoals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Subgoal>> DeleteSubgoal(long id)
        {
            var subgoal = await _context.Subgoals.FindAsync(id);
            if (subgoal == null)
            {
                return NotFound();
            }

            _context.Subgoals.Remove(subgoal);
            await _context.SaveChangesAsync();

            return subgoal;
        }

        private bool SubgoalExists(long id)
        {
            return _context.Subgoals.Any(e => e.Id == id);
        }
    }
}