using System;
using api.Dtos.LearningResource;
using api.Models;
using api.Dtos.LearningResourceType;

namespace api.Mapper
{
    public static class LearningResourceMapper
    {
        public static LearningResourceDto ToLearningResourceDto(this LearningResource learningResource)
        {
            return new LearningResourceDto
            {
                Id = learningResource.Id,
                GoalId = learningResource.GoalId,
                Title = learningResource.Title,
                Status = learningResource.Status,
                TypeId = learningResource.TypeId,
                TotalUnits = learningResource.TotalUnits,
                Progress = learningResource.Progress,
                ProgressPercentage = learningResource.ProgressPercentage
            };
        }

        public static LearningResourceDetailDto ToLearningResourceDetailDto(this LearningResource learningResource)
        {
            return new LearningResourceDetailDto
            {
                Id = learningResource.Id,
                GoalId = learningResource.GoalId,
                Title = learningResource.Title,
                Status = learningResource.Status,
                TypeId = learningResource.TypeId,
                TypeName = learningResource.Type.Name,
                TypeUnitType = learningResource.Type.UnitType,
                TotalUnits = learningResource.TotalUnits,
                Progress = learningResource.Progress,
                ProgressPercentage = learningResource.ProgressPercentage,
                Link = learningResource.Link,
                CreatedAt = learningResource.CreatedAt,
                UpdatedAt = learningResource.UpdatedAt,
                DeletedAt = learningResource.DeletedAt,
                IsDeleted = learningResource.IsDeleted,
            };
        }

        public static LearningResource FromCreateDtoToLearningResource(this CreateLearningResourceRequestDto dto)
        {
            return new LearningResource
            {
                GoalId = dto.GoalId,
                Title = dto.Title,
                Status = dto.Status,
                TypeId = dto.TypeId,
                TotalUnits = dto.TotalUnits ?? 1,
                Progress = dto.Progress ?? 0,
                Link = dto.Link ?? null,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };
        }

        public static void UpdateLearningResource(this LearningResource learningResource, PatchLearningResourceRequestDto dto)
        {
            if (dto.GoalId.HasValue)
                learningResource.GoalId = dto.GoalId.Value;

            if (!string.IsNullOrEmpty(dto.Title))
                learningResource.Title = dto.Title;

            if (!string.IsNullOrEmpty(dto.Status))
                learningResource.Status = dto.Status;

            if (dto.TypeId.HasValue)
                learningResource.TypeId = dto.TypeId.Value;

            if (dto.TotalUnits.HasValue)
                learningResource.TotalUnits = dto.TotalUnits.Value;

            if (dto.Progress.HasValue)
                learningResource.Progress = dto.Progress.Value;

            if (!string.IsNullOrEmpty(dto.Link))
                learningResource.Link = dto.Link;

            learningResource.UpdatedAt = DateTime.UtcNow;
        }
    }
}
