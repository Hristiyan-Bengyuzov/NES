using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
	public class TestSeeder : ISeeder
	{
		public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
		{
			if (context.Tests.Any()) return;

			await context.Tests.AddRangeAsync(new Test[]
			{
				new Test
				{
					Title = "Основни знания",
				}
			});

			await context.SaveChangesAsync();
		}
	}
}
