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
            };
        }

        public static GoalDetailDto ToGoalDetailDto(this Goal goal) {
            return new GoalDetailDto {
                CategoryId = goal.CategoryId,
                Id = goal.Id,
                Title = goal.Title,
                Description = goal.Description,
                Motivation = goal.Motivation,
                Term = goal.Term,
                Status = goal.Status,
                CompletionDate = goal.CompletionDate,
                CreatedAt = goal.CreatedAt,
                UpdatedAt = goal.UpdatedAt,
            };
        }
        public static Goal ToGoalFromCreateDto(this CreateGoalRequestDto createGoalRequestDto) {
            return new Goal {
                CategoryId     = createGoalRequestDto.CategoryId,
                Title          = createGoalRequestDto.Title,
                Description    = createGoalRequestDto.Description,
                Motivation     = createGoalRequestDto.Motivation,
                Term           = createGoalRequestDto.Term,
                Status         = createGoalRequestDto.Status,
            };
        }

        public static void UpdateGoalFromPatchDto(this Goal goal, PatchGoalRequestDto patchGoalRequestDto) {
            if (patchGoalRequestDto.Title != null) {
            goal.Title = patchGoalRequestDto.Title;
            }
            if (patchGoalRequestDto.Description != null) {
            goal.Description = patchGoalRequestDto.Description;
            }
            if (patchGoalRequestDto.Motivation != null) {
            goal.Motivation = patchGoalRequestDto.Motivation;
            }
            if (patchGoalRequestDto.Term != null) {
            goal.Term = patchGoalRequestDto.Term;
            }
            if (patchGoalRequestDto.Status != null) {
            goal.Status = patchGoalRequestDto.Status;
            }
            if (patchGoalRequestDto.CompletionDate != null) {
            goal.CompletionDate = patchGoalRequestDto.CompletionDate;
            }
            if (patchGoalRequestDto.CategoryId != null) {
            goal.CategoryId = patchGoalRequestDto.CategoryId;
            }
        }
        }
    }