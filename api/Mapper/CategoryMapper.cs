using System;
using api.Dtos.Category;
using api.Models;

namespace api.Mapper
{
    public static class CategoryMappers
    {
        // Mapping from Category model to CategoryDto
        public static CategoryDto ToCategoryDto(this Category categoryModel)
        {
            return new CategoryDto
            {
                Id = categoryModel.Id,
                Title = categoryModel.Title,
                Color = categoryModel.Color
            };
        }

        // Mapping from Category model to CategoryDetailDto
        public static CategoryDetailDto ToCategoryDetailDto(this Category categoryModel)
        {
            return new CategoryDetailDto
            {
                Id = categoryModel.Id,
                Title = categoryModel.Title,
                Color = categoryModel.Color,
                Description = categoryModel.Description ?? string.Empty,
                CreatedAt = categoryModel.CreatedAt,
                UpdatedAt = categoryModel.UpdatedAt,
                ParentCategoryId = categoryModel.ParentCategoryId,
                LearnerId = categoryModel.LearnerId,
                IsDeleted = categoryModel.IsDeleted    
            };
        }

        // Mapping from CreateCategoryRequestDto to Category model
        public static Category ToCategoryFromCreateDto(this CreateCategoryRequestDto categoryDto)
        {
            return new Category
            {
                Title = categoryDto.Title,
                Description = categoryDto.Description,
                Color = categoryDto.Color
            };
        }

        // Mapping from UpdateCategoryRequestDto to Category model (added this method)
        public static void UpdateCategoryFromUpdateDto(this Category category, PatchCategoryRequestDto updateCategoryRequestDto)
        {
            if (updateCategoryRequestDto.Title != null)
            {
            category.Title = updateCategoryRequestDto.Title;
            }

            if (updateCategoryRequestDto.Description != null)
            {
            category.Description = updateCategoryRequestDto.Description;
            }

            if (updateCategoryRequestDto.Color != null)
            {
            category.Color = updateCategoryRequestDto.Color;
            }
        }
    }

}
