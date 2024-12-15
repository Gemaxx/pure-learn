using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KanbanStatusesController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public KanbanStatusesController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/kanbanstatuses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KanbanStatus>>> GetKanbanStatuses()
        {
            return await _context.KanbanStatuses.Include(k => k.Tasks).ToListAsync();
        }

        // GET: api/kanbanstatuses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KanbanStatus>> GetKanbanStatus(long id)
        {
            var kanbanStatus = await _context.KanbanStatuses.Include(k => k.Tasks)
                                                            .FirstOrDefaultAsync(k => k.Id == id);

            if (kanbanStatus == null)
            {
                return NotFound();
            }

            return kanbanStatus;
        }

        // PUT: api/kanbanstatuses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKanbanStatus(long id, KanbanStatus kanbanStatus)
        {
            if (id != kanbanStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(kanbanStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KanbanStatusExists(id))
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

        // POST: api/kanbanstatuses
        [HttpPost]
        public async Task<ActionResult<KanbanStatus>> PostKanbanStatus(KanbanStatus kanbanStatus)
        {
            _context.KanbanStatuses.Add(kanbanStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKanbanStatus", new { id = kanbanStatus.Id }, kanbanStatus);
        }

        // DELETE: api/kanbanstatuses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<KanbanStatus>> DeleteKanbanStatus(long id)
        {
            var kanbanStatus = await _context.KanbanStatuses.FindAsync(id);
            if (kanbanStatus == null)
            {
                return NotFound();
            }

            _context.KanbanStatuses.Remove(kanbanStatus);
            await _context.SaveChangesAsync();

            return kanbanStatus;
        }

        private bool KanbanStatusExists(long id)
        {
            return _context.KanbanStatuses.Any(e => e.Id == id);
        }
    }
}