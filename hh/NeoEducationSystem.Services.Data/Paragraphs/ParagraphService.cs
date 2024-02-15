using Microsoft.EntityFrameworkCore;
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

		public async Task<IEnumerable<ParagraphTableDTO>> GetParagraphsTable(int lessonId)
		{
			var paragraphsTable = await _context.Lessons
				.Where(l => l.Id == lessonId)
				.Include(l => l.Paragraphs)
				.Select(l => l.Paragraphs.Select(p => new ParagraphTableDTO
				{
					Id = p.Id,
					Content = p.Content
				}))
				.FirstAsync();

			return paragraphsTable;
		}
	}
}
