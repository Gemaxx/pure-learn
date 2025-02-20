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
    public class LearningResourceTypeRepository : ILearningResourceTypeRepository
    {
        private readonly PureLearnDbContext _context;

        public LearningResourceTypeRepository(PureLearnDbContext context)
        {
            _context = context;
        }
        public async Task<LearningResourceType> CreateLearningResourceTypeAsync(long learnerId, LearningResourceType learningResourceType)
        {
            learningResourceType.LearnerId = learnerId;
            await _context.LearningResourceTypes.AddAsync(learningResourceType);
            await _context.SaveChangesAsync();
            return learningResourceType; 
        }

        public async Task<bool> DeleteLearningResourceTypeAsync(long learnerId, long learningResourceTypeId)
        {
            var learningResourceType = await _context.LearningResourceTypes
            .FirstOrDefaultAsync(lrt => lrt.LearnerId == learnerId && lrt.Id == learningResourceTypeId);
            if (learningResourceType == null) { return false;}

            _context.LearningResourceTypes.Remove(learningResourceType);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<LearningResourceType?> GetLearningResourceTypeAsync(long learnerId, long learningResourceTypeId)
        {
            return await _context.LearningResourceTypes
            .FirstOrDefaultAsync(lrt => lrt.LearnerId == learnerId && lrt.Id == learningResourceTypeId && lrt.IsDeleted == false);
        }

        public async Task<List<LearningResourceType>> GetLearningResourceTypesAsync(long learnerId, LearningResourceTypeQueryObject query)
        {
            var learningResourceTypes = _context.LearningResourceTypes
            .Where(lrt => lrt.LearnerId == learnerId && lrt.IsDeleted == query.IsDeleted)
            .AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                learningResourceTypes = learningResourceTypes.Where(lrt => lrt.Name.Contains(query.Name));
            }

            return await learningResourceTypes.ToListAsync();           
        }

        public async Task<bool> RestoreLearningResourceTypeAsync(long learnerId, long learningResourceTypeId)
        {
            var learningResourceType = await _context.LearningResourceTypes
            .FirstOrDefaultAsync(lrt=> lrt.LearnerId == learnerId && lrt.Id == learningResourceTypeId && lrt.IsDeleted == true);

            if (learningResourceType == null) {return false;}

            learningResourceType.IsDeleted = false;

            _context.LearningResourceTypes.Update(learningResourceType);
            await _context.SaveChangesAsync();

            return true; 
        }

        public async Task<bool> SoftDeleteLearningResourceTypeAsync(long learnerId, long learningResourceTypeId)
        {
            var learningResourceType = await _context.LearningResourceTypes
            .FirstOrDefaultAsync(lrt=> lrt.LearnerId == learnerId && lrt.Id == learningResourceTypeId && lrt.IsDeleted == false);

            if (learningResourceType == null) {return false;}

            learningResourceType.IsDeleted = true;

            _context.LearningResourceTypes.Update(learningResourceType);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<LearningResourceType?> UpdateLearningResourceTypeAsync(long learnerId, long learningResourceTypeId, LearningResourceType LearningResourceType)
        {
            var existingLearningResourceType = await _context.LearningResourceTypes
            .FirstOrDefaultAsync(lrt => lrt.LearnerId == learnerId && lrt.Id == learnerId && lrt.IsDeleted == false);
            
            if (existingLearningResourceType == null)
            {
                return null;
            }

            if (!string.IsNullOrWhiteSpace(existingLearningResourceType.Name))
            {
                existingLearningResourceType.Name = LearningResourceType.Name;
            }

            if (!string.IsNullOrWhiteSpace(existingLearningResourceType.UnitType))
            {
                existingLearningResourceType.UnitType = LearningResourceType.UnitType;
            }

            _context.LearningResourceTypes.Update(existingLearningResourceType);
            await _context.SaveChangesAsync();

            return existingLearningResourceType;

        }
    }
}