namespace NeoEducationSystem.Data.Seeders
{
	public class NESeeder : ISeeder
	{
		public async Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider)
		{
			if (context is null) throw new ArgumentNullException(nameof(context));

			if (serviceProvider is null) throw new ArgumentNullException(nameof(serviceProvider));

			var seeders = new List<ISeeder>
			{
				new CourseSeeder(),
				new LessonSeeder(),
				new ParagraphSeeder(),
				new CodeSnippetSeeder(),
			};

			foreach (var seeder in seeders)
			{
				await seeder.SeedAsync(context, serviceProvider);
			}
		}
	}
}