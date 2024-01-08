using System.ComponentModel.DataAnnotations;

namespace NeoEducationSystem.Web.DTOs.Login;

public class LoginDTO
{
    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}
