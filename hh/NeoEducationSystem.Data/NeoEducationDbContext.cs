using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NeoEducationSystem.Data.Models;
using NeoEducationSystem.Data.Seeders;

namespace NeoEducationSystem.Data;

public class NeoEducationDbContext : IdentityDbContext<ApplicationUser>
{
    public NeoEducationDbContext(DbContextOptions<NeoEducationDbContext> options) : base(options) { }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<Paragraph> Paragraphs { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Course>()
                .HasData(new Course[]
                {
                    new Course
                    {
                        Id = 1,
                        Title = "Основни знания"
                    },
                    new Course
                    {
                        Id = 2,
                        Title = "ООП"
                    },
                    new Course
                    {
                        Id = 3,
                        Title = "SQL"
                    }
                });
        base.OnModelCreating(builder);
    }
}