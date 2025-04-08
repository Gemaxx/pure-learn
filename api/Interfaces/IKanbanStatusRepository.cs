using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IKanbanStatusRepository
    {
        // Retrieve all Kanban statuses for a given learner.
        Task<List<KanbanStatus>> GetKanbanStatusesAsync(long goalId);

        // Retrieve a specific Kanban status by learner and status ID.
        Task<KanbanStatus?> GetKanbanStatusAsync(long goalId, long statusId);

        // Create a new Kanban status for a learner.
        Task<KanbanStatus> CreateKanbanStatusAsync(long goalId, KanbanStatus status);

        // Update an existing Kanban status.
        Task<KanbanStatus?> UpdateKanbanStatusAsync(long goalId, long statusId, KanbanStatus status);

        // Delete a Kanban status permanently.
        Task<bool> DeleteKanbanStatusAsync(long goalId, long statusId);

        // Optional: Soft delete and restore methods if needed.
         Task<bool> SoftDeleteKanbanStatusAsync(long goalId, long statusId);
         Task<bool> RestoreKanbanStatusAsync(long goalId, long statusId);
         
    }
}