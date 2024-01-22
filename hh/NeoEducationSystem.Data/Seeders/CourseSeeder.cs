using NeoEducationSystem.Data.Models;

namespace NeoEducationSystem.Data.Seeders
{
    public class CourseSeeder : ISeeder
    {
        public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
        {
            if (context.Courses.Any()) return;

            await context.Courses.AddRangeAsync(new Course[]
            {
                new Course
                {
                    Title = "Основни знания"
                },
                new Course
                {
                    Title = "ООП"
                },
                new Course
                {
                    Title = "SQL"
                },
            });

            await context.SaveChangesAsync();
        }
    }
}
