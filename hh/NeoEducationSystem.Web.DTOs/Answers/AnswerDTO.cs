namespace NeoEducationSystem.Web.DTOs.Answers
{
	public class AnswerDTO
	{
        public int Id { get; set; }

        public string Content { get; set; } = null!;

        public bool IsCorrect { get; set; }
    }
}
