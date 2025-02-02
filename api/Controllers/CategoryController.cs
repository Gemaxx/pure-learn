using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Category;
using api.Helpers;
using api.Interfaces;
using api.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/learners/{learnerId}/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;
        private readonly ILearnerRepository _learnerRepo;

        public CategoriesController(ICategoryRepository categoryRepo, ILearnerRepository learnerRepo)
        {
            _categoryRepo = categoryRepo;
            _learnerRepo = learnerRepo;
        }

        // GET: api/learners/{learnerId}/categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories(long learnerId, [FromQuery] CategoryQueryObject queryObject)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

            var categories = await _categoryRepo.GetCategoriesAsync(learnerId, queryObject);
            return Ok(categories.Select(c => c.ToCategoryDto()));
        }

        // GET: api/learners/{learnerId}/categories/{categoryId:long}
        [HttpGet("{categoryId:long}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(long learnerId, long categoryId, [FromQuery] CategoryQueryObject query)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

            var category = await _categoryRepo.GetCategoryAsync(learnerId, categoryId, query);
            if (category == null)
            {
                return NotFound(new { Message = "Category not found." });
            }

            return Ok(category.ToCategoryDetailDto());
        }

        // PUT: api/learners/{learnerId}/categories/{categoryId:long}
        [HttpPut("{categoryId:long}")]
        public async Task<IActionResult> UpdateCategory(long learnerId, long categoryId, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto, [FromQuery] CategoryQueryObject query)
        {
            query.IsDeleted= true;
            var category = await _categoryRepo.GetCategoryAsync(learnerId, categoryId, query);

            if (category == null)
            {
                return NotFound(new { Message = "Category not found or does not belong to the learner." });
            }

            category.Title = updateCategoryRequestDto.Title;
            category.Description = updateCategoryRequestDto.Description;
            category.Color = updateCategoryRequestDto.Color;

            await _categoryRepo.UpdateCategoryAsync(learnerId, categoryId, category);
            return Ok(category.ToCategoryDto());
        }

        // POST: api/learners/{learnerId}/categories
        [HttpPost]
        public async Task<IActionResult> CreateCategory(long learnerId, [FromBody] CreateCategoryRequestDto categoryDto)
        {
            // Check if learner exists
            var learnerExists = await _learnerRepo.LearnerExistsAsync(learnerId);
            if (!learnerExists) return NotFound(new { Message = "Learner not found." });

            var category = categoryDto.ToCategoryFromCreateDto();
            await _categoryRepo.CreateCategoryAsync(learnerId, category);

            return CreatedAtAction(
                nameof(GetCategory),
                new { learnerId = category.LearnerId, categoryId = category.Id },
                category.ToCategoryDto()
            );
        }

        // DELETE: api/learners/{learnerId}/categories/{categoryId:long}
        [HttpDelete("{categoryId:long}")]
        public async Task<IActionResult> DeleteCategory(long learnerId, long categoryId, [FromQuery] CategoryQueryObject query)
        {
            var category = await _categoryRepo.GetCategoryAsync(learnerId, categoryId, query);

            if (category == null)
            {
                return NotFound(new { Message = "Category not found or does not belong to the learner." });
            }

            await _categoryRepo.DeleteCategoryAsync(learnerId, categoryId);
            return NoContent();
        }

        // Soft delete: api/learners/{learnerId}/categories/softDelete/{categoryId:long}
        [HttpDelete("softDelete/{categoryId:long}")]
        public async Task<IActionResult> SoftDeleteCategory(long learnerId, long categoryId, [FromQuery] CategoryQueryObject query)
        {
            var category = await _categoryRepo.GetCategoryAsync(learnerId, categoryId, query);

            if (category == null)
            {
                return NotFound(new { Message = "Category not found or does not belong to the learner." });
            }


            await _categoryRepo.SoftDeleteCategoryAsync(learnerId, categoryId);
            return NoContent();
        }

        // Restore: api/learners/{learnerId}/categories/restore/{categoryId:long}
        [HttpPut("restore/{categoryId:long}")]
        public async Task<IActionResult> RestoreCategory(long learnerId, long categoryId, [FromQuery] CategoryQueryObject query)
        {
            query.IsDeleted = true;
            var category = await _categoryRepo.GetCategoryAsync(learnerId, categoryId, query);

            if (category == null)
            {
                return NotFound(new { Message = "Category not found or does not belong to the learner." });
            }

            await _categoryRepo.RestoreCategoryAsync(learnerId, categoryId);
            return Ok(category.ToCategoryDto());
        }
    }
}
