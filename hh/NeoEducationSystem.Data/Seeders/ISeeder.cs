namespace NeoEducationSystem.Data.Seeders
{
    public interface ISeeder
    {
        Task SeedAsync(NeoEducationDbContext context, IServiceProvider serviceProvider);
    }
}