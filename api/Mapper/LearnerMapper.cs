using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Learner;
using api.Models;

namespace api.Mapper
{
    public static class LearnerMapper
    {
        public static LearnerDetailsDto ToLearnerDetailsDto(this Learner learner)
        {
            return new LearnerDetailsDto
            {
                Id = learner.Id,
                Name = learner.Name,
                Email = learner.Email,
                ProfilePicture = learner.ProfilePicture,
                Bio = learner.Bio
            };
            
        }
    }
}