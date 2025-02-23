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
                Status = subtaskModel.Status,
                CreatedAt = subtaskModel.CreatedAt,
                UpdatedAt = subtaskModel.UpdatedAt
            };
        }

        // Mapping from CreateSubtaskRequestDto to Subtask model
        public static Subtask ToSubtaskFromCreateDto(this CreateSubtaskRequestDto createDto)
        {
            return new Subtask
            {
                Title = createDto.Title,
                Status = createDto.Status
                // Audit fields will be set in the repository or automatically.
            };
        }

        // Update an existing Subtask model using PatchSubtaskRequestDto
        public static void UpdateSubtaskFromPatchDto(this Subtask subtask, PatchSubtaskRequestDto patchDto)
        {
            if (!string.IsNullOrEmpty(patchDto.Title))
                subtask.Title = patchDto.Title;
            if (!string.IsNullOrEmpty(patchDto.Status))
                subtask.Status = patchDto.Status;
        }
    }
}