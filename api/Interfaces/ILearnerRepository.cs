using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface ILearnerRepository
    {
        Task<ActionResult?> ValidateLearnerExistsAsync(long learnerId);
    }
}