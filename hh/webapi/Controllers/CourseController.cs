using Microsoft.AspNetCore.Mvc;
using NeoEducationSystem.Services.Data.Courses;
using NeoEducationSystem.Web.DTOs.Courses;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService) => _courseService = courseService;

        [HttpGet("getCourses")]
        public async Task<ActionResult<CourseStartMenuDTO>> GetCourses()
        {
            try
            {
                var courseDTOs = await _courseService.GetStartMenuCourses(); 
                return Ok(courseDTOs);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
