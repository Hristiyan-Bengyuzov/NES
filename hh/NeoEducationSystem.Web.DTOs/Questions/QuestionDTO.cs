using NeoEducationSystem.Web.DTOs.Answers;

namespace NeoEducationSystem.Web.DTOs.Questions
{
	public class QuestionDTO
	{
        public int Id { get; set; }

		public string Content { get; set; } = null!;

		public IEnumerable<AnswerDTO> Answers { get; set; } = new HashSet<AnswerDTO>();
    }
}
