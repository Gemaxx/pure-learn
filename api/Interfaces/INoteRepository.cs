using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Search;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface INoteRepository
    {
        // Get all notes for a specific learner with optional query parameters
        Task<List<Note>> GetNotesAsync(long learnerId, NoteQueryObject query);

        // Get a specific note by learner ID and note ID
        Task<Note?> GetNoteAsync(long learnerId, long noteId);

        // Create a new note for a specific learner
        Task<Note> CreateNoteAsync(long learnerId, Note note);

        // Update an existing note
        Task<Note?> UpdateNoteAsync(long learnerId, long noteId, Note note);

        // Delete a note permanently
        Task<bool> DeleteNoteAsync(long learnerId, long noteId);

        // Soft delete a note (mark as deleted)
        Task<bool> SoftDeleteNoteAsync(long learnerId, long noteId);

        // Restore a soft-deleted note
        Task<bool> RestoreNoteAsync(long learnerId, long noteId);

        // global search for notes
        Task<List<SearchResultDto>> SearchNotesAsync(string term, long learnerId);

    }
}