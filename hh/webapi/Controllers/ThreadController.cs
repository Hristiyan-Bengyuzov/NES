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

		[HttpGet("getMainThreads")]
		public async Task<ActionResult<IEnumerable<MainThreadDTO>>> GetMainThreads()
		{
			try
			{
				var mainThreads = await _threadService.GetMainThreadsAsync();
				return Ok(mainThreads);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}

		[HttpGet("getThreadInfo/{threadId}")]
		public async Task<ActionResult<ThreadInfoDTO>> GetThreadInfo(int threadId)
		{
            try
            {
                var threadInfo = await _threadService.GetThreadInfoAsync(threadId);
                return Ok(threadInfo);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
	}
}
