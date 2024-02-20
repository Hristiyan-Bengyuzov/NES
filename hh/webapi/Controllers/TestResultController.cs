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

        [HttpPost("hasDoneTest")]
        public async Task<ActionResult<bool>> HasDoneTest(DoneTestDTO doneTestDTO)
        {
            try
            {
                var hasDoneTest = await _testResultService.UserHasDoneTestAsync(doneTestDTO);
                return Ok(hasDoneTest);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpGet("getStatistics")]
        public async Task<ActionResult<IEnumerable<TestStatisticsDTO>>> GetStatistics()
        {
            try
            {
                var statistics = await _testResultService.GetTestStatistics();
                return Ok(statistics);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
