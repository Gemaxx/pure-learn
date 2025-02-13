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

        public async Task<Learner?> GetLearnerAsync(long learnerId)
        {
            return await _context.Learners.
            FirstOrDefaultAsync(l => l.Id == learnerId && l.IsDeleted == false);
        }
    }
}