using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using System.Runtime.CompilerServices;

namespace api.Repos
{
    public class LearningResourceRepository : ILearningResourceRepository
    {
        private readonly PureLearnDbContext _context;

        public LearningResourceRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        public async Task<LearningResource> CreateLearningResourceAsync(long learnerId, LearningResource LearningResource)
        {
            LearningResource.LearnerId = learnerId;
            await _context.LearningResources.AddAsync(LearningResource);
            await _context.SaveChangesAsync();
            return LearningResource;
        }

        public async Task<bool> DeleteLearningResourceAsync(long learnerId, long LearningResourceId)
        {
            var learningResource = await _context.LearningResources
            .FirstOrDefaultAsync(lr => lr.LearnerId == learnerId && lr.Id == learnerId && lr.IsDeleted == false);

            if (learningResource == null) {return false;}
            
            _context.LearningResources.Remove(learningResource);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<LearningResource?> FindDeletedLearningResourceAsync(long learnerId, long LearningResourceId)
        {
            return await _context.LearningResources
                        .FirstOrDefaultAsync(lr => lr.LearnerId == learnerId && lr.Id == learnerId);
        }

        public async Task<LearningResource?> GetLearningResourceAsync(long learnerId, long LearningResourceId)
        {
            return await _context.LearningResources
                        .FirstOrDefaultAsync(lr => lr.LearnerId == learnerId && lr.Id == learnerId && lr.IsDeleted == false);
        }

        public async Task<List<LearningResource>> GetLearningResourcesAsync(long learnerId, LearningResourceQueryObject query)
        {
            // Get list of Learning Resources
            var learningResources = _context.LearningResources.Where(lr => lr.LearnerId == learnerId && lr.IsDeleted == query.IsDeleted).AsQueryable();

            // Filter Learning Resources by goal
            if (query.GoalId.HasValue){
                learningResources = learningResources.Where(lr => lr.GoalId == query.GoalId);
            }

            return await learningResources.ToListAsync();

        }


        public async Task<bool> RestoreLearningResourceAsync(long learnerId, long LearningResourceId)
        {
            var learningResource = await _context.LearningResources
            .FirstOrDefaultAsync(lr=> lr.LearnerId == learnerId && lr.Id == LearningResourceId && lr.IsDeleted == true);

            if (learningResource == null) {return false;}

            learningResource.IsDeleted = false;

            _context.LearningResources.Update(learningResource);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> SoftDeleteLearningResourceAsync(long learnerId, long LearningResourceId)
        {
            var learningResource = await _context.LearningResources
            .FirstOrDefaultAsync(lr => lr.LearnerId == learnerId && lr.Id == LearningResourceId && lr.IsDeleted == false);

            if(learningResource == null) {return false;}
            
            learningResource.IsDeleted = true;

            _context.LearningResources.Update(learningResource);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<LearningResource?> UpdateLearningResourceAsync(long learnerId, long LearningResourceId, LearningResource learningResource)
        {
            var existingLearningResource = await _context.LearningResources
            .FirstOrDefaultAsync(lr => lr.LearnerId == learnerId && lr.Id == LearningResourceId && lr.IsDeleted == false);

            if (existingLearningResource == null)
            {
                return null;
            }

            if (learningResource.GoalId != null)
            {
                existingLearningResource.GoalId = learningResource.GoalId;
            }

            if (!string.IsNullOrWhiteSpace(learningResource.Title))
            {
                existingLearningResource.Title = learningResource.Title;

            }

            if (learningResource.TypeId != null)
            {
                existingLearningResource.TypeId = learningResource.TypeId;
            }

            if (learningResource.TotalUnits != null)
            {
                existingLearningResource.TotalUnits = learningResource.TotalUnits;
            }

            if (learningResource.Progress != null)
            {
                existingLearningResource.Progress = learningResource.Progress;
            }

            if(!string.IsNullOrWhiteSpace(learningResource.Link))
            {
                existingLearningResource.Link = learningResource.Link;
            }

            _context.LearningResources.Update(learningResource);
            await _context.SaveChangesAsync();
            return learningResource;
        }
    }
}