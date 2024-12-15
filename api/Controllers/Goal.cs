using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public GoalsController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/goals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoals()
        {
            return await _context.Goals.Include(g => g.Learner)
                                       .Include(g => g.Category)
                                       .Include(g => g.LearningResources)
                                       .Include(g => g.Notes)
                                       .Include(g => g.Subgoals)
                                       .Include(g => g.Tasks)
                                       .ToListAsync();
        }

        // GET: api/goals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Goal>> GetGoal(long id)
        {
            var goal = await _context.Goals.Include(g => g.Learner)
                                            .Include(g => g.Category)
                                            .Include(g => g.LearningResources)
                                            .Include(g => g.Notes)
                                            .Include(g => g.Subgoals)
                                            .Include(g => g.Tasks)
                                            .FirstOrDefaultAsync(g => g.Id == id);

            if (goal == null)
            {
                return NotFound();
            }

            return goal;
        }

        // PUT: api/goals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGoal(long id, Goal goal)
        {
            if (id != goal.Id)
            {
                return BadRequest();
            }

            _context.Entry(goal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoalExists(id))
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

        // POST: api/goals
        [HttpPost]
        public async Task<ActionResult<Goal>> PostGoal(Goal goal)
        {
            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGoal", new { id = goal.Id }, goal);
        }

        // DELETE: api/goals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Goal>> DeleteGoal(long id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null)
            {
                return NotFound();
            }

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();

            return goal;
        }

        private bool GoalExists(long id)
        {
            return _context.Goals.Any(e => e.Id == id);
        }
    }
}