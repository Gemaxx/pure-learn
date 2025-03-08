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

        public async Task<List<KanbanStatus>> GetKanbanStatusesAsync(long learnerId)
        {
            return await _context.KanbanStatuses
                .Where(s => s.LearnerId == learnerId && !s.IsDeleted)
                .ToListAsync();
        }

        public async Task<KanbanStatus?> GetKanbanStatusAsync(long learnerId, long statusId)
        {
            return await _context.KanbanStatuses
                .FirstOrDefaultAsync(s => s.LearnerId == learnerId && s.Id == statusId && !s.IsDeleted);
        }

        public async Task<KanbanStatus> CreateKanbanStatusAsync(long learnerId, KanbanStatus status)
        {
            status.LearnerId = learnerId;
            _context.KanbanStatuses.Add(status);
            await _context.SaveChangesAsync();
            return status;
        }

        public async Task<KanbanStatus?> UpdateKanbanStatusAsync(long learnerId, long statusId, KanbanStatus status)
        {
            var existingStatus = await GetKanbanStatusAsync(learnerId, statusId);
            if (existingStatus == null)
                return null;

            _context.Entry(existingStatus).CurrentValues.SetValues(status);
            await _context.SaveChangesAsync();
            return existingStatus;
        }

        public async Task<bool> DeleteKanbanStatusAsync(long learnerId, long statusId)
        {
            var status = await GetKanbanStatusAsync(learnerId, statusId);
            if (status == null)
                return false;

            _context.KanbanStatuses.Remove(status);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteKanbanStatusAsync(long learnerId, long statusId)
        {
            var status = await GetKanbanStatusAsync(learnerId, statusId);
            if (status == null)
            return false;

            status.IsDeleted = true;
            _context.KanbanStatuses.Update(status);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RestoreKanbanStatusAsync(long learnerId, long statusId)
        {
            var status = await GetKanbanStatusAsync(learnerId, statusId);
            if (status == null)
            return false;

            status.IsDeleted = false;
            _context.KanbanStatuses.Update(status);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}