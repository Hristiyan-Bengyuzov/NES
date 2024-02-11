using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NeoEducationSystem.Data.Models;
using Thread = NeoEducationSystem.Data.Models.Thread;

namespace NeoEducationSystem.Data;

public class NeoEducationDbContext : IdentityDbContext<ApplicationUser>
{
	public NeoEducationDbContext(DbContextOptions<NeoEducationDbContext> options) : base(options) { }

	public DbSet<Course> Courses { get; set; }
	public DbSet<Lesson> Lessons { get; set; }
	public DbSet<Paragraph> Paragraphs { get; set; }
	public DbSet<CodeSnippet> CodeSnippets { get; set; }
	public DbSet<Thread> Threads { get; set; }
	public DbSet<Test> Tests { get; set; }
	public DbSet<Question> Questions { get; set; }
	public DbSet<Answer> Answers { get; set; }
	public DbSet<TestResult> TestResults { get; set; }

	protected override void OnModelCreating(ModelBuilder builder)
	{
		builder.Entity<TestResult>().HasKey(tr => new { tr.UserId, tr.TestId });
		base.OnModelCreating(builder);
	}
}