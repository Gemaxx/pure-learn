using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repos
{
    public class LearnerRepository : ILearnerRepository
    {
        private readonly PureLearnDbContext _context;
        public LearnerRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult?> ValidateLearnerExistsAsync(long learnerId)
        {
            var exists = await _context.Learners.AnyAsync(l => l.Id == learnerId);
            if (!exists)
            {
                return new NotFoundObjectResult(new { Message = "Learner not found" });
            }

            return null; // Learner exists, no error
        }   
    }
}