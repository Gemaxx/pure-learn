using api.Dtos.Auth;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly PureLearnDbContext _context;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ITokenService tokenService,
        PureLearnDbContext context)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _context = context;
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        // FIRST: cheap uniqueness checks (no DB write yet)
        if (await _userManager.FindByEmailAsync(registerDto.Email) is not null)
            return Conflict(new { error = "Email is already registered." });

        await using var tx = await _context.Database.BeginTransactionAsync();

        // 1) Create the identity user
        var user = new ApplicationUser { UserName = registerDto.Username, Email = registerDto.Email };
        IdentityResult userResult = await _userManager.CreateAsync(user, registerDto.Password);
        if (!userResult.Succeeded)
            return BadRequest(userResult.Errors);

        // 2) Idempotency guard – maybe a retry?
        var learner = await _context.Learners
            .FirstOrDefaultAsync(l => l.IdentityId == user.Id.ToString());

        if (learner is null)
        {
            learner = new Learner
            {
                IdentityId = user.Id.ToString(),
                Name       = registerDto.Username,
                CreatedAt  = DateTime.UtcNow
            };
            _context.Learners.Add(learner);
            await _context.SaveChangesAsync();          // still inside tx
        }

        await tx.CommitAsync();

        // 3) Build JWT that includes learner_id
        string access = _tokenService.CreateToken(user, learner.Id); // You may need to update CreateToken to accept learnerId
        // string refresh = await _tokenService.GenerateAndStoreRefreshTokenAsync(user); // If you use refresh tokens

        return CreatedAtAction(nameof(Register), new { }, new UserDto
        {
            Username = learner.Name,
            Email = user.Email ?? string.Empty,
            Token = access
            // Add LearnerId or other fields if needed
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user == null)
                return Unauthorized("Invalid username");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
                return Unauthorized("Invalid password");

            user.LastLoginAt = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            var learner = await _context.Learners.FirstOrDefaultAsync(l => l.IdentityId == user.Id.ToString());
            if (learner == null)
                return StatusCode(500, new { error = "Learner profile not found for this user." });

            string token = _tokenService.CreateToken(user, learner.Id);

            return new UserDto
            {
                Username = user.UserName ?? string.Empty,
                Email = user.Email ?? string.Empty,
                Token = token
            };
        }
        catch (Exception)
        {
            return StatusCode(500, new { error = "An unexpected error occurred during login. Please try again later." });
        }
    }
} 