using Microsoft.AspNetCore.Identity;

namespace NeoEducationSystem.Data.Models;

public class ApplicationUser : IdentityUser
{
    public ApplicationUser() => Id = Guid.NewGuid().ToString();

    public string? ProfilePicture { get; set; }
}