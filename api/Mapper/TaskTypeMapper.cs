using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.TaskType;
using api.Models;

namespace api.Mapper
{
    public static class TaskTypeMapper
    {
        // Map from TaskType model to TaskTypeDto.
        public static TaskTypeDto ToTaskTypeDto(this TaskType taskTypeModel)
        {
            return new TaskTypeDto
            {
                Id = taskTypeModel.Id,
                Name = taskTypeModel.Name,
                Description = taskTypeModel.Description,
                Icon = taskTypeModel.Icon != null ? Convert.ToBase64String(taskTypeModel.Icon) : null
            };
        }

        // Map from CreateTaskTypeDto to TaskType model.
        public static TaskType ToTaskTypeFromCreateDto(this CreateTaskTypeDto createDto)
        {
            return new TaskType
            {
                Name = createDto.Name,
                Description = createDto.Description,
                Icon = !string.IsNullOrEmpty(createDto.Icon) ? Convert.FromBase64String(createDto.Icon) : null
            };
        }

        // Update an existing TaskType using PatchTaskTypeDto.
        public static void UpdateTaskTypeFromPatchDto(this TaskType taskType, PatchTaskTypeDto patchDto)
        {
            if (!string.IsNullOrEmpty(patchDto.Name))
                taskType.Name = patchDto.Name;
            if (!string.IsNullOrEmpty(patchDto.Description))
                taskType.Description = patchDto.Description;
            if (!string.IsNullOrEmpty(patchDto.Icon))
                taskType.Icon = Convert.FromBase64String(patchDto.Icon);
        }
    }
}