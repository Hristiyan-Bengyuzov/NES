namespace NeoEducationSystem.Web.DTOs.Courses
{
    public class CourseStartMenuDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? ImagePath { get; set; }
        public string? Styles { get; set; }
    }
}
