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
        public static Category ToCategoryFromUpdateDto(this UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            return new Category
            {
                Title = updateCategoryRequestDto.Title,
                Description = updateCategoryRequestDto.Description,
                Color = updateCategoryRequestDto.Color
            };
        }
    }

}
