using NeoEducationSystem.Web.DTOs.Courses;

namespace NeoEducationSystem.Services.Data.Courses
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseStartMenuDTO>> GetStartMenuCourses();
    }
}
