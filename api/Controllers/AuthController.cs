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
using api.Services;

namespace api.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly PureLearnDbContext _context;
        private readonly UserManager<Learner> _userManager;
        private readonly SignInManager<Learner> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(PureLearnDbContext context, IMapper mapper, UserManager<Learner> userManager, SignInManager<Learner> signInManager, ITokenService tokenService)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
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
                    UserName = registerDto.Email,
                    Email = registerDto.Email
                };

                var result = await _userManager.CreateAsync(learner, registerDto.Password);
                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                var learnerDto = _mapper.Map<LearnerDto>(learner);
                return Ok(learnerDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        // POST: /api/Auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
                return Unauthorized(new { message = "Invalid credentials" });

            var token = _tokenService.CreateToken(user);
            var learnerAuthDto = new LearnerAuthDto
            {
                Id = user.Id,
                Name = user.Name ?? string.Empty,
                Email = user.Email ?? string.Empty,
                Token = token
            };
            return Ok(learnerAuthDto);
        }
    }
}