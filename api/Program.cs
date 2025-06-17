using api.Interfaces;
using api.Repos;
using api.Mapper;
using api.Data;
using api.Models;
using api.Services;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
{
    // Add Controllers and configure JSON options
    builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

    // Swagger
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "PureLearn API", Version = "v1" });
    });

    // CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", policy =>
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader());
    });

    // DbContext
    builder.Services.AddDbContext<PureLearnDbContext>(options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("DefaultConnection"),
            sqlServerOptions => sqlServerOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorNumbersToAdd: null
            )
        )
    );

    // Identity
    builder.Services.AddIdentity<ApplicationUser, IdentityRole<long>>()
        .AddEntityFrameworkStores<PureLearnDbContext>()
        .AddDefaultTokenProviders();

    // JWT Authentication
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT:Key not found in configuration"))
            ),
            ValidateLifetime = true
        };
    });

    // AutoMapper
    builder.Services.AddAutoMapper(typeof(StudySessionMapper));

    // Dependency Injection: Register all repositories and services
    builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
    builder.Services.AddScoped<IGoalRepository, GoalRepository>();
    builder.Services.AddScoped<IKanbanStatusRepository, KanbanStatusRepository>();
    builder.Services.AddScoped<ILearnerRepository, LearnerRepository>();
    builder.Services.AddScoped<ILearningResourceRepository, LearningResourceRepository>();
    builder.Services.AddScoped<ILearningResourceTypeRepository, LearningResourceTypeRepository>();
    builder.Services.AddScoped<INoteRepository, NoteRepository>();
    builder.Services.AddScoped<ISubtaskRepository, SubtaskRepository>();
    builder.Services.AddScoped<ITaskRepository, TaskRepository>();
    builder.Services.AddScoped<ITaskTypeRepository, TaskTypeRepository>();
    builder.Services.AddScoped<IStudySessionRepository, StudySessionRepository>();
    builder.Services.AddScoped<IPomodoroCycleRepository, PomodoroCycleRepository>();
    builder.Services.AddScoped<ITokenService, TokenService>();
}

var app = builder.Build();

// Configure the HTTP request pipeline
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseRouting();

    app.UseCors("AllowSpecificOrigin");

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
}

app.Run();
