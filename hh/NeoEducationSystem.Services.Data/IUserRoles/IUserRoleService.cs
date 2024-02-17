using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Services.Data.IUserRoles
{
	public interface IUserRoleService 
	{
		bool IsAdmin(ApplicationUser user);
	}
}
