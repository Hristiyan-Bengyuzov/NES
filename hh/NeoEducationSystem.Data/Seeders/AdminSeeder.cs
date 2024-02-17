using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
	public class AdminSeeder : ISeeder
	{
		public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
		{
			var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

			var admin = new ApplicationUser
			{
				UserName = "nesadmin@abv.bg",
				Email = "nesadmin@abv.bg",
				EmailConfirmed = true,
			};

			var result = await userManager.CreateAsync(admin, "Parola!123");

			if (result.Succeeded)
			{
				await userManager.AddToRoleAsync(admin, "admin");
			}
		}
	}
}
