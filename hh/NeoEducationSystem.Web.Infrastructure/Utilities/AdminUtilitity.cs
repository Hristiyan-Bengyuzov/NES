using NeoEducationSystem.Data;
using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Web.Infrastructure.Utilities
{
	public static class AdminUtilitity
	{
		public static bool IsAdmin(ApplicationUser user)
		{
			using (var context = new NeoEducationDbContext(options: new Microsoft.EntityFrameworkCore.DbContextOptions<NeoEducationDbContext>()))
			{
				return context.UserRoles.Any(ur => ur.UserId == user.Id);
			}
		}
	}
}
