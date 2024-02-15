using NeoEducationSystem.Web.DTOs.Questions;

namespace NeoEducationSystem.Web.DTOs.Tests
{
	public class TestInfoDTO
	{
		public int Id { get; set; }

		public string Title { get; set; } = null!;

		public IEnumerable<QuestionDTO> Questions { get; set; } = new HashSet<QuestionDTO>();
    }
}
