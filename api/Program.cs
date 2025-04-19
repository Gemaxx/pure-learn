using System.Text.Json.Serialization;
using api.Data;
using api.Interfaces;
using api.Repos;
using api.Repository;
using api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
ConfigureServices(builder.Services, builder.Configuration);

// Configure logging
builder.Logging.AddConsole();

var app = builder.Build();

// Configure the HTTP request pipeline
ConfigureMiddleware(app);

app.Run();

void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    // Add controllers with JSON serialization options
    services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

    // Add Swagger/OpenAPI
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    // Add CORS policy
    services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", policy =>
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader());
    });

    // Add DbContext with retry logic
    services.AddDbContext<PureLearnDbContext>(options =>
        options.UseSqlServer(
            configuration.GetConnectionString("DefaultConnection"),
            sqlServerOptions => sqlServerOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null
            )
        )
    );

    // Register repositories
    RegisterRepositories(services);

    // Register services
    services.AddSingleton<JwtService>();

    // Configure authentication
    ConfigureAuthentication(services, configuration);

    // Add authorization
    services.AddAuthorization();
}

void RegisterRepositories(IServiceCollection services)
{
    services.AddScoped<ICategoryRepository, CategoryRepository>();
    services.AddScoped<ILearnerRepository, LearnerRepository>();
    services.AddScoped<IGoalRepository, GoalRepository>();
    services.AddScoped<ILearningResourceRepository, LearningResourceRepository>();
    services.AddScoped<ILearningResourceTypeRepository, LearningResourceTypeRepository>();
    services.AddScoped<INoteRepository, NoteRepository>();
    services.AddScoped<ITaskRepository, TaskRepository>();
    services.AddScoped<ISubtaskRepository, SubtaskRepository>();
    services.AddScoped<ITaskTypeRepository, TaskTypeRepository>();
    services.AddScoped<IKanbanStatusRepository, KanbanStatusRepository>();
    services.AddScoped<IAuthRepository, AuthRepository>();
}

void ConfigureAuthentication(IServiceCollection services, IConfiguration configuration)
{
    var key = configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured.");
    var keyBytes = Encoding.UTF8.GetBytes(key);

    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidAudience = configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
            };
        });
}

void ConfigureMiddleware(WebApplication app)
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors("AllowSpecificOrigin");

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
}