using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
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

    // check if a category exists
    public async Task<bool> CategoryExistsAsync(long categoryId)
    {
        return await _context.Categories
            .AnyAsync(c => c.Id == categoryId && c.IsDeleted == false);
    }

    public async Task<Category> CreateCategoryAsync(long learnerId, Category category)
    {
        category.LearnerId = learnerId;
        await _context.Categories.AddAsync(category);
        await _context.SaveChangesAsync();
        return category;
    }

    public async Task<bool> DeleteCategoryAsync(long learnerId, long categoryId)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.LearnerId == learnerId && c.Id == categoryId);

        if (category == null)
        {
            return false;
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<Category>> GetCategoriesAsync(long learnerId, CategoryQueryObject query)
    {
        return await _context.Categories.Where(c => c.LearnerId == learnerId && c.IsDeleted == query.IsDeleted).ToListAsync();
    }

    public async Task<Category?> GetCategoryAsync(long learnerId, long categoryId, CategoryQueryObject query)
    {
        return await _context.Categories
            .FirstOrDefaultAsync(c => c.LearnerId == learnerId && c.Id == categoryId && c.IsDeleted == query.IsDeleted);
    }
    public async Task<bool> RestoreCategoryAsync(long learnerId, long categoryId)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.LearnerId == learnerId && c.Id == categoryId && c.IsDeleted);

        if (category == null)
        {
            return false;
        }

        category.IsDeleted = false;
        category.DeletedAt = null;
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<bool> SoftDeleteCategoryAsync(long learnerId, long categoryId)
    {
        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.LearnerId == learnerId && c.Id == categoryId && !c.IsDeleted);

        if (category == null)
        {
            return false;
        }

        category.IsDeleted = true;
        category.DeletedAt = DateTime.Now;
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<Category?> UpdateCategoryAsync(long learnerId, long categoryId, Category category)
    {
        var existingCategory = await _context.Categories
            .FirstOrDefaultAsync(c => c.LearnerId == learnerId && c.Id == categoryId && c.IsDeleted == false);

        if (existingCategory == null)
        {
            return null;
        }

        existingCategory.Title = category.Title;
        existingCategory.Description = category.Description;
        existingCategory.Color = category.Color;

        await _context.SaveChangesAsync();
        return existingCategory;
    }
    }

}