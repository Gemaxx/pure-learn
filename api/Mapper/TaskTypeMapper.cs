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
                Icon = taskTypeModel.Icon != null && taskTypeModel.Icon.Length > 0 ? Convert.ToBase64String(taskTypeModel.Icon) : null
            };
        }

        // Map from CreateTaskTypeDto to TaskType model.
        public static TaskType ToTaskTypeFromCreateDto(this CreateTaskTypeDto createDto)
        {
            byte[]? iconBytes = null;
            
            if (!string.IsNullOrEmpty(createDto.Icon))
            {
                try
                {
                    // Check if it's a valid base64 string
                    if (IsValidBase64String(createDto.Icon))
                    {
                        iconBytes = Convert.FromBase64String(createDto.Icon);
                    }
                }
                catch
                {
                    // If conversion fails, set to null
                    iconBytes = null;
                }
            }

            return new TaskType
            {
                Name = createDto.Name,
                Description = createDto.Description,
                Icon = iconBytes
            };
        }

        // Helper method to validate base64 string
        private static bool IsValidBase64String(string base64)
        {
            if (string.IsNullOrEmpty(base64))
                return false;

            try
            {
                Convert.FromBase64String(base64);
                return true;
            }
            catch
            {
                return false;
            }
        }

        // Update an existing TaskType using PatchTaskTypeDto.
        public static void UpdateTaskTypeFromPatchDto(this TaskType taskType, PatchTaskTypeDto patchDto)
        {
            if (!string.IsNullOrEmpty(patchDto.Name))
                taskType.Name = patchDto.Name;
            if (!string.IsNullOrEmpty(patchDto.Description))
                taskType.Description = patchDto.Description;
            if (!string.IsNullOrEmpty(patchDto.Icon))
            {
                try
                {
                    // Check if it's a valid base64 string
                    if (IsValidBase64String(patchDto.Icon))
                    {
                        taskType.Icon = Convert.FromBase64String(patchDto.Icon);
                    }
                }
                catch
                {
                    // If conversion fails, keep existing icon or set to null
                    taskType.Icon = null;
                }
            }
        }
    }
}