using CloudinaryDotNet;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NeoEducationSystem.Data;
using NeoEducationSystem.Data.Models;
using NeoEducationSystem.Data.Seeders;
using NeoEducationSystem.Services.Data.CodeSnippets;
using NeoEducationSystem.Services.Data.Courses;
using NeoEducationSystem.Services.Data.Images;
using NeoEducationSystem.Services.Data.Jwt;
using NeoEducationSystem.Services.Data.Lessons;
using NeoEducationSystem.Services.Data.Paragraphs;
using NeoEducationSystem.Services.Data.TestResults;
using NeoEducationSystem.Services.Data.Tests;
using NeoEducationSystem.Services.Data.Threads;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<NeoEducationDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<NeoEducationDbContext>()
    .AddDefaultTokenProviders();

// Add JWT authentication
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
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtConfig:JwtIssuer"],
        ValidAudience = builder.Configuration["JwtConfig:JwtIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtConfig:JwtKey"]))
    };
});

// Add services to the container.
builder.Services.AddTransient<IJwtTokenProvider, JwtTokenProvider>();
builder.Services.AddTransient<ICourseService, CourseService>();
builder.Services.AddTransient<ILessonService, LessonService>();
builder.Services.AddTransient<IThreadService, ThreadService>();
builder.Services.AddTransient<ITestService, TestService>();
builder.Services.AddTransient<IParagraphService, ParagraphService>();
builder.Services.AddTransient<ICodeSnippetService, CodeSnippetService>();
builder.Services.AddTransient<ITestResultService, TestResultService>();
builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var dbContext = serviceScope.ServiceProvider.GetRequiredService<NeoEducationDbContext>();
    await new NESeeder().SeedAsync(dbContext, serviceScope.ServiceProvider);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();