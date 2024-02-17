using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NeoEducationSystem.Data.Models;
using NeoEducationSystem.Services.Data.IUserRoles;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NeoEducationSystem.Services.Data.Jwt;

public class JwtTokenProvider : IJwtTokenProvider
{
	private readonly IUserRoleService _userRoleService;
	private readonly IConfiguration _configuration;

	public JwtTokenProvider(IUserRoleService userRoleService, IConfiguration configuration)
	{
		_userRoleService = userRoleService;
		_configuration = configuration;
	}

	public string GenerateJwtToken(ApplicationUser user)
	{
		// add roles later on
		var claims = new List<Claim>
		{
			new Claim("userId", user.Id),
			new Claim("email", user.UserName),
			new Claim("isAdmin", _userRoleService.IsAdmin(user) ? "yes" : "no")
		};

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:JwtKey"]));
		var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
		var expires = DateTime.Now.AddDays(double.Parse(_configuration["JwtConfig:JwtExpireDays"]));

		var token = new JwtSecurityToken(
			_configuration["JwtConfig:JwtIssuer"],
			_configuration["JwtConfig:JwtIssuer"],
			claims,
			expires: expires,
			signingCredentials: creds
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}
