using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Dtos;
using api.Interfaces;
using api.Dtos.Learner; 
using api.Models;
using api.Repos;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    
    {
        private readonly IAuthRepository _authRepo;

        public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(LearnerRegistrationRequestDto  dto) 
        {
            var learner = await _authRepo.RegisterAsync(dto);
            return Ok(learner);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LearnerLoginRequestDto dto) 
        {
            var learner = await _authRepo.LoginAsync(dto);
            if (learner == null)
                return Unauthorized("البريد الإلكتروني أو كلمة السر غير صحيحة");

            return Ok(learner);
        }
    }
}