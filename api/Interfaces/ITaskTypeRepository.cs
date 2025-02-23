using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ITaskTypeRepository
    {
        // Get all TaskTypes for a learner.
        Task<List<TaskType>> GetTaskTypesAsync(long learnerId);

        // Get a single TaskType by its ID.
        Task<TaskType?> GetTaskTypeAsync(long learnerId, long taskTypeId);

        // Create a new TaskType for a learner.
        Task<TaskType> CreateTaskTypeAsync(long learnerId, TaskType taskType);

        // Update an existing TaskType.
        Task<TaskType?> UpdateTaskTypeAsync(long learnerId, long taskTypeId, TaskType taskType);

        // Delete a TaskType (permanently).
        Task<bool> DeleteTaskTypeAsync(long learnerId, long taskTypeId);

        // Optionally, soft delete and restore methods can be added.
    }
}