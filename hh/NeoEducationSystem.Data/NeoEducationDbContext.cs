using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data;

public class NeoEducationDbContext : IdentityDbContext<ApplicationUser>
{
	public NeoEducationDbContext(DbContextOptions<NeoEducationDbContext> options) : base(options) { }

	public DbSet<Course> Courses { get; set; }
	public DbSet<Lesson> Lessons { get; set; }
	public DbSet<Paragraph> Paragraphs { get; set; }
}