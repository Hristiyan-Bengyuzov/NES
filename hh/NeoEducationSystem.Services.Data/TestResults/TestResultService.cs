using NeoEducationSystem.Data;
using NeoEducationSystem.Data.Models;
using NeoEducationSystem.Web.DTOs.TestResults;

namespace NeoEducationSystem.Services.Data.TestResults
{
	public class TestResultService : ITestResultService
	{
		private readonly NeoEducationDbContext _context;

		public TestResultService(NeoEducationDbContext context) => _context = context;
		
		public async Task CreateTestResultAsync(CreateTestResultDTO createTestResultDTO)
		{
			await _context.TestResults.AddAsync(new TestResult
			{
				TestId = createTestResultDTO.TestId,
				UserId = createTestResultDTO.UserId,
				Points = createTestResultDTO.Points,
			});

			await _context.SaveChangesAsync();	
		}
	}
}
