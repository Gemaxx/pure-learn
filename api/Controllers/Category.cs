using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Category;
using api.Interfaces;
using api.Mapper;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly PureLearnDbContext _context;
        private readonly ICategoryRepository _categoryRepo;
        private readonly ILearnerRepository _learnerRepo;


        public CategoriesController(PureLearnDbContext context, ICategoryRepository categoryRepo, ILearnerRepository learnerRepo)
        {
            _categoryRepo = categoryRepo;
            _context = context;
            _learnerRepo = learnerRepo;
        }

        // GET: api/categories/GetCategoriesByLearnerId
        [HttpGet("GetCategoriesByLearnerId/{learnerId}")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategoriesByLearnerId(long learnerId)
        {
            // check if learner exists
            var validationResult = await _learnerRepo.ValidateLearnerExistsAsync(learnerId);
            if (validationResult != null) return validationResult;

            var categories = await _categoryRepo.GetCategoriesByLearnerIdAsync(learnerId);

            return Ok(categories.Select(s => s.ToCategoryDto()));
        }

        // GET: api/categories/GetCategoryByLearnerIdAndCategoryId
        [HttpGet("GetCategoryByLearnerIdAndCategoryId/{learnerId}/{categoryId}")]
        public async Task<ActionResult<CategoryDto>> GetCategoryByLearnerAndCategoryId (long learnerId, long categoryId)
        {
            
            // check if learner exists
            var validationResult = await _learnerRepo.ValidateLearnerExistsAsync(learnerId);
            if (validationResult != null) return validationResult;
            
            var category = await _context.Categories
                .Where(c => c.LearnerId == learnerId && c.Id == categoryId && c.DeletedAt == null)
                .FirstOrDefaultAsync();

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category.ToCategoryDto());
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult >UpdateCategory(long id, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            category.Title = updateCategoryRequestDto.Title;
            category.Description = updateCategoryRequestDto.Description;
            category.Color = updateCategoryRequestDto.Color;

            await  _context.SaveChangesAsync();
            return Ok(category.ToCategoryDto());
        }

      
        // POST: api/category
        [HttpPost("CreateCategoryByLearnerId/{learnerId}")]
        public async Task<IActionResult> CreateCategoryByLearnerId(long learnerId, [FromBody] CreateCategoryRequestDto categoryDto)
        {
            
            // check if learner exists
            var validationResult = await _learnerRepo.ValidateLearnerExistsAsync(learnerId);
            if (validationResult != null) return validationResult;

            var category = categoryDto.ToCategoryFromCreateDto();
            await _categoryRepo.CreateCategoryAsync(learnerId, category);

            // Return the created category with a reference to the learner's ID
            return CreatedAtAction(
            nameof(GetCategoriesByLearnerId), 
            new { learnerId = category.LearnerId }, 
            category.ToCategoryDto()
            );
        }


        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(long id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Soft delete
        // DELETE: api/categories/softDelete/5
        [HttpDelete("softDelete/{id}")]
        public async Task<IActionResult> SoftDeleteCategory(long id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            if (category.DeletedAt != null)
            {
                return BadRequest(new { Message = "Category is already soft-deleted." });
            }

            category.DeletedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Restore
        // PUT: api/categories/restore/5
        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreCategory(long id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            if (category.DeletedAt == null)
            {
                return BadRequest(new { Message = "Category is not deleted." });
            }

            category.DeletedAt = null;
            await _context.SaveChangesAsync();

            return Ok(category.ToCategoryDto());
        }
    }
}
