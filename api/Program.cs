using System.Text.Json.Serialization;
using api.Data; // PureLearnDbContext
using api.Models; // ApplicationUser
using api.Interfaces; // ICategoryRepository
using api.Repository; // CategoryRepository
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
{
    // Controllers with JSON settings to avoid reference loops
    builder.Services.AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

    // Swagger (OpenAPI)
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
        {
            Title = "PureLearn API",
            Version = "v1"
        });
    });

    // CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin", policy =>
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader());
    });

    // Identity (for authentication/authorization)
    builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
        .AddEntityFrameworkStores<PureLearnDbContext>()
        .AddDefaultTokenProviders();

    // DbContext (Entity Framework + SQL Server)
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

    // ✅ Register custom repositories
    builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

    // Add other repositories similarly if needed
    // builder.Services.AddScoped<IOtherRepo, OtherRepo>();
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

    app.UseAuthentication(); // needed if you use Identity
    app.UseAuthorization();

    app.MapControllers();
}

app.Run();
