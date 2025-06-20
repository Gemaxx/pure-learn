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
                Icon = taskTypeModel.Icon
            };
        }

        // Map from CreateTaskTypeDto to TaskType model.
        public static TaskType ToTaskTypeFromCreateDto(this CreateTaskTypeDto createDto)
        {
            return new TaskType
            {
                Name = createDto.Name,
                Description = createDto.Description,
                Icon = createDto.Icon
            };
        }

        // Update an existing TaskType using PatchTaskTypeDto.
        public static void UpdateTaskTypeFromPatchDto(this TaskType taskType, PatchTaskTypeDto patchDto)
        {
            if (!string.IsNullOrEmpty(patchDto.Name))
                taskType.Name = patchDto.Name;
            if (!string.IsNullOrEmpty(patchDto.Description))
                taskType.Description = patchDto.Description;
            if (patchDto.Icon != null)
                taskType.Icon = patchDto.Icon;
        }
    }
}