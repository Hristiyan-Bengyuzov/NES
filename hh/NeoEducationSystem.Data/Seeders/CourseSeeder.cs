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
                    Title = "Основни знания",
                    ImagePath = "pbimage.jpg",
                    Styles = "programmingBasics clickContainer"
                },
                new Course
                {
                    Title = "ООП",
                    ImagePath = "oopimage.png",
                    Styles = "oop clickContainer oopSQLClickContainer"
                },
                new Course
                {
                    Title = "SQL",
                    ImagePath = "sqlimage.png",
                    Styles = "sql clickContainer oopSQLClickContainer"
                },
            });

            await context.SaveChangesAsync();
        }
    }
}