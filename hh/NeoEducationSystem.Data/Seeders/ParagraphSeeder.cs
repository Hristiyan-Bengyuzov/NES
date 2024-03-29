﻿using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
    public class ParagraphSeeder : ISeeder
    {
        public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
        {
            if (context.Paragraphs.Any()) return;

            await context.Paragraphs.AddRangeAsync(new Paragraph[]
            {
				// main data types
				new Paragraph
                {
                    LessonId = 1,
                    Content = "В програмирането основните типове данни са основните строителни блокове за съхранение и обработка на информация. В C# и Java има различни типове данни, които могат да бъдат разделени в няколко основни категории."
                },
                new Paragraph
                {
                    LessonId = 1,
                    Content = "Целочислените типове данни се използват за съхранение на цели числа без десетична запетая. Примери в C# и Java:"
                },
                new Paragraph
                {
                    LessonId = 1,
                    Content = "Тези типове имат различен обхват. int е от -2^31 до 2^31. long е от -2^63 до 2^63."
                },
                new Paragraph
                {
                    LessonId = 1,
                    Content = "Съхранението на дробни числа става чрез типът double. Неговият обхват е от -1.7*10^308 до 1.7*10^308. Примери:"
                },
                new Paragraph
                {
                    LessonId = 1,
                    Content = "Символните типове данни се използват за съхранение на единични символи. Те се пишат с единични кавички."
                },
                new Paragraph
                {
                    LessonId = 1,
                    Content = "Низовете са типове данни, които се използват за съхранение на последователност от символи. Пишат се с двойни кавички."
                },
                new Paragraph
                {
                    LessonId = 1,
                    Content = "Булевите типове данни се използват за съхранение на стойности true или false. Примери:"
                },


                // conditional statements
                new Paragraph
                {
                    LessonId = 2,
                    Content = "Условните конструкции или проверки са парчета код, чрез който изпълняваме различни действия в зависимост от някакво условие. Условието е логически израз, т.е. израз, който може да приема стойност истина или лъжа. Има различни условни оператори за постигане на това. Примери са if, else if, else и switch.",
                },
                new Paragraph
                {
                    LessonId = 2,
                    Content = "Пресмята се стойността на условието и ако то е вярно се изпълнява if, иначе се изпълнява else. Пример:"
                },
                new Paragraph
                {
                    LessonId = 2,
                    Content = "switch конструкцията позволява проверка на различни стойности на променлива и изпълнява код в зависимост от нея. Различните случаи се описват в case, а ако нито едно от условията не се изпълни, се изпълнява default блокът. Пример:"
                }
            });

            await context.SaveChangesAsync();
        }
    }
}