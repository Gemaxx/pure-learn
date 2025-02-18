using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface ILearnerRepository
    {
        Task<Learner?> GetLearnerAsync(long learnerId);
    }
}