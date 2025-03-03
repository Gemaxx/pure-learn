using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Search;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ITaskRepository
    {
        Task<List<Models.Task>> GetTasksAsync(long learnerId, TaskQueryObjects query);
        Task<Models.Task?> GetTaskAsync(long learnerId, long taskId);
        Task<Models.Task> CreateTaskAsync(long learnerId, Models.Task task);
        Task<Models.Task?> UpdateTaskAsync(long learnerId, long taskId, Models.Task task);
        Task<bool> DeleteTaskAsync(long learnerId, long taskId);
        Task<bool> SoftDeleteTaskAsync(long learnerId, long taskId);
        Task<bool> RestoreTaskAsync(long learnerId, long taskId);
        Task<List<SearchResultDto>> SearchTasksAsync(string term, long learnerId);

    }
}