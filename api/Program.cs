using System.Text.Json.Serialization;
using api.Interfaces;
using api.Models;
using api.Repos;
using api.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adding DbContext
builder.Services.AddDbContext<PureLearnDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlServerOptions => sqlServerOptions.EnableRetryOnFailure(
            maxRetryCount: 5,              // Maximum number of retries
            maxRetryDelay: TimeSpan.FromSeconds(30), // Maximum delay between retries
            errorNumbersToAdd: null        // Optional: List of SQL error numbers to retry
        )
    )
);

// Configure JSON serialization options to ignore cycles when serializing objects
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Set the reference handler to ignore cycles, preventing stack overflows and other issues
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ILearnerRepository, LearnerRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();




// Gemax Db connection till we host a shared db or we do Container 
// "DefaultConnection": "Data Source=GEMAX\\SQLEXPRESS;Initial Catalog=PureLearnDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
