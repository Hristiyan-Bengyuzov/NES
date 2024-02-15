using NeoEducationSystem.Web.DTOs.CodeSnippets;

namespace NeoEducationSystem.Services.Data.CodeSnippets
{
	public interface ICodeSnippetService
	{
		Task CreateCodeSnippetsAsync(CreateCodeSnippetsDTO createCodeSnippetsDTO);
	}
}
