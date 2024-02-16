using NeoEducationSystem.Web.DTOs.TestResults;

namespace NeoEducationSystem.Services.Data.TestResults
{
	public interface ITestResultService
	{
		Task CreateTestResultAsync(CreateTestResultDTO createTestResultDTO);
	}
}
