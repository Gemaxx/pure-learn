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
    public class SubtasksController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public SubtasksController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/subtasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subtask>>> GetSubtasks()
        {
            return await _context.Subtasks
                .Include(s => s.Task)  // Include related Task
                .ToListAsync();
        }

        // GET: api/subtasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subtask>> GetSubtask(long id)
        {
            var subtask = await _context.Subtasks
                .Include(s => s.Task)  // Include related Task
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subtask == null)
            {
                return NotFound();
            }

            return subtask;
        }

        // PUT: api/subtasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubtask(long id, Subtask subtask)
        {
            if (id != subtask.Id)
            {
                return BadRequest();
            }

            _context.Entry(subtask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubtaskExists(id))
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

        // POST: api/subtasks
        [HttpPost]
        public async Task<ActionResult<Subtask>> PostSubtask(Subtask subtask)
        {
            _context.Subtasks.Add(subtask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubtask", new { id = subtask.Id }, subtask);
        }

        // DELETE: api/subtasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Subtask>> DeleteSubtask(long id)
        {
            var subtask = await _context.Subtasks.FindAsync(id);
            if (subtask == null)
            {
                return NotFound();
            }

            _context.Subtasks.Remove(subtask);
            await _context.SaveChangesAsync();

            return subtask;
        }

        private bool SubtaskExists(long id)
        {
            return _context.Subtasks.Any(e => e.Id == id);
        }
    }
}