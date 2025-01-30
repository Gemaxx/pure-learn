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

        public static Category ToCategoryFromCreateDto(this CreateCategoryRequestDto categoyDto){
            return new Category
            {
                Title = categoyDto.Title,
                Description = categoyDto.Description,
                Color = categoyDto.Color
            };

        }
        
    }

    
}