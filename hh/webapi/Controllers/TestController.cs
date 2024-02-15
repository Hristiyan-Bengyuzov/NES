using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeoEducationSystem.Services.Data.Tests;
using NeoEducationSystem.Web.DTOs.Tests;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TestController : ControllerBase
	{
		private readonly ITestService _testService;

		public TestController(ITestService testService) => _testService = testService;

        [HttpGet("getTestInfo/{testId}")]
        public async Task<ActionResult<TestInfoDTO>> GetTestInfo(int testId)
		{
			try
			{
				var testInfoDTO = await _testService.GetTestInfoAsync(testId);
				return Ok(testInfoDTO);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
    }
}
