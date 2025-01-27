using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Models;

namespace api.Mapper
{
    public static class CategoryMappers
    {
        // Map Category to CategoryDto
        public static CategoryDto ToCategoryDto(this Category categoryModel)
        {
            return new CategoryDto
            {
                Id = categoryModel.Id,
                Title = categoryModel.Title,
                Description = categoryModel.Description,
                Color = categoryModel.Color
            };
        }

        // Map CreateCategoryDto to Category
        public static Category toCategoryFromCreateDto(this CreateCategoryRequestDto categoyDto){
            return new Category
            {
                LearnerId = categoyDto.LearnerId,
                Title = categoyDto.Title,
                Description = categoyDto.Description,
                Color = categoyDto.Color
            };

        }
        
    }

    
}