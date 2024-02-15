using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeoEducationSystem.Services.Data.Paragraphs;
using NeoEducationSystem.Web.DTOs.Paragraphs;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ParagraphController : ControllerBase
	{
		private readonly IParagraphService _paragraphService;

		public ParagraphController(IParagraphService paragraphService) => _paragraphService = paragraphService;

		[HttpPost("createParagraphs")]
		public async Task<IActionResult> CreateParagraphs(CreateParagraphsDTO createParagraphsDTO)
		{
			try
			{
				await _paragraphService.CreateParagraphsAsync(createParagraphsDTO);
				return Ok("Successfully created paragraphs.");
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
	}
}
