using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
	public class LessonSeeder : ISeeder
	{
		public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
		{
			if (context.Lessons.Any()) return;

			await context.Lessons.AddRangeAsync(new Lesson[]
			{
				// Основни знания
				new Lesson
				{
					CourseId = 1,
					Title = "Типове данни",
					Description = "Основни типове данни в програмирането",
					VideoUrl = "https://www.youtube.com/embed/VDJB8F7kZoA?si=N-79jfKbU65rszZL"
                },
				new Lesson
				{
					CourseId = 1,
					Title = "Проверки",
					Description = "Работа с условни конструкции",
				},
				new Lesson
				{
					CourseId = 1,
					Title = "Цикли",
					Description = "Работа с цикли",
				},
				new Lesson
				{
					CourseId = 1,
					Title = "Вложени цикли",
					Description = "Работа с вложени цикли",
				},
			});

			await context.SaveChangesAsync();
		}
	}
}
