using Microsoft.EntityFrameworkCore;
using NeoEducationSystem.Data;
using NeoEducationSystem.Web.DTOs.Lessons;

namespace NeoEducationSystem.Services.Data.Lessons
{
	public class LessonService : ILessonService
	{
		private readonly NeoEducationDbContext _context;

		public LessonService(NeoEducationDbContext context) => _context = context;

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
	}
}
