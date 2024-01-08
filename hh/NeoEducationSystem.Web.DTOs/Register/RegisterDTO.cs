using System.ComponentModel.DataAnnotations;

namespace NeoEducationSystem.Web.DTOs.Register;

public class RegisterDTO
{
    [Required]
    public string Username { get; set; } = null!;

    [Required]
    public string Email { get; set; } = null!;

    [Required] 
    public string Password { get; set; } = null!;
}
