using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Note;
using api.Models;

namespace api.Mapper
{
    public static class NoteMapper
    {
        
         public static NoteDto ToNoteDto(this Note note)
        {
            return new NoteDto
            {
                Id = note.Id,
                GoalId = note.GoalId,
                Title = note.Title,
                Body = note.Body
            };
        }

        // Convert Note model to NoteDetailDto
        public static NoteDetailDto ToNoteDetailDto(this Note note)
        {
            return new NoteDetailDto
            {
                Id = note.Id,
                Title = note.Title,
                Body = note.Body,
                CreatedAt = note.CreatedAt,
                UpdatedAt = note.UpdatedAt,
                DeletedAt = note.DeletedAt,
                LearnerId = note.LearnerId,
                GoalId = note.GoalId,
                /*
                CategoryId = note.CategoryId,
                SubgoalId = note.SubgoalId,
                TaskId = note.TaskId,
                */
                IsDeleted = note.IsDeleted
            };
        }

        // Convert CreateNoteRequestDto to Note model
        public static Note ToNoteFromCreateDto(this CreateNoteRequestDto noteDto)
        {
            return new Note
            {
                Title = noteDto.Title,
                Body = noteDto.Body,
                // CategoryId = noteDto.CategoryId,
                GoalId = noteDto.GoalId,
                // SubgoalId = noteDto.SubgoalId,
                // TaskId = noteDto.TaskId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };
        }

        // Update existing Note model from PatchNoteRequestDto
        public static void UpdateNoteFromPatchDto(this Note note, PatchNoteRequestDto patchNoteDto)
        {
            if (patchNoteDto.Title != null)
            {
                note.Title = patchNoteDto.Title;
            }
            
            if (patchNoteDto.Body != null)
            {
                note.Body = patchNoteDto.Body;
            }

            if (patchNoteDto.GoalId.HasValue)
            {
                note.GoalId = patchNoteDto.GoalId;
            }
            
            /*
            if (patchNoteDto.CategoryId.HasValue)
            {
                note.CategoryId = patchNoteDto.CategoryId;
            }


            if (patchNoteDto.SubgoalId.HasValue)
            {
                note.SubgoalId = patchNoteDto.SubgoalId;
            }

            if (patchNoteDto.TaskId.HasValue)
            {
                note.TaskId = patchNoteDto.TaskId;
            }
            */
            note.UpdatedAt = DateTime.UtcNow;
        }
    }
}