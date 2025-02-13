using System;
using api.Dtos.LearningResourceType;
using api.Models;

namespace api.Mapper
{
    public static class LearningResourceTypeMapper
    {
        public static LearningResourceTypeDto ToLearningResourceTypeDto(this LearningResourceType learningResourceType)
        {
            return new LearningResourceTypeDto
            {
                Id = learningResourceType.Id,
                Name = learningResourceType.Name,
                UnitType = learningResourceType.UnitType
            };
        }

        public static LearningResourceTypeDetailDto ToLearningResourceTypeDetailDto(this LearningResourceType learningResourceType)
        {
            return new LearningResourceTypeDetailDto
            {
                Id = learningResourceType.Id,
                LearnerId = learningResourceType.LearnerId,
                Name = learningResourceType.Name,
                UnitType = learningResourceType.UnitType
            };
        }

        public static LearningResourceType ToLearningResourceType(this CreateLearningResourceTypeRequestDto request)
        {
            return new LearningResourceType
            {
                LearnerId = request.LearnerId,
                Name = request.Name,
                UnitType = request.UnitType
            };
        }

        public static void UpdateLearningResourceType(this LearningResourceType learningResourceType, PatchLearningResourceTypeRequestDto request)
        {
            if (request.LearnerId.HasValue)
            {
                learningResourceType.LearnerId = request.LearnerId.Value;
            }

            if (!string.IsNullOrEmpty(request.Name))
            {
                learningResourceType.Name = request.Name;
            }

            if (!string.IsNullOrEmpty(request.UnitType))
            {
                learningResourceType.UnitType = request.UnitType;
            }
        }
    }
}
