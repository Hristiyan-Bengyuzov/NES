using NeoEducationSystem.Data;
using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Services.Data.IUserRoles
{
	public class UserRoleService : IUserRoleService
	{
		private readonly NeoEducationDbContext _context;

		public UserRoleService(NeoEducationDbContext context) => _context = context;

		public bool IsAdmin(ApplicationUser user) => _context.UserRoles.Any(ur => ur.UserId == user.Id);
	}
}
