using NeoEducationSystem.Web.DTOs.Paragraphs;

namespace NeoEducationSystem.Web.DTOs.Lessons
{
	public class LessonInfoDTO
	{ 
        public string Title { get; set; } = null!;

		public IEnumerable<ParagraphDTO> Paragraphs { get; set; } = new HashSet<ParagraphDTO>();

        public string? VideoUrl { get; set; }
    }
}
