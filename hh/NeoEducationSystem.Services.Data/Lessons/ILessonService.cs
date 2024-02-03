using NeoEducationSystem.Web.DTOs.Lessons;

namespace NeoEducationSystem.Services.Data.Lessons
{
	public interface ILessonService
	{
		Task<IEnumerable<LessonDTO>> GetCourseLessons(int courseId);
		Task<LessonInfoDTO> GetLessonInformation(int lessonId);
		Task<bool> LessonExistsById(int lessonId);
	}
}
