using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Interfaces;
using api.Models;
using api.Services;
using api.Data;
using Microsoft.EntityFrameworkCore;
using api.Dtos.Learner;

namespace api.Repos
{
    public class AuthRepository : IAuthRepository
    {
        private readonly PureLearnDbContext _context;
        private readonly JwtService _jwtService;

        public AuthRepository(PureLearnDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<LearnerAuthDto> RegisterAsync(LearnerRegistrationRequestDto  dto)  
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var learner = new Learner 
            {
                Name = dto.Name,  
                Email = dto.Email,
                PasswordHash = hashedPassword  
            };

            await _context.Learners.AddAsync(learner); 
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(learner);  

            return new LearnerAuthDto  
            {
                Id = learner.Id,
                Name = learner.Name,  
                Email = dto.Email,
                Token = token
            };
        }

        public async Task<LearnerAuthDto ?> LoginAsync(LearnerLoginRequestDto dto) 
        {
            var learner = await _context.Learners.FirstOrDefaultAsync(x => x.Email == dto.Email); 
            if (learner == null || !BCrypt.Net.BCrypt.Verify(dto.Password, learner.PasswordHash))  
                return null;

            var token = _jwtService.GenerateToken(learner); 

            return new LearnerAuthDto   
            {
                Id = learner.Id,
                Name = learner.Name,   
                Email = learner.Email,
                Token = token
            };
        }
    }
}