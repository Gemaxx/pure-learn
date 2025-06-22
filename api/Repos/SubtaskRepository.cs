using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repos
{
    public class SubtaskRepository : ISubtaskRepository
    {
        private readonly PureLearnDbContext _context;

        public SubtaskRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        public async Task<List<Subtask>> GetSubtasksAsync(long taskId, SubtaskQueryObject query)
        {
            IQueryable<Subtask> subtasks = _context.Subtasks
                .Where(s => s.TaskId == taskId && s.DeletedAt == null);

            if (!string.IsNullOrWhiteSpace(query.Title))
            {
                subtasks = subtasks.Where(s => s.Title.Contains(query.Title));
            }

            return await subtasks.ToListAsync();
        }

        public async Task<Subtask?> GetSubtaskAsync(long taskId, long subtaskId)
        {
            return await _context.Subtasks
                .FirstOrDefaultAsync(s => s.TaskId == taskId && s.Id == subtaskId && s.DeletedAt == null);
        }

        public async Task<Subtask> CreateSubtaskAsync(long taskId, Subtask subtask)
        {
            subtask.TaskId = taskId;
            subtask.CreatedAt = System.DateTime.UtcNow;
            subtask.UpdatedAt = System.DateTime.UtcNow;
            subtask.IsDeleted = false;

            _context.Subtasks.Add(subtask);
            _context.Entry(subtask).Property(e => e.IsDeleted).IsModified = true;
            await _context.SaveChangesAsync();
            return subtask;
        }

        public async Task<Subtask?> UpdateSubtaskAsync(long taskId, long subtaskId, Subtask subtask)
        {
            var existingSubtask = await GetSubtaskAsync(taskId, subtaskId);
            if (existingSubtask == null)
                return null;

            _context.Entry(existingSubtask).CurrentValues.SetValues(subtask);
            existingSubtask.UpdatedAt = System.DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return existingSubtask;
        }

        public async Task<bool> DeleteSubtaskAsync(long taskId, long subtaskId)
        {
            var subtask = await GetSubtaskAsync(taskId, subtaskId);
            if (subtask == null)
                return false;

            _context.Subtasks.Remove(subtask);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteSubtaskAsync(long taskId, long subtaskId)
        {
            var subtask = await GetSubtaskAsync(taskId, subtaskId);
            if (subtask == null)
                return false;

            subtask.DeletedAt = System.DateTime.UtcNow;
            subtask.UpdatedAt = System.DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreSubtaskAsync(long taskId, long subtaskId)
        {
            var subtask = await _context.Subtasks
                .FirstOrDefaultAsync(s => s.TaskId == taskId && s.Id == subtaskId && s.DeletedAt != null);
            if (subtask == null)
                return false;

            subtask.DeletedAt = null;
            subtask.UpdatedAt = System.DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}