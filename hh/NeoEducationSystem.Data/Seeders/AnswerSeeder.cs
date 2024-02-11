using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
	public class AnswerSeeder : ISeeder
	{
		public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
		{
			if (context.Answers.Any()) return;

			await context.Answers.AddRangeAsync(new Answer[]
			{
				new Answer
				{
					QuestionId = 1,
					Content = "Дефиниране на условни изрази",
				},
				new Answer
				{
					QuestionId = 1,
					Content = "Форматиране на изход",
				},
				new Answer
				{
					QuestionId = 1,
					Content = "Съхраняване и манипулиране на данни",
					IsCorrect = true,
				},
				new Answer
				{
					QuestionId = 1,
					Content = "Контролиране на изпълнението на цикъл",
				},

				new Answer
				{
					QuestionId = 2,
					Content = "int",
					IsCorrect = true,
				},
				new Answer
				{
					QuestionId = 2,
					Content = "double"
				},
				new Answer
				{
					QuestionId = 2,
					Content = "char"
				},
				new Answer
				{
					QuestionId = 2,
					Content = "string"
				},

				new Answer
				{
					QuestionId = 3,
					Content = "За съхраняване на десетични числа"
				},
				new Answer
				{
					QuestionId = 3,
					Content = "За представяне на истински или неверни стойности",
					IsCorrect = true,
				},
				new Answer
				{
					QuestionId = 3,
					Content = "За обработка на текстови знаци"
				},
				new Answer
				{
					QuestionId = 3,
					Content = "За съхраняване на големи количества данни"
				},

				new Answer
				{
					QuestionId = 4,
					Content = "Итериране на колекция",
				},
				new Answer
				{
					QuestionId = 4,
					Content = "Дефиниране на цикъл",
				},
				new Answer
				{
					QuestionId = 4,
					Content = "Извършване на аритметични операции",
				},
				new Answer
				{
					QuestionId = 4,
					Content = "Вземане на решения въз основа на условия",
					IsCorrect = true,
				},

				new Answer
				{
					QuestionId = 5,
					Content = "Поддържа само числови типове",
				},
				new Answer
				{
					QuestionId = 5,
					Content = "Може да се изпълни без break след всеки случай",
				},
				new Answer
				{
					QuestionId = 5,
					Content = "Изисква използването на къдрави скоби за всеки случай",
				},
				new Answer
				{
					QuestionId = 5,
					Content = "Може да се замени с множество изрази \"if-else\"",
					IsCorrect = true,
				},

				new Answer
				{
					QuestionId = 6,
					Content = "Вид цикъл",
				},
				new Answer
				{
					QuestionId = 6,
					Content = "Съкращение за израз \"if-else\"",
					IsCorrect= true,
				},
				new Answer
				{
					QuestionId = 6,
					Content = "Начин за деклариране на променливи",
				},
				new Answer
				{
					QuestionId = 6,
					Content = "Алтернатива на switch",
				},
			});
		}
	}
}
