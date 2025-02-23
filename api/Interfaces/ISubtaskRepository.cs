using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ISubtaskRepository
    {
        // Get all subtasks for a given task, with optional filtering.
        Task<List<Subtask>> GetSubtasksAsync(long taskId, SubtaskQueryObject query);

        // Get a specific subtask by task ID and subtask ID.
        Task<Subtask?> GetSubtaskAsync(long taskId, long subtaskId);

        // Create a new subtask under a specific task.
        Task<Subtask> CreateSubtaskAsync(long taskId, Subtask subtask);

        // Update an existing subtask.
        Task<Subtask?> UpdateSubtaskAsync(long taskId, long subtaskId, Subtask subtask);

        // Permanently delete a subtask.
        Task<bool> DeleteSubtaskAsync(long taskId, long subtaskId);

        // Optional: Soft delete and restore methods.
        Task<bool> SoftDeleteSubtaskAsync(long taskId, long subtaskId);
        Task<bool> RestoreSubtaskAsync(long taskId, long subtaskId);
    }
}