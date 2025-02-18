using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;
using Task = System.Threading.Tasks.Task;

namespace api.Interfaces
{
    public interface ILearningResourceRepository
    {        
        // Get all LearningResources for a specific learner with optional query parameters (e.g., Goal, status, term, etc.)
        Task<List<LearningResource>> GetLearningResourcesAsync(long learnerId, LearningResourceQueryObject query);

        // Get a specific LearningResource by learner ID and LearningResource ID
        Task<LearningResource?> GetLearningResourceAsync(long learnerId, long LearningResourceId);

        // Create a new LearningResource for a specific learner
        Task<LearningResource> CreateLearningResourceAsync(long learnerId, LearningResource LearningResource);

        // Update an existing LearningResource
        Task<LearningResource?> UpdateLearningResourceAsync(long learnerId, long LearningResourceId, LearningResource LearningResource);

        // Delete a LearningResource permanently
        Task<bool> DeleteLearningResourceAsync(long learnerId, long LearningResourceId);

        // Soft delete a LearningResource (mark as deleted)
        Task<bool> SoftDeleteLearningResourceAsync(long learnerId, long LearningResourceId);

        // Restore a soft-deleted LearningResource
        Task<bool> RestoreLearningResourceAsync(long learnerId, long LearningResourceId);
    }
}