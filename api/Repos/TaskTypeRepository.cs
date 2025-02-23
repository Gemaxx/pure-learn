using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Data;
using api.Helpers;
using Microsoft.EntityFrameworkCore;

namespace api.Repos
{
    public class TaskTypeRepository : ITaskTypeRepository
    {
        private readonly PureLearnDbContext _context;

        public TaskTypeRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        public async Task<List<Models.TaskType>> GetTaskTypesAsync(long learnerId)
        {
            return await _context.TaskTypes
                .Where(tt => tt.LearnerId == learnerId && !tt.IsDeleted)
                .ToListAsync();
        }

        public async Task<Models.TaskType?> GetTaskTypeAsync(long learnerId, long taskTypeId)
        {
            var taskType = await _context.TaskTypes
                .FirstOrDefaultAsync(tt => tt.LearnerId == learnerId && tt.Id == taskTypeId && !tt.IsDeleted);
            if (taskType == null)
            {
                throw new InvalidOperationException("TaskType not found.");
            }
            return taskType;
        }

        public async Task<Models.TaskType> CreateTaskTypeAsync(long learnerId, Models.TaskType taskType)
        {
            taskType.LearnerId = learnerId;
            _context.TaskTypes.Add(taskType);
            await _context.SaveChangesAsync();
            return taskType;
        }

        public async Task<Models.TaskType?> UpdateTaskTypeAsync(long learnerId, long taskTypeId, Models.TaskType taskType)
        {
            var existingTaskType = await GetTaskTypeAsync(learnerId, taskTypeId);
            if (existingTaskType == null)
                throw new InvalidOperationException("TaskType not found.");

            // Update properties
            _context.Entry(existingTaskType).CurrentValues.SetValues(taskType);
            await _context.SaveChangesAsync();
            return existingTaskType;
        }

        public async Task<bool> DeleteTaskTypeAsync(long learnerId, long taskTypeId)
        {
            var taskType = await GetTaskTypeAsync(learnerId, taskTypeId);
            if (taskType == null)
                return false;

            _context.TaskTypes.Remove(taskType);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteTaskTypeAsync(long learnerId, long taskTypeId)
        {
            var taskType = await GetTaskTypeAsync(learnerId, taskTypeId);
            if (taskType == null)
            return false;

            taskType.IsDeleted = true;
            _context.TaskTypes.Update(taskType);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreTaskTypeAsync(long learnerId, long taskTypeId)
        {
            var taskType = await _context.TaskTypes
            .FirstOrDefaultAsync(tt => tt.LearnerId == learnerId && tt.Id == taskTypeId && tt.IsDeleted);
            if (taskType == null)
            return false;

            taskType.IsDeleted = false;
            _context.TaskTypes.Update(taskType);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}