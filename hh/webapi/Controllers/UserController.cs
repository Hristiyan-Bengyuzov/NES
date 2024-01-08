using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NeoEducationSystem.Data.Models;
using NeoEducationSystem.Services.Data.Jwt;
using NeoEducationSystem.Web.DTOs.Login;
using NeoEducationSystem.Web.DTOs.Register;


namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IJwtTokenProvider _jwtTokenProvider;

        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IJwtTokenProvider jwtTokenProvider)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenProvider = jwtTokenProvider;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Registration successful." });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is not null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = _jwtTokenProvider.GenerateJwtToken(user);

                return Ok(new { Token = token });
            }

            return Unauthorized(new { Message = "Invalid email or password." });
        }
    }
}
