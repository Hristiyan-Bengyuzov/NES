using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace NeoEducationSystem.Data.Seeders
{
	public class RoleSeeder : ISeeder
	{
		public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
		{
			var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

			if (await roleManager.FindByNameAsync("admin") is null)
			{
				await roleManager.CreateAsync(new IdentityRole("admin"));
			}
		}
	}
}
