using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.KanbanStatus;
using api.Models;
namespace api.Mapper
{
    public static class KanbansStatusMapper
    {
        // Convert KanbanStatus model to KanbanStatusDto.
        public static KanbanStatusDto ToKanbanStatusDto(this KanbanStatus statusModel)
        {
            return new KanbanStatusDto
            {
                Id = statusModel.Id,
                Name = statusModel.Name,
                MaxTasks = statusModel.MaxTasks,
            };
        }

        // Convert CreateKanbanStatusDto to KanbanStatus model.
        public static KanbanStatus ToKanbanStatusFromCreateDto(this CreateKanbanStatusDto createDto)
        {
            return new KanbanStatus
            {
                Name = createDto.Name,
                MaxTasks = createDto.MaxTasks
            };
        }

        // Update an existing KanbanStatus model using PatchKanbanStatusDto.
        public static void UpdateKanbanStatusFromPatchDto(this KanbanStatus statusModel, PatchKanbanStatusDto patchDto)
        {
            if (!string.IsNullOrEmpty(patchDto.Name))
                statusModel.Name = patchDto.Name;
            if (patchDto.MaxTasks.HasValue)
                statusModel.MaxTasks = patchDto.MaxTasks.Value;
        }
    }
}