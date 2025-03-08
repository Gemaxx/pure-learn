using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos.Search;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ICategoryRepository
    {        
        // Get all categories for a specific learner
        Task<List<Category>> GetCategoriesAsync(long learnerId, CategoryQueryObject query);

        // Get a specific category by learner ID and category ID
        Task<Category?> GetCategoryAsync(long learnerId, long categoryId);

        // Create a new category for a specific learner
        Task<Category> CreateCategoryAsync(long learnerId, Category category);

        // Update an existing category
        Task<Category?> UpdateCategoryAsync(long learnerId, long categoryId, Category category);

        // Delete a category permanently
        Task<bool> DeleteCategoryAsync(long learnerId, long categoryId);

        // Soft delete a category (mark as deleted)
        Task<bool> SoftDeleteCategoryAsync(long learnerId, long categoryId);

        // Restore a soft-deleted category
        Task<bool> RestoreCategoryAsync(long learnerId, long categoryId);
        
        // global search for categories
        Task<List<SearchResultDto>> SearchCategoriesAsync(string term, long learnerId);

    }
}