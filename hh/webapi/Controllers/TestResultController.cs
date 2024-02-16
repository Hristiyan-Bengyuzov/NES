using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeoEducationSystem.Services.Data.TestResults;
using NeoEducationSystem.Web.DTOs.TestResults;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TestResultController : ControllerBase
	{
		private readonly ITestResultService _testResultService;

		public TestResultController(ITestResultService testResultService) => _testResultService = testResultService;

		[HttpPost("createTestResult")]
		public async Task<IActionResult> CreateTestResult(CreateTestResultDTO createTestResultDTO)
		{
			try
			{
				await _testResultService.CreateTestResultAsync(createTestResultDTO);
				return Ok("Successfuly created test result.");
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
	}
}
