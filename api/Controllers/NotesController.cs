using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Note;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/learners/{learnerId}/[controller]")]
    public class NotesController : ControllerBase
    {
         private readonly INoteRepository _noteRepo;
        private readonly ILearnerRepository _learnerRepo;

        public NotesController(INoteRepository noteRepo, ILearnerRepository learnerRepo)
        {
            _noteRepo = noteRepo;
            _learnerRepo = learnerRepo;
        }

        // GET: api/learners/{learnerId}/notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes(long learnerId, [FromQuery] NoteQueryObject query)
        {
            // Check if learner exists
            var existingLearner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (existingLearner == null) return NotFound(new { Message = "Learner not found." });

            var notes = await _noteRepo.GetNotesAsync(learnerId, query);
            return Ok(notes.Select(n => n.ToNoteDto()));
        }

        // GET: api/learners/{learnerId}/notes/{noteId}
        [HttpGet("{noteId}")]
        public async Task<ActionResult<NoteDetailDto>> GetNote(long learnerId, long noteId)
        {
            // Check if learner exists
            var existingLearner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (existingLearner == null) return NotFound(new { Message = "Learner not found." });

            var note = await _noteRepo.GetNoteAsync(learnerId, noteId);
            if (note == null) return NotFound(new { Message = "Note not found." });

            return Ok(note.ToNoteDetailDto());
        }

        // POST: api/learners/{learnerId}/notes
        [HttpPost]
        public async Task<IActionResult> CreateNote(long learnerId, [FromBody] CreateNoteRequestDto noteDto)
        {
            // Check if learner exists
            var existingLearner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (existingLearner == null) return NotFound(new { Message = "Learner not found." });

            var note = noteDto.ToNoteFromCreateDto();
            note.LearnerId = learnerId;

            await _noteRepo.CreateNoteAsync(learnerId, note);
            return CreatedAtAction(
                nameof(GetNote),
                new { learnerId = note.LearnerId, noteId = note.Id },
                note.ToNoteDto()
            );
        }

        // PATCH: api/learners/{learnerId}/notes/{noteId}
        [HttpPatch("{noteId}")]
        public async Task<IActionResult> UpdateNote(long learnerId, long noteId, [FromBody] PatchNoteRequestDto noteDto)
        {
            // Check if learner exists
            var existingLearner = await _learnerRepo.GetLearnerAsync(learnerId);
            if (existingLearner == null) return NotFound(new { Message = "Learner not found." });

            // Check if note exists
            var note = await _noteRepo.GetNoteAsync(learnerId, noteId);
            if (note == null) return NotFound(new { Message = "Note not found." });

            // Update Note using Mapper
            NoteMapper.UpdateNoteFromPatchDto(note, noteDto);

            await _noteRepo.UpdateNoteAsync(learnerId, noteId, note);
            return Ok(note.ToNoteDto());
        }

        // DELETE: api/learners/{learnerId}/notes/{noteId}/hard-delete
        [HttpDelete("{noteId}/hard-delete")]
        public async Task<IActionResult> HardDeleteNote(long learnerId, long noteId)
        {
            if (await _noteRepo.DeleteNoteAsync(learnerId, noteId))
            {
                return NoContent();
            }
            return NotFound(new { Message = "Note not found or already deleted." });
        }

        // DELETE: api/learners/{learnerId}/notes/{noteId}/soft-delete
        [HttpDelete("{noteId}/soft-delete")]
        public async Task<IActionResult> SoftDeleteNote(long learnerId, long noteId)
        {
            if (await _noteRepo.SoftDeleteNoteAsync(learnerId, noteId))
            {
                return Ok(new { Message = "Note soft deleted." });
            }
            return NotFound(new { Message = "Note not found or already soft deleted." });
        }

        // PATCH: api/learners/{learnerId}/notes/{noteId}/restore
        [HttpPatch("{noteId}/restore")]
        public async Task<IActionResult> RestoreNote(long learnerId, long noteId)
        {
            if (await _noteRepo.RestoreNoteAsync(learnerId, noteId))
            {
                return Ok(new { Message = "Note restored." });
            }
            return NotFound(new { Message = "Note not found or not soft deleted." });
        }
    }
}