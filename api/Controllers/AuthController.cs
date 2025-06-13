using System;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Learner;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly PureLearnDbContext _context;

        public AccountController(PureLearnDbContext context)
        {
            _context = context;
        }

        // POST: /api/account/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(LearnerDto learnerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var learner = new Learner
            {
                Name = learnerDto.Name,
                ProfilePicture = learnerDto.ProfilePicture,
                Bio = learnerDto.Bio,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            _context.Learners.Add(learner);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Registration successful" });
        }
    }
}