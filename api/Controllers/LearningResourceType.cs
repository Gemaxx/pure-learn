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
    public class LearningResourceTypesController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public LearningResourceTypesController(PureLearnDbContext context)
        {
            _context = context;
        }

        // GET: api/learningresourcetypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LearningResourceType>>> GetLearningResourceTypes()
        {
            return await _context.LearningResourceTypes
                                 .Include(lrt => lrt.LearningResources)
                                 .ToListAsync();
        }

        // GET: api/learningresourcetypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LearningResourceType>> GetLearningResourceType(long id)
        {
            var learningResourceType = await _context.LearningResourceTypes
                                                     .Include(lrt => lrt.LearningResources)
                                                     .FirstOrDefaultAsync(lrt => lrt.Id == id);

            if (learningResourceType == null)
            {
                return NotFound();
            }

            return learningResourceType;
        }

        // PUT: api/learningresourcetypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLearningResourceType(long id, LearningResourceType learningResourceType)
        {
            if (id != learningResourceType.Id)
            {
                return BadRequest();
            }

            _context.Entry(learningResourceType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LearningResourceTypeExists(id))
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

        // POST: api/learningresourcetypes
        [HttpPost]
        public async Task<ActionResult<LearningResourceType>> PostLearningResourceType(LearningResourceType learningResourceType)
        {
            _context.LearningResourceTypes.Add(learningResourceType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLearningResourceType", new { id = learningResourceType.Id }, learningResourceType);
        }

        // DELETE: api/learningresourcetypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LearningResourceType>> DeleteLearningResourceType(long id)
        {
            var learningResourceType = await _context.LearningResourceTypes.FindAsync(id);
            if (learningResourceType == null)
            {
                return NotFound();
            }

            _context.LearningResourceTypes.Remove(learningResourceType);
            await _context.SaveChangesAsync();

            return learningResourceType;
        }

        private bool LearningResourceTypeExists(long id)
        {
            return _context.LearningResourceTypes.Any(e => e.Id == id);
        }
    }
}