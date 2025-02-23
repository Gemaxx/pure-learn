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
        Task<List<KanbanStatus>> GetKanbanStatusesAsync(long learnerId);

        // Retrieve a specific Kanban status by learner and status ID.
        Task<KanbanStatus?> GetKanbanStatusAsync(long learnerId, long statusId);

        // Create a new Kanban status for a learner.
        Task<KanbanStatus> CreateKanbanStatusAsync(long learnerId, KanbanStatus status);

        // Update an existing Kanban status.
        Task<KanbanStatus?> UpdateKanbanStatusAsync(long learnerId, long statusId, KanbanStatus status);

        // Delete a Kanban status permanently.
        Task<bool> DeleteKanbanStatusAsync(long learnerId, long statusId);

        // Optional: Soft delete and restore methods if needed.   
    }
}