using NeoEducationSystem.Data;
using NeoEducationSystem.Data.Models;
using NeoEducationSystem.Web.DTOs.Paragraphs;

namespace NeoEducationSystem.Services.Data.Paragraphs
{
	public class ParagraphService : IParagraphService
	{
		private readonly NeoEducationDbContext _context;

		public ParagraphService(NeoEducationDbContext context) => _context = context;

		public async Task CreateParagraphsAsync(CreateParagraphsDTO createParagraphsDTO)
		{
			await _context.Paragraphs
				.AddRangeAsync(createParagraphsDTO.Paragraphs.Select(p => new Paragraph
				{
					LessonId = createParagraphsDTO.LessonId,
					Content = p,
				}));

			await _context.SaveChangesAsync();
		}
	}
}
