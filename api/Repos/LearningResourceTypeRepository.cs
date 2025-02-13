using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;

namespace api.Repos
{
    public class LearningResourceTypeRepository : ILearningResourceTypeRepository
    {
        private readonly PureLearnDbContext _context;

        public LearningResourceTypeRepository(PureLearnDbContext context)
        {
            _context = context;
        }
        public Task<LearningResourceType> CreateLearningResourceTypeAsync(long learnerId, LearningResourceType LearningResourceType)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId)
        {
            throw new NotImplementedException();
        }

        public Task<LearningResourceType?> FindDeletedLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId)
        {
            throw new NotImplementedException();
        }

        public Task<LearningResourceType?> GetLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId)
        {
            throw new NotImplementedException();
        }

        public Task<List<LearningResourceType>> GetLearningResourceTypesAsync(long learnerId, LearningResourceTypeQueryObject query)
        {
            throw new NotImplementedException();
        }

        public Task<bool> LearningResourceTypeExistsAsync(long learnerId, long LearningResourceTypeId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SoftDeleteLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId)
        {
            throw new NotImplementedException();
        }

        public Task<LearningResourceType?> UpdateLearningResourceTypeAsync(long learnerId, long LearningResourceTypeId, LearningResourceType LearningResourceType)
        {
            throw new NotImplementedException();
        }
    }
}