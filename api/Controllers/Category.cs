using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Category;
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

        public CategoriesController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/categories/GetCategoriesByLearnerId
        [HttpGet("GetCategoriesByLearnerId/{learnerId}")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategoriesByLearnerId(long learnerId)
        {
            var categories = (await _context.Categories.Where(c => c.LearnerId == learnerId).ToListAsync()).Select(s => s.ToCategoryDto());
            return Ok(categories);
        }
        
        // GET: api/categories/GetCategoryByLearnerIdAndCategoryId
        [HttpGet("GetCategoryByLearnerIdAndCategoryId/{learnerId}/{categoryId}")]
        public async Task<ActionResult<Category>> GetCategoryByLearnerIdAndCategoryId(long learnerId, long categoryId)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.LearnerId == learnerId && c.Id == categoryId);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category.ToCategoryDto());
        }
        
        // PUT: api/categories/5
        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateCategory([FromRoute] long id, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto){
            // Get the category
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }
            // Update the category
            category.Title = updateCategoryRequestDto.Title;
            category.Description = updateCategoryRequestDto.Description;
            category.Color = updateCategoryRequestDto.Color;

            _context.SaveChanges();
            return Ok(category.ToCategoryDto());
        }

        // POST: api/category
        [HttpPost]
        public IActionResult CreateCategory([FromBody] CreateCategoryRequestDto categoryDto){
            var category =  categoryDto.toCategoryFromCreateDto();
            _context.Categories.Add(category);
            _context.SaveChanges();
            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // DELETE: api/categories/5
        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] long id){
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }
            
            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }

        
        // Soft delete
        // DELETE: api/categories/5
        [HttpDelete]
        [Route("softDelete/{id}")]
        public IActionResult SoftDelete([FromRoute] long id){
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }
            
            category.DeletedAt = DateTime.Now;
            _context.SaveChanges();

            return NoContent();
        }
        
    }
}