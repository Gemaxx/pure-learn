using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Dtos.Task;

namespace api.Mapper
{
    public static class TaskMapper
    {
        public static TaskDto ToTaskDto(this Models.Task taskModel)
        {
            return new TaskDto
            {
                Id = taskModel.Id,
                Title = taskModel.Title,
                DueDate = taskModel.DueDate,
                EstimatedTime = taskModel.EstimatedTime,
                EisenhowerStatus = taskModel.EisenhowerStatus,
                TimeTaskRelated = taskModel.TimeTaskRelated,
                RepeatFrequency = taskModel.RepeatFrequency
            };
        }

        // Map from Task model to TaskDetailDto (detailed view)
        public static TaskDetailDto ToTaskDetailDto(this Models.Task taskModel)
        {
            return new TaskDetailDto
            {
                Id = taskModel.Id,
                Title = taskModel.Title,
                DueDate = taskModel.DueDate,
                EstimatedTime = taskModel.EstimatedTime,
                TimeSpent = taskModel.TimeSpent,
                EisenhowerStatus = taskModel.EisenhowerStatus,
                TimeTaskRelated = taskModel.TimeTaskRelated,
                RepeatFrequency = taskModel.RepeatFrequency,
                RepeatInterval = taskModel.RepeatInterval,
                RepeatOnSunday = taskModel.RepeatOnSunday,
                RepeatOnMonday = taskModel.RepeatOnMonday,
                RepeatOnTuesday = taskModel.RepeatOnTuesday,
                RepeatOnWednesday = taskModel.RepeatOnWednesday,
                RepeatOnThursday = taskModel.RepeatOnThursday,
                RepeatOnFriday = taskModel.RepeatOnFriday,
                RepeatOnSaturday = taskModel.RepeatOnSaturday,
                RepeatEnds = taskModel.RepeatEnds,
                RepeatEndDate = taskModel.RepeatEndDate,
                RepeatEndOccurrences = taskModel.RepeatEndOccurrences,
                CreatedAt = taskModel.CreatedAt,
                UpdatedAt = taskModel.UpdatedAt
            };
        }

        // Map from CreateTaskRequestDto to Task model (for new tasks)
        public static Models.Task ToTaskFromCreateDto(this CreateTaskDto createDto)
        {
            return new Models.Task
            {
                Title = createDto.Title,
                DueDate = createDto.DueDate,
                EstimatedTime = createDto.EstimatedTime,
                TimeSpent = createDto.TimeSpent,
                EisenhowerStatus = createDto.EisenhowerStatus,
                TimeTaskRelated = createDto.TimeTaskRelated,
                RepeatFrequency = createDto.RepeatFrequency,
                RepeatInterval = createDto.RepeatInterval,
                RepeatOnSunday = createDto.RepeatOnSunday,
                RepeatOnMonday = createDto.RepeatOnMonday,
                RepeatOnTuesday = createDto.RepeatOnTuesday,
                RepeatOnWednesday = createDto.RepeatOnWednesday,
                RepeatOnThursday = createDto.RepeatOnThursday,
                RepeatOnFriday = createDto.RepeatOnFriday,
                RepeatOnSaturday = createDto.RepeatOnSaturday,
                RepeatEnds = createDto.RepeatEnds,
                RepeatEndDate = createDto.RepeatEndDate,
                RepeatEndOccurrences = createDto.RepeatEndOccurrences
            };
        }

        // Map from PatchTaskRequestDto to update an existing Task model
        public static void UpdateTaskFromPatchDto(this Models.Task task, PatchTaskRequest patchDto)
        {
            if (!string.IsNullOrEmpty(patchDto.Title))
                task.Title = patchDto.Title;

            if (patchDto.DueDate.HasValue)
                task.DueDate = patchDto.DueDate.Value;

            if (patchDto.EstimatedTime.HasValue)
                task.EstimatedTime = patchDto.EstimatedTime.Value;

            if (patchDto.TimeSpent.HasValue)
                task.TimeSpent = patchDto.TimeSpent.Value;

            if (!string.IsNullOrEmpty(patchDto.EisenhowerStatus))
                task.EisenhowerStatus = patchDto.EisenhowerStatus;

            if (!string.IsNullOrEmpty(patchDto.TimeTaskRelated))
                task.TimeTaskRelated = patchDto.TimeTaskRelated;

            if (!string.IsNullOrEmpty(patchDto.RepeatFrequency))
                task.RepeatFrequency = patchDto.RepeatFrequency;

            if (patchDto.RepeatInterval.HasValue)
                task.RepeatInterval = patchDto.RepeatInterval;

            if (patchDto.RepeatOnSunday.HasValue)
                task.RepeatOnSunday = patchDto.RepeatOnSunday.Value;

            if (patchDto.RepeatOnMonday.HasValue)
                task.RepeatOnMonday = patchDto.RepeatOnMonday.Value;

            if (patchDto.RepeatOnTuesday.HasValue)
                task.RepeatOnTuesday = patchDto.RepeatOnTuesday.Value;

            if (patchDto.RepeatOnWednesday.HasValue)
                task.RepeatOnWednesday = patchDto.RepeatOnWednesday.Value;

            if (patchDto.RepeatOnThursday.HasValue)
                task.RepeatOnThursday = patchDto.RepeatOnThursday.Value;

            if (patchDto.RepeatOnFriday.HasValue)
                task.RepeatOnFriday = patchDto.RepeatOnFriday.Value;

            if (patchDto.RepeatOnSaturday.HasValue)
                task.RepeatOnSaturday = patchDto.RepeatOnSaturday.Value;

            if (!string.IsNullOrEmpty(patchDto.RepeatEnds))
                task.RepeatEnds = patchDto.RepeatEnds;

            if (patchDto.RepeatEndDate.HasValue)
                task.RepeatEndDate = patchDto.RepeatEndDate.Value;

            if (patchDto.RepeatEndOccurrences.HasValue)
                task.RepeatEndOccurrences = patchDto.RepeatEndOccurrences.Value;
        }
    }
}