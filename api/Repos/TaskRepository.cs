using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Search;
using api.Dtos.Task;
using api.Helpers;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repos
{
    public class TaskRepository : ITaskRepository
    {
        private readonly PureLearnDbContext _context;

        public TaskRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        // Retrieve all tasks for a specific learner with optional filtering using TaskQueryObject.
        public async Task<List<Models.Task>> GetTasksAsync(long learnerId, TaskQueryObjects query)
        {
            var tasksQuery = _context.Tasks
                .Where(t => t.LearnerId == learnerId && !t.IsDeleted);

            if (!string.IsNullOrWhiteSpace(query.Title))
            {
                tasksQuery = tasksQuery.Where(t => t.Title.Contains(query.Title));
            }

            if (query.DueDate.HasValue)
            {
                tasksQuery = tasksQuery.Where(t => t.DueDate == query.DueDate);
            }

            if (!string.IsNullOrWhiteSpace(query.EisenhowerStatus))
            {
                tasksQuery = tasksQuery.Where(t => t.EisenhowerStatus == query.EisenhowerStatus);
            }

            return await tasksQuery.ToListAsync();
        }

        // Retrieve a single task for the specified learner and taskId.
        public async Task<Models.Task?> GetTaskAsync(long learnerId, long taskId)
        {
            return await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId 
                                          && t.LearnerId == learnerId 
                                          && !t.IsDeleted);
        }

        // Create a new task for the learner.
        public async Task<Models.Task> CreateTaskAsync(long learnerId, Models.Task task)
        {
            // Set learnerId and audit fields.
            task.LearnerId = learnerId;
            task.CreatedAt = DateTime.UtcNow;
            task.UpdatedAt = DateTime.UtcNow;

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }

        // Update an existing task.
        public async Task<Models.Task?> UpdateTaskAsync(long learnerId, long taskId, Models.Task task)
        {
            var existingTask = await GetTaskAsync(learnerId, taskId);
            if (existingTask == null)
                return null;

            // Update properties—using EF Core's CurrentValues.SetValues here.
            _context.Entry(existingTask).CurrentValues.SetValues(task);
            existingTask.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingTask;
        }

        // Permanently delete a task.
        public async Task<bool> DeleteTaskAsync(long learnerId, long taskId)
        {
            var task = await GetTaskAsync(learnerId, taskId);
            if (task == null)
                return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        // Soft delete: mark a task as deleted without actually removing it from the database.
        public async Task<bool> SoftDeleteTaskAsync(long learnerId, long taskId)
        {
            var task = await GetTaskAsync(learnerId, taskId);
            if (task == null)
                return false;

            task.IsDeleted = true;
            task.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        // Restore a soft-deleted task.
        public async Task<bool> RestoreTaskAsync(long learnerId, long taskId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == taskId 
                                          && t.LearnerId == learnerId 
                                          && t.IsDeleted);
            if (task == null)
                return false;

            task.IsDeleted = false;
            task.DeletedAt = null;
            task.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<List<SearchResultDto>> SearchTasksAsync(string term, long learnerId)
{
    return await _context.Tasks
        .Where(t => t.LearnerId == learnerId && t.Title.Contains(term) && !t.IsDeleted)
        .Select(t => new SearchResultDto
        {
            EntityType = "Task",
            Id = t.Id,
            Title = t.Title,
            Description = null
        })
        .ToListAsync();
}
public async Task<List<BriefTaskDto>> GetBriefTasksAsync(long learnerId)
{
    return await _context.Tasks
        .Where(t => t.LearnerId == learnerId && !t.IsDeleted)
        .Select(t => new BriefTaskDto
        {
            Id = t.Id,
            Title = t.Title,
            DueDate = t.DueDate.HasValue ? t.DueDate.Value.ToDateTime(TimeOnly.MinValue) : (DateTime?)null,
            Status = t.KanbanStatus.Name
        })
        .ToListAsync();
}


    }
}