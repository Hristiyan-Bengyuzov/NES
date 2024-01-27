using Microsoft.AspNetCore.Mvc;
using NeoEducationSystem.Services.Data.Lessons;
using NeoEducationSystem.Web.DTOs.Lessons;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LessonController : ControllerBase
	{
		private readonly ILessonService _lessonService;

		public LessonController(ILessonService lessonService) => _lessonService = lessonService;

		[HttpGet("getCourseLessons/{courseId}")]
		public async Task<ActionResult<IEnumerable<LessonDTO>>> GetLessonsByCourse(int courseId)
		{
			try
			{
				var lessonDTOs = await _lessonService.GetCourseLessons(courseId);
				return Ok(lessonDTOs);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
	}
}
