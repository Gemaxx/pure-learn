using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ILearningResourceTypeRepository
    {        
        // Get all LearningResourceTypes for a specific learner with optional query parameters (e.g., Goal, status, term, etc.)
        Task<List<LearningResourceType>> GetLearningResourceTypesAsync(long learnerId, LearningResourceTypeQueryObject query);

        // Get a specific LearningResourceType by learner ID and LearningResourceType ID
        Task<LearningResourceType?> GetLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId);

        // Create a new LearningResourceType for a specific learner
        Task<LearningResourceType> CreateLearningResourceTypeAsync(long learnerId, LearningResourceType LearningResourceType);

        // Update an existing LearningResourceType
        Task<LearningResourceType?> UpdateLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId, LearningResourceType LearningResourceType);

        // Delete a LearningResourceType permanently
        Task<bool> DeleteLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId);

        // Soft delete a LearningResourceType (mark as deleted)
        Task<bool> SoftDeleteLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId);

        // Restore a soft-deleted LearningResourceType
        Task<bool> RestoreLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId);
    }
}