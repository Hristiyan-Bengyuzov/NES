using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
	public class QuestionSeeder : ISeeder
	{
		public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
		{
			if (context.Questions.Any()) return;

			await context.AddRangeAsync(new Question[]
			{
				// questions for basics test
				new Question
				{
					TestId = 1,
					Content = "В програмирането типовете данни са от съществено значение за:",
				},
				new Question
				{
					TestId = 1,
					Content = "Кой тип данни се използва за съхраняване на цели числа както в Java, така и в C#?",
				},
				new Question
				{
					TestId = 1,
					Content = "Каква е целта на булевия тип данни в програмирането?",
				},
				new Question
				{
					TestId = 1,
					Content = "Каква е целта на израза \"if\"?",
				},
				new Question
				{
					TestId = 1,
					Content = "Кое от следните е характеристика на switch в Java и C#?",
				},
				new Question
				{
					TestId = 1,
					Content = "В Java и C# какво представлява \"тернарният оператор\"?",
				},
			});

			await context.SaveChangesAsync();
		}
	}
}
