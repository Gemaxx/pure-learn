using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repos
{
    public class GoalRepository : IGoalRepository
    {
        private readonly PureLearnDbContext _context;
        
        public GoalRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        // check if goal exists (Done)
        public async Task<bool> GoalExistsAsync(long learnerId, long goalId)
        {
            return await _context.Goals
                .AnyAsync(g => g.LearnerId == learnerId && g.Id == goalId && g.IsDeleted == false);
        }

        // Get goals (Done)
        public async Task<List<Goal>> GetGoalsAsync(long learnerId, GoalQueryObject query)
        {
            var goals = _context.Goals.Where(g => g.LearnerId == learnerId && g.IsDeleted == query.IsDeleted).AsQueryable();
            
            // Filter goals by category
            if (query.CategoryId.HasValue)
            {
                goals = goals.Where(g => g.CategoryId == query.CategoryId);
            }

            // Filter goals by status
            if (!string.IsNullOrWhiteSpace(query.Status))
            {
                goals = goals.Where(g => g.Status == query.Status);
            }

            // Search goals by term
            if (!string.IsNullOrWhiteSpace(query.Term))
            {
                goals = goals.Where(g => g.Term.Contains(query.Term));
            }

            // Sort goals by title
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.IsSortAscending)
                {
                    goals = goals.OrderBy(g => g.Title);
                }
                else
                {
                    goals = goals.OrderByDescending(g => g.Title);
                }
            }

            return await goals.ToListAsync();


        }
       
       // Create goal (Done)
        public async Task<Goal> CreateGoalAsync(long learnerId, Goal goal)
        {
            goal.LearnerId = learnerId;
            await _context.Goals.AddAsync(goal);
            await _context.SaveChangesAsync();
            return goal;
        }

        // Delete goal (Done)
        public async Task<bool> DeleteGoalAsync(long learnerId, long goalId)
        {
            var goal = await _context.Goals
            .FirstOrDefaultAsync(g => g.LearnerId == learnerId && g.Id == goalId && g.IsDeleted == false);

            if (goal == null)
            {
            return false;
            }

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();

            return true;
        }
        
        // Get goal (Done)
        public async Task<Goal?> GetGoalAsync(long learnerId, long goalId)
        {
            return await _context.Goals
                .FirstOrDefaultAsync(g => g.LearnerId == learnerId && g.Id == goalId && g.IsDeleted == false);
        }

        // Restore goal (Done)
        public async Task<bool> RestoreGoalAsync(long learnerId, long goalId)
        {
            var goal = await _context.Goals
            .FirstOrDefaultAsync(g => g.LearnerId == learnerId && g.Id == goalId && g.IsDeleted == true);

            if (goal == null)
            {
            return false;
            }

            goal.IsDeleted = false;
            _context.Goals.Update(goal);
            await _context.SaveChangesAsync();

            return true;
        }

        // Soft delete goal (Done)
        public async Task<bool> SoftDeleteGoalAsync(long learnerId, long goalId)
        {
            var goal = await _context.Goals
            .FirstOrDefaultAsync(g => g.LearnerId == learnerId && g.Id == goalId);

            if (goal == null)
            {
            return false;
            }

            goal.IsDeleted = true;
            _context.Goals.Update(goal);
            await _context.SaveChangesAsync();

            return true;
        }

        // update goal (Done)
        public async Task<Goal?> UpdateGoalAsync(long learnerId, long goalId, Goal goal)
        {
            var existingGoal = await _context.Goals
            .FirstOrDefaultAsync(g => g.LearnerId == learnerId && g.Id == goalId && g.IsDeleted == false);

            if (existingGoal == null)
            {
            return null;
            }

            if (goal.CategoryId != null)
            {
            existingGoal.CategoryId = goal.CategoryId;
            }
            if (!string.IsNullOrWhiteSpace(goal.Title))
            {
            existingGoal.Title = goal.Title;
            }
            if (!string.IsNullOrWhiteSpace(goal.Description))
            {
            existingGoal.Description = goal.Description;
            }
            if (!string.IsNullOrWhiteSpace(goal.Motivation))
            {
            existingGoal.Motivation = goal.Motivation;
            }
            if (!string.IsNullOrWhiteSpace(goal.Status))
            {
            existingGoal.Status = goal.Status;
            }
            if (!string.IsNullOrWhiteSpace(goal.Term))
            {
            existingGoal.Term = goal.Term;
            }

            _context.Goals.Update(existingGoal);
            await _context.SaveChangesAsync();

            return existingGoal;
        }

        public async Task<Goal?> FindDeletedGoalAsync(long learnerId, long goalId)
        {
            return await _context.Goals
                .FirstOrDefaultAsync(g => g.LearnerId == learnerId && g.Id == goalId && g.IsDeleted == true);
        }
    }
}