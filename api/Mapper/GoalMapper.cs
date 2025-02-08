using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Goal;
using api.Models;

namespace api.Mapper
{
    public static class GoalMapper
    {
        public static GoalDto ToGoalDto(this Goal goal) {
            return new GoalDto {
                CategoryId = goal.CategoryId,
                Id = goal.Id,
                Title = goal.Title,
                Term = goal.Term,
                Status = goal.Status,
                CompletionDate = goal.CompletionDate
            };
        }

        public static GoalDetailDto ToGoalDetailDto(this Goal goal) {
            return new GoalDetailDto {
                Id = goal.Id,
                Title = goal.Title,
                Description = goal.Description,
                Motivation = goal.Motivation,
                CreatedAt = goal.CreatedAt,
                UpdatedAt = goal.UpdatedAt,
                Term = goal.Term,
                Status = goal.Status,
                CompletionDate = goal.CompletionDate,
                CategoryId = goal.CategoryId,
                CategoryName = goal.Category?.Title,
            };
        }
        public static Goal ToGoalFromCreateDto(this CreateGoalRequestDto createGoalRequestDto) {
            return new Goal {
                CategoryId     = createGoalRequestDto.CategoryId ?? null,
                Title          = createGoalRequestDto.Title,
                Description    = createGoalRequestDto.Description,
                Motivation     = createGoalRequestDto.Motivation,
                Term           = createGoalRequestDto.Term,
                Status         = createGoalRequestDto.Status,
            };
        }

        public static Goal ToGoalFromUpdateDto(this UpdateGoalRequestDto updateGoalRequestDto) {
            return new Goal {
                Title = updateGoalRequestDto.Title,
                Description = updateGoalRequestDto.Description,
                Motivation = updateGoalRequestDto.Motivation,
                Term = updateGoalRequestDto.Term,
                Status = updateGoalRequestDto.Status,
                CompletionDate = updateGoalRequestDto.CompletionDate,
                CategoryId = updateGoalRequestDto.CategoryId,
            };
        }

        public static Goal ToGoalFromPatchDto(this PatchGoalRequestDto patchGoalRequestDto) {
            return new Goal {
                Title = patchGoalRequestDto.Title ?? string.Empty,
                Description = patchGoalRequestDto.Description ?? string.Empty,
                Motivation = patchGoalRequestDto.Motivation ?? string.Empty,
                Term = patchGoalRequestDto.Term ?? string.Empty,
                Status = patchGoalRequestDto.Status ?? string.Empty,
                CompletionDate = patchGoalRequestDto.CompletionDate,
                CategoryId = patchGoalRequestDto.CategoryId,
            };
        }
    }
}