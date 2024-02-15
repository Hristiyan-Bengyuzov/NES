using NeoEducationSystem.Web.DTOs.Tests;

namespace NeoEducationSystem.Services.Data.Tests
{
	public interface ITestService
	{
		Task<TestInfoDTO> GetTestInfoAsync(int testId);
	}
}
