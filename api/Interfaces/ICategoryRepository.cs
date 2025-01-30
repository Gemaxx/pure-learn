using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetCategoriesByLearnerIdAsync(long learnerId);
        Task<Category?> GetCategoryByLearnerAndCategoryIdAsync(long learnerId, long categoryId);
        Task<Category> UpdateCategoryAsync(long id, Category category);
        Task<Category> CreateCategoryAsync(long id, Category category);
        Task<Category> DeleteCategoryAsync(long categoryId);
        Task<Category> SoftDeleteCategoryAsync(long categoryId);
        Task<Category> RestoreCategoryAsync(long categoryId);


    }
}