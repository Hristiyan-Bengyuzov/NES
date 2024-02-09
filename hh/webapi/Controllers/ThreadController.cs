using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeoEducationSystem.Services.Data.Threads;
using NeoEducationSystem.Web.DTOs.Threads;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThreadController : ControllerBase
    {
        private readonly IThreadService _threadService;

        public ThreadController(IThreadService threadService)
        {
            _threadService = threadService;
        }

        [HttpPost("postThread")]
        public async Task<IActionResult> PostThread([FromForm] CreateThreadDTO threadDTO)
        {
            try
            {
                await _threadService.CreateThreadAsync(threadDTO);
                return Ok("Successfully created thread");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
