using Microsoft.EntityFrameworkCore;
using NeoEducationSystem.Data;
using NeoEducationSystem.Data.Models;
using NeoEducationSystem.Web.DTOs.CodeSnippets;
using NeoEducationSystem.Web.DTOs.Lessons;
using NeoEducationSystem.Web.DTOs.Paragraphs;

namespace NeoEducationSystem.Services.Data.Lessons
{
	public class LessonService : ILessonService
	{
		private readonly NeoEducationDbContext _context;

		public LessonService(NeoEducationDbContext context) => _context = context;

		public async Task CreateLessonAsync(CreateLessonDTO lessonDTO)
		{
			await _context.Lessons.AddAsync(new Lesson
			{
				CourseId = lessonDTO.CourseId,
				Title = lessonDTO.Title,
				Description = lessonDTO.Description,
			});

			await _context.SaveChangesAsync();
		}

		public async Task<IEnumerable<LessonDTO>> GetCourseLessons(int courseId)
		{
			var lessonDTOs = await _context.Courses
				.Where(c => c.Id == courseId)
				.Include(c => c.Lessons)
				.SelectMany(c => c.Lessons)
				.Select(l => new LessonDTO
				{
					Id = l.Id,
					Title = l.Title,
					Description = l.Description,
				})
				.ToListAsync();

			return lessonDTOs;
		}

		public async Task<LessonInfoDTO> GetLessonInformation(int lessonId)
		{
			var lessonInfoDTO = await _context.Lessons
					.Where(l => l.Id == lessonId)
					.Include(l => l.Paragraphs)
						.ThenInclude(p => p.CodeSnippets)
					.Select(l => new LessonInfoDTO
					{
						Title = l.Title,
						Paragraphs = l.Paragraphs.Select(p => new ParagraphDTO
						{
							Id = p.Id,
							Content = p.Content,
							CodeSnippets = p.CodeSnippets.Select(cs => new CodeSnippetDTO
							{
								Id = cs.Id,
								Language = cs.Language,
								Code = cs.Code
							})
						})
					})
					.FirstAsync();

			return lessonInfoDTO;
		}

		public async Task<bool> LessonExistsById(int lessonId) => await _context.Lessons.AnyAsync(l => l.Id == lessonId);
	}
}
