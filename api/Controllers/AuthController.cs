using System;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Learner;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using api.Interfaces;
using AutoMapper;
using BCrypt.Net;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly PureLearnDbContext _context;

        public AccountController(PureLearnDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // POST: /api/account/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LearnerRegistrationRequestDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var learner = new Learner
                {
                    Name = registerDto.Name,
                    Email = registerDto.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
                };

                await _context.Learners.AddAsync(learner);
                await _context.SaveChangesAsync();

                var learnerDto = _mapper.Map<LearnerDto>(learner);

                return Ok(learnerDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}