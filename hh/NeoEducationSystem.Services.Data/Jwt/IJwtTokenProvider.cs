using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Services.Data.Jwt;

public interface IJwtTokenProvider
{
    string GenerateJwtToken(ApplicationUser user);
}
