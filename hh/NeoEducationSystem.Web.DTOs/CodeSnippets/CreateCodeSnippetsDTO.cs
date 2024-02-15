namespace NeoEducationSystem.Web.DTOs.CodeSnippets
{
	public class CreateCodeSnippetsDTO
	{
        public int ParagraphId { get; set; }
        public IEnumerable<CreateCodeSnippetDTO> CodeSnippets { get; set; } = new HashSet<CreateCodeSnippetDTO>();
    }
}
