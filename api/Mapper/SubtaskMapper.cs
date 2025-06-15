using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Subtask;
using api.Models;

namespace api.Mapper
{
    public static class SubtaskMapper
    {
        // Mapping from Subtask model to SubtaskDto
        public static SubtaskDto ToSubtaskDto(this Subtask subtaskModel)
        {
            return new SubtaskDto
            {
                Id = subtaskModel.Id,
                Title = subtaskModel.Title,
                CreatedAt = subtaskModel.CreatedAt,
                UpdatedAt = subtaskModel.UpdatedAt,
                IsCompleted = subtaskModel.IsCompleted
            };
        }

        // Mapping from CreateSubtaskRequestDto to Subtask model
        public static Subtask ToSubtaskFromCreateDto(this CreateSubtaskRequestDto createDto)
        {
            return new Subtask
            {
                Title = createDto.Title,
            };
        }

        // Update an existing Subtask model using PatchSubtaskRequestDto
        public static void UpdateSubtaskFromPatchDto(this Subtask subtask, PatchSubtaskRequestDto patchDto)
        {
            if (!string.IsNullOrEmpty(patchDto.Title))
                subtask.Title = patchDto.Title;
            if (patchDto.IsCompleted.HasValue)
                subtask.IsCompleted = patchDto.IsCompleted.Value;
        }
    }
}