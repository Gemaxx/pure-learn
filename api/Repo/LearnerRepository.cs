using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Repos
{
    public class LearnerRepository : ILearnerRepository
    {
        private readonly PureLearnDbContext _context;

        public LearnerRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        // Check if a learner exists and handle soft deletions if applicable
        public async Task<bool> LearnerExistsAsync(long learnerId)
        {
            var exists = await _context.Learners
                .AnyAsync(l => l.Id == learnerId && l.DeletedAt == null); // Assuming DeletedAt is for soft deletion

            if (!exists)
            {
                throw new LearnerNotFoundException("Learner not found or has been deleted.");
            }

            return true; // Learner exists and is not deleted
        }

    }

    // Custom exception for when a learner is not found
    public class LearnerNotFoundException : Exception
    {
        public LearnerNotFoundException(string message) : base(message) { }
    }
}
