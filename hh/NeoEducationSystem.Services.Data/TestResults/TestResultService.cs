using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<TestStatisticsDTO>> GetTestStatistics()
        {
            var testStats = await _context.TestResults
                .Include(tr => tr.User)
                .GroupBy(tr => tr.UserId)
                .Select(group => new TestStatisticsDTO
                {
                    UserName = group.First().User.UserName!,
                    TotalPoints = group.Sum(g => g.Points),
                })
                .OrderByDescending(group => group.TotalPoints)
                .ToListAsync();

            return testStats;
        }

        public async Task<bool> UserHasDoneTestAsync(DoneTestDTO doneTestDTO) => await _context.TestResults.AnyAsync(tr => tr.UserId == doneTestDTO.UserId && tr.TestId == doneTestDTO.TestId);
    }
}
