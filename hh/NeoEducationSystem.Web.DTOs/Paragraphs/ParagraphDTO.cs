using NeoEducationSystem.Web.DTOs.CodeSnippets;

namespace NeoEducationSystem.Web.DTOs.Paragraphs
{
	public class ParagraphDTO
	{
		public int Id { get; set; }
		public string Content { get; set; } = null!;
		public IEnumerable<CodeSnippetDTO> CodeSnippets { get; set; } = new HashSet<CodeSnippetDTO>();
	}
}
