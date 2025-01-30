using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly PureLearnDbContext _context;

        public CategoryRepository(PureLearnDbContext context)
        {
            _context = context;
        }

        public async Task<Category> CreateCategoryAsync(long learnerId, Category category)
        {
            category.LearnerId = learnerId;
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> DeleteCategoryAsync(long categoryId)
        {
            var category = await FindCategoryByIdAsync(categoryId);
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<List<Category>> GetCategoriesByLearnerIdAsync(long learnerId)
        {
            return await _context.Categories
                .Where(c => c.LearnerId == learnerId && c.DeletedAt == null)
                .ToListAsync();
        }

        public async Task<Category?> GetCategoryByLearnerAndCategoryIdAsync(long learnerId, long categoryId)
        {
            return await _context.Categories
                .FirstOrDefaultAsync(c => c.LearnerId == learnerId && c.Id == categoryId && c.DeletedAt == null);
        }

        public async Task<Category> RestoreCategoryAsync(long categoryId)
        {
            var category = await FindCategoryByIdAsync(categoryId);

            if (category.DeletedAt == null)
                throw new InvalidOperationException("Category is not deleted.");

            category.DeletedAt = null;
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> SoftDeleteCategoryAsync(long categoryId)
        {
            var category = await FindCategoryByIdAsync(categoryId);

            if (category.DeletedAt != null)
                throw new InvalidOperationException("Category is already soft-deleted.");

            category.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> UpdateCategoryAsync(long id, Category category)
        {
            var existingCategory = await FindCategoryByIdAsync(id);

            existingCategory.Title = category.Title;
            existingCategory.Description = category.Description;
            existingCategory.Color = category.Color;

            await _context.SaveChangesAsync();
            return existingCategory;
        }

        private async Task<Category> FindCategoryByIdAsync(long id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id) ?? throw new KeyNotFoundException("Category not found.");
            return category;
        }
    }
}
