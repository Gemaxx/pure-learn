using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Interfaces;
using api.Models;

using Microsoft.AspNetCore.Mvc;
using api.Data;

namespace api.Repos
{
    public class LearnerRepository : ILearnerRepository
    {
        private readonly PureLearnDbContext _context;

        public LearnerRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        // Check if a learner exists
        public async Task<bool> LearnerExistsAsync(long learnerId)
        {
            return await _context.Learners
                .AnyAsync(l => l.Id == learnerId && l.IsDeleted == false);
        }
    }
}
