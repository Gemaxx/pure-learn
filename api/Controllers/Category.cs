using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
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

        // GET: api/categories/GetCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.Include(c => c.Learner)
                                            .Include(c => c.ParentCategory)
                                            .Include(c => c.Goals)
                                            .Include(c => c.LearningResources)
                                            .Include(c => c.Notes)
                                            .Include(c => c.Tasks)
                                            .ToListAsync();
        }

        // GET: api/categories/GetCategory
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(long id)
        {
            var category = await _context.Categories.Include(c => c.Learner)
                                                     .Include(c => c.ParentCategory)
                                                     .Include(c => c.Goals)
                                                     .Include(c => c.LearningResources)
                                                     .Include(c => c.Notes)
                                                     .Include(c => c.Tasks)
                                                     .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(long id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(long id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return category;
        }

        private bool CategoryExists(long id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}