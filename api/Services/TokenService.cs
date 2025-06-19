using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Interfaces;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public string CreateToken(ApplicationUser user, long learnerId)
    {
        try
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName ?? string.Empty),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim("learner_id", learnerId.ToString())
            };

            var jwtKey = _config["JWT:Key"] ?? throw new InvalidOperationException("JWT:Key not found in configuration");
            
            // Validate key length for HMAC-SHA512 (minimum 64 bytes)
            if (Encoding.UTF8.GetByteCount(jwtKey) < 64)
            {
                throw new InvalidOperationException("JWT key must be at least 64 characters long for HMAC-SHA512 algorithm");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        catch (Exception ex)
        {
            // Log the exception (you should add proper logging here)
            throw new InvalidOperationException($"Failed to create JWT token: {ex.Message}", ex);
        }
    }
} 