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

        // Retrieve all tasks for a specific learner with optional filtering and pagination using TaskQueryObjects.
        public async Task<List<Models.Task>> GetTasksAsync(long learnerId, TaskQueryObjects query)
        {
            var tasksQuery = _context.Tasks
                .Include(t => t.Type) // Include TaskType navigation property
                .Where(t => t.LearnerId == learnerId && !t.IsDeleted);

            if (!string.IsNullOrWhiteSpace(query.Title))
            {
            tasksQuery = tasksQuery.Where(t => t.Title.Contains(query.Title));
            }
            
            if (!string.IsNullOrWhiteSpace(query.EisenhowerStatus))
            {
            tasksQuery = tasksQuery.Where(t => t.EisenhowerStatus == query.EisenhowerStatus);
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
            tasksQuery = query.IsDescending
                ? tasksQuery.OrderByDescending(t => EF.Property<object>(t, query.SortBy))
                : tasksQuery.OrderBy(t => EF.Property<object>(t, query.SortBy));
            }

            return await tasksQuery
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();
        }

        // Retrieve a single task for the specified learner and taskId.
        public async Task<Models.Task?> GetTaskAsync(long learnerId, long taskId)
        {   
            
            return await _context.Tasks
                .Include(t => t.Type) // Include TaskType navigation property
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

            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            return task;
        }

        // Update an existing task.
        public async Task<Models.Task?> UpdateTaskAsync(long learnerId, long taskId, Models.Task task)
        {
            var existingTask = await _context.Tasks
            .FirstOrDefaultAsync(t => t.LearnerId == learnerId && t.Id == taskId && !t.IsDeleted);

            if (existingTask == null)
            {
            return null;
            }

            if (task.GoalId != null)
            {
            existingTask.GoalId = task.GoalId;
            }

            if (!string.IsNullOrWhiteSpace(task.Title))
            {
            existingTask.Title = task.Title;
            }

            if (task.KanbanStatusId != null)
            {
            existingTask.KanbanStatusId = task.KanbanStatusId;
            }

            if (task.TypeId != null)
            {
            existingTask.TypeId = task.TypeId;
            }
            /*
            if (task.DueDate.HasValue)
            {
            existingTask.DueDate = task.DueDate;
            }

            if (task.EstimatedTime.HasValue)
            {
            existingTask.EstimatedTime = task.EstimatedTime;
            }

            if (task.TimeSpent.HasValue)
            {
            existingTask.TimeSpent = task.TimeSpent;
            }

            if (!string.IsNullOrWhiteSpace(task.EisenhowerStatus))
            {
            existingTask.EisenhowerStatus = task.EisenhowerStatus;
            }

            if (!string.IsNullOrWhiteSpace(task.TimeTaskRelated))
            {
            existingTask.TimeTaskRelated = task.TimeTaskRelated;
            }

            if (!string.IsNullOrWhiteSpace(task.RepeatFrequency))
            {
            existingTask.RepeatFrequency = task.RepeatFrequency;
            }

            if (task.RepeatInterval.HasValue)
            {
            existingTask.RepeatInterval = task.RepeatInterval;
            }

            existingTask.RepeatOnSunday = task.RepeatOnSunday;
            existingTask.RepeatOnMonday = task.RepeatOnMonday;
            existingTask.RepeatOnTuesday = task.RepeatOnTuesday;
            existingTask.RepeatOnWednesday = task.RepeatOnWednesday;
            existingTask.RepeatOnThursday = task.RepeatOnThursday;
            existingTask.RepeatOnFriday = task.RepeatOnFriday;
            existingTask.RepeatOnSaturday = task.RepeatOnSaturday;

            if (!string.IsNullOrWhiteSpace(task.RepeatEnds))
            {
            existingTask.RepeatEnds = task.RepeatEnds;
            }

            if (task.RepeatEndDate.HasValue)
            {
            existingTask.RepeatEndDate = task.RepeatEndDate;
            }

            if (task.RepeatEndOccurrences.HasValue)
            {
            existingTask.RepeatEndOccurrences = task.RepeatEndOccurrences;
            }*/

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
    }
}