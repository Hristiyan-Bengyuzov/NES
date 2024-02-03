namespace NeoEducationSystem.Web.DTOs.CodeSnippets
{
	public class CodeSnippetDTO
	{
        public int Id { get; set; }
		public string Language { get; set; } = null!;
		public string Code { get; set; } = null!;
    }
}
