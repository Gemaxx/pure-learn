using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Dtos.Task;
using api.Dtos.Subtask;

namespace api.Mapper
{
    public static class TaskMapper
    {
        // Mapping from Task model to TaskDto (basic view)
        public static TaskDto ToTaskDto(this Models.Task taskModel)
        {
            return new TaskDto
            {
                Id = taskModel.Id,
                GoalId = taskModel.GoalId ?? 0,
                KanbanStatusId = taskModel.KanbanStatusId,
                TypeId = taskModel.TypeId,
                Title = taskModel.Title,
                EisenhowerStatus = taskModel.EisenhowerStatus,
                TimeTaskRelated = taskModel.TimeTaskRelated,
                DueDate = taskModel.DueDate,
                EstimatedTime = taskModel.EstimatedTime,
                TimeSpent = taskModel.TimeSpent,
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
                Priority = taskModel.Priority // Added here

            };
        }

        // Mapping from CreateTaskRequestDto to Task model
        public static Models.Task ToTaskEntity(this CreateTaskRequestDto createDto)
        {
            return new Models.Task
            {
                GoalId = createDto.GoalId,
                KanbanStatusId = createDto.KanbanStatusId,
                TypeId = createDto.TypeId,
                Title = createDto.Title,
                EisenhowerStatus = createDto.EisenhowerStatus,
                TimeTaskRelated = createDto.TimeTaskRelated,
                DueDate = createDto.DueDate,
                EstimatedTime = createDto.EstimatedTime,
                TimeSpent = createDto.TimeSpent,
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
                RepeatEndOccurrences = createDto.RepeatEndOccurrences,
                           Priority = createDto.Priority // Added here

            };
        }

        // Mapping from PatchTaskRequest to update an existing Task model
        public static void UpdateTaskFromPatch(this Models.Task task, PatchTaskRequest patchDto)
        {
            if (!string.IsNullOrEmpty(patchDto.Title))
                task.Title = patchDto.Title;
            if (patchDto.GoalId.HasValue)
                task.GoalId = patchDto.GoalId.Value;
            if (patchDto.KanbanStatusId.HasValue)
                task.KanbanStatusId = patchDto.KanbanStatusId.Value;
            if (patchDto.TypeId.HasValue)
                task.TypeId = patchDto.TypeId.Value;
            if (!string.IsNullOrEmpty(patchDto.EisenhowerStatus))
                task.EisenhowerStatus = patchDto.EisenhowerStatus;
            if (!string.IsNullOrEmpty(patchDto.TimeTaskRelated))
                task.TimeTaskRelated = patchDto.TimeTaskRelated;
            if (patchDto.DueDate.HasValue)
                task.DueDate = patchDto.DueDate;
            if (patchDto.EstimatedTime.HasValue)
                task.EstimatedTime = patchDto.EstimatedTime;
            if (patchDto.TimeSpent.HasValue)
                task.TimeSpent = patchDto.TimeSpent;
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
                task.RepeatEndDate = patchDto.RepeatEndDate;
            if (patchDto.RepeatEndOccurrences.HasValue)
                task.RepeatEndOccurrences = patchDto.RepeatEndOccurrences.Value;
 if (!string.IsNullOrWhiteSpace(patchDto.Priority)) // Added here
            {
                task.Priority = patchDto.Priority;
            }

            task.UpdatedAt = DateTime.UtcNow;
        }
        
    }
}