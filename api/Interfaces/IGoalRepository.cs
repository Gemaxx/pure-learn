using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IGoalRepository
    {
        // Check if a goal exists
        Task<bool> GoalExistsAsync(long learnerId, long goalId);
        
        // Get all goals for a specific learner with optional query parameters (e.g., Category, status, term, etc.)
        Task<List<Goal>> GetGoalsAsync(long learnerId, GoalQueryObject query);

        // Get a specific goal by learner ID and goal ID
        Task<Goal?> GetGoalAsync(long learnerId, long goalId);

        // Create a new goal for a specific learner
        Task<Goal> CreateGoalAsync(long learnerId, Goal goal);

        // Update an existing goal
        Task<Goal?> UpdateGoalAsync(long learnerId, long goalId, Goal goal);

        // Delete a goal permanently
        Task<bool> DeleteGoalAsync(long learnerId, long goalId);

        // Soft delete a goal (mark as deleted)
        Task<bool> SoftDeleteGoalAsync(long learnerId, long goalId);

        // Restore a soft-deleted goal
        Task<bool> RestoreGoalAsync(long learnerId, long goalId);

        // find soft deleted goals
        Task<Goal?> FindDeletedGoalAsync(long learnerId, long goalId);

    }
}