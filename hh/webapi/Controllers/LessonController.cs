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

		[HttpGet("getLessonInfo/{lessonId}")]
		public async Task<ActionResult<LessonInfoDTO>> GetLessonInformation(int lessonId)
		{
			try
			{
				if (!await _lessonService.LessonExistsById(lessonId))
				{
					return BadRequest("No such lesson!");
				}

				var lessonInfoDto = await _lessonService.GetLessonInformation(lessonId);
				return Ok(lessonInfoDto);
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}

		[HttpPost("addLesson")]
		public async Task<IActionResult> AddLesson(CreateLessonDTO lessonDTO)
		{
			try
			{
				await _lessonService.CreateLessonAsync(lessonDTO);
				return Ok("Successfully added lesson.");
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
	}
}
