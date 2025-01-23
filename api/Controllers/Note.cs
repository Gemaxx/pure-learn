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
    public class NotesController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public NotesController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _context.Notes
                .Include(n => n.Category)
                .Include(n => n.Goal)
                .Include(n => n.Subgoal)
                .Include(n => n.Task)
                .Include(n => n.Learner)
                .ToListAsync();
        }

        // GET: api/notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(long id)
        {
            var note = await _context.Notes
                .Include(n => n.Category)
                .Include(n => n.Goal)
                .Include(n => n.Subgoal)
                .Include(n => n.Task)
                .Include(n => n.Learner)
                .FirstOrDefaultAsync(n => n.Id == id);

            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // PUT: api/notes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(long id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
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

        // POST: api/notes
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(Note note)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNote", new { id = note.Id }, note);
        }

        // DELETE: api/notes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Note>> DeleteNote(long id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return note;
        }

        private bool NoteExists(long id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}