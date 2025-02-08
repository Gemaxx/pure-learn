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

        // check if goal exists
        public async Task<bool> GoalExistsAsync(long learnerId, long goalId)
        {
            return await _context.Goals
                .AnyAsync(g => g.LearnerId == learnerId && g.Id == goalId && g.IsDeleted == false);
        }

        // Get goals (INPROGRESS)
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
       
       // Create goal (INPROGRESS)
        public async Task<Goal> CreateGoalAsync(long learnerId, Goal goal)
        {
            goal.LearnerId = learnerId;
            await _context.Goals.AddAsync(goal);
            await _context.SaveChangesAsync();
            return goal;
        }

        public Task<bool> DeleteGoalAsync(long learnerId, long goalId)
        {
            throw new NotImplementedException();
        }

        public Task<Goal?> FindGoalAsync(long learnerId, long goalId)
        {
            throw new NotImplementedException();
        }

        public Task<Goal?> GetGoalAsync(long learnerId, long goalId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreGoalAsync(long learnerId, long goalId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SoftDeleteGoalAsync(long learnerId, long goalId)
        {
            throw new NotImplementedException();
        }

        public Task<Goal?> UpdateGoalAsync(long learnerId, long goalId, Goal goal)
        {
            throw new NotImplementedException();
        }

        
    }
}