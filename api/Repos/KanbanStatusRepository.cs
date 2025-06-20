using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repos
{
    public class KanbanStatusRepository : IKanbanStatusRepository
    {
        private readonly PureLearnDbContext _context;

        public KanbanStatusRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        public async Task<List<KanbanStatus>> GetKanbanStatusesAsync(long goalId)
        {
            return await _context.KanbanStatuses
                .Where(s => s.GoalId == goalId && !s.IsDeleted)
                .ToListAsync();
        }

        public async Task<KanbanStatus?> GetKanbanStatusAsync(long goalId, long statusId)
        {
            return await _context.KanbanStatuses
                .FirstOrDefaultAsync(s => s.GoalId == goalId && s.Id == statusId && !s.IsDeleted);
        }

        public async Task<KanbanStatus> CreateKanbanStatusAsync(long goalId, KanbanStatus status)
        {
            status.GoalId = goalId;
            _context.KanbanStatuses.Add(status);
            await _context.SaveChangesAsync();
            return status;
        }

        public async Task<KanbanStatus?> UpdateKanbanStatusAsync(long goalId, long statusId, KanbanStatus status)
        {
            var existingStatus = await GetKanbanStatusAsync(goalId, statusId);
            if (existingStatus == null)
                return null;

            _context.Entry(existingStatus).CurrentValues.SetValues(status);
            await _context.SaveChangesAsync();
            return existingStatus;
        }

        public async Task<bool> DeleteKanbanStatusAsync(long goalId, long statusId)
        {
            var status = await GetKanbanStatusAsync(goalId, statusId);
            if (status == null)
                return false;

            _context.KanbanStatuses.Remove(status);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteKanbanStatusAsync(long goalId, long statusId)
        {
            var status = await GetKanbanStatusAsync(goalId, statusId);
            if (status == null)
            return false;

            status.IsDeleted = true;
            _context.KanbanStatuses.Update(status);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreKanbanStatusAsync(long goalId, long statusId)
        {
            var status = await GetKanbanStatusAsync(goalId, statusId);
            if (status == null)
            return false;

            status.IsDeleted = false;
            _context.KanbanStatuses.Update(status);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}