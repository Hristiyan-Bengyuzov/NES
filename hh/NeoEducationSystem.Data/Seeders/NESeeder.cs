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
			};

			await Task.WhenAll(seeders.Select(x => x.SeedAsync(context, serviceProvider)));
		}
	}
}

