namespace NeoEducationSystem.Web.DTOs.Lessons
{
	public class CreateLessonDTO
	{
        public int CourseId { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string? VideoUrl { get; set; }
    }
}
