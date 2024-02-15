using NeoEducationSystem.Data;
using NeoEducationSystem.Data.Models;
using NeoEducationSystem.Web.DTOs.CodeSnippets;
using NeoEducationSystem.Web.DTOs.Paragraphs;

namespace NeoEducationSystem.Services.Data.CodeSnippets
{
	public class CodeSnippetService : ICodeSnippetService
	{
		private readonly NeoEducationDbContext _context;

		public CodeSnippetService(NeoEducationDbContext context) => _context = context;
		
		public async Task CreateCodeSnippetsAsync(CreateCodeSnippetsDTO createCodeSnippetsDTO)
		{
			await _context.CodeSnippets
				.AddRangeAsync(createCodeSnippetsDTO.CodeSnippets.Select(c => new CodeSnippet
				{
					ParagraphId = createCodeSnippetsDTO.ParagraphId,
					Language = c.Language,
					Code = c.Content
				}));

			await _context.SaveChangesAsync();
		}
	}
}
