namespace NeoEducationSystem.Web.DTOs.Paragraphs
{
	public class CreateParagraphsDTO
	{
		public int LessonId { get; set; }

		public IEnumerable<string> Paragraphs { get; set; } = new List<string>();
	}
}
