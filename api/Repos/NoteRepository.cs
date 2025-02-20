using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repos
{
    public class NoteRepository : INoteRepository
    {
        private readonly PureLearnDbContext _context;

        public NoteRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        // Get all notes for a specific learner with filtering and sorting
        public async Task<List<Note>> GetNotesAsync(long learnerId, NoteQueryObject query)
        {
            var notesQuery = _context.Notes
                .Where(n => n.LearnerId == learnerId && n.IsDeleted == query.IsDeleted)
                .AsQueryable();

            // Filtering
            if (!string.IsNullOrEmpty(query.Title))
            {
                notesQuery = notesQuery.Where(n => n.Title.Contains(query.Title));
            }
      
            if (query.GoalId.HasValue)
            {
                notesQuery = notesQuery.Where(n => n.GoalId == query.GoalId);
            }

            /*
            if (query.CategoryId.HasValue)
            {
                notesQuery = notesQuery.Where(n => n.CategoryId == query.CategoryId);
            }
            
            if (query.SubgoalId.HasValue)
            {
                notesQuery = notesQuery.Where(n => n.SubgoalId == query.SubgoalId);
            }
            
            if (query.TaskId.HasValue)
            {
                notesQuery = notesQuery.Where(n => n.TaskId == query.TaskId);
            }
            */

            // Sorting
            if (query.SortBy == "title")
            {
                notesQuery = query.IsDescending ? notesQuery.OrderByDescending(n => n.Title) : notesQuery.OrderBy(n => n.Title);
            }
            else
            {
                notesQuery = query.IsDescending ? notesQuery.OrderByDescending(n => n.CreatedAt) : notesQuery.OrderBy(n => n.CreatedAt);
            }

            // Pagination
            return await notesQuery
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();
        }

        // Get a specific note by learner ID and note ID
        public async Task<Note?> GetNoteAsync(long learnerId, long noteId)
        {
            return await _context.Notes
                .FirstOrDefaultAsync(n => n.LearnerId == learnerId && n.Id == noteId && !n.IsDeleted);
        }

        // Create a new note
        public async Task<Note> CreateNoteAsync(long learnerId, Note note)
        {
            note.LearnerId = learnerId;
            note.CreatedAt = DateTime.UtcNow;
            note.UpdatedAt = DateTime.UtcNow;

            await _context.Notes.AddAsync(note);
            await _context.SaveChangesAsync();
            return note;
        }

        // Update an existing note
        public async Task<Note?> UpdateNoteAsync(long learnerId, long noteId, Note updatedNote)
        {
            var existingNote = await GetNoteAsync(learnerId, noteId);
            if (existingNote == null) return null;

            if (!string.IsNullOrEmpty(updatedNote.Title))
                existingNote.Title = updatedNote.Title;

            if (!string.IsNullOrEmpty(updatedNote.Body))
                existingNote.Body = updatedNote.Body;

            if (updatedNote.CategoryId.HasValue)
                existingNote.CategoryId = updatedNote.CategoryId;

            if (updatedNote.GoalId.HasValue)
                existingNote.GoalId = updatedNote.GoalId;

            if (updatedNote.SubgoalId.HasValue)
                existingNote.SubgoalId = updatedNote.SubgoalId;

            if (updatedNote.TaskId.HasValue)
                existingNote.TaskId = updatedNote.TaskId;

            existingNote.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return existingNote;
        }

        // Hard delete a note
        public async Task<bool> DeleteNoteAsync(long learnerId, long noteId)
        {
            var note = await GetNoteAsync(learnerId, noteId);
            if (note == null) return false;

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return true;
        }

        // Soft delete a note
        public async Task<bool> SoftDeleteNoteAsync(long learnerId, long noteId)
        {
            var note = await GetNoteAsync(learnerId, noteId);
            if (note == null || note.IsDeleted) return false;

            note.IsDeleted = true;
            note.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        // Restore a soft-deleted note
        public async Task<bool> RestoreNoteAsync(long learnerId, long noteId)
        {
            var note = await _context.Notes
                .FirstOrDefaultAsync(n => n.LearnerId == learnerId && n.Id == noteId && n.IsDeleted);

            if (note == null) return false;

            note.IsDeleted = false;
            note.DeletedAt = null;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
