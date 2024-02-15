using Microsoft.EntityFrameworkCore;
using NeoEducationSystem.Data;
using NeoEducationSystem.Web.DTOs.Answers;
using NeoEducationSystem.Web.DTOs.Questions;
using NeoEducationSystem.Web.DTOs.Tests;

namespace NeoEducationSystem.Services.Data.Tests
{
	public class TestService : ITestService
	{
		private readonly NeoEducationDbContext _context;

		public TestService(NeoEducationDbContext context) => _context = context;

		public async Task<TestInfoDTO> GetTestInfoAsync(int testId)
		{
			var testInfoDTO = await _context.Tests
				.Where(t => t.Id == testId)
				.Include(t => t.Questions)
				.ThenInclude(t => t.Answers)
				.Select(t => new TestInfoDTO
				{
					Id = t.Id,
					Title = t.Title,
					Questions = t.Questions.Select(q => new QuestionDTO
					{
						Id = q.Id,
						Content = q.Content,
						Answers = q.Answers.Select(a => new AnswerDTO
						{
							Id = a.Id,
							Content = a.Content,
							IsCorrect = a.IsCorrect,
						})
					})
				})
				.FirstAsync();

			return testInfoDTO;
		}
	}
}
