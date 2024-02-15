using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeoEducationSystem.Services.Data.CodeSnippets;
using NeoEducationSystem.Web.DTOs.CodeSnippets;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CodeSnippetController : ControllerBase
	{
		private readonly ICodeSnippetService _codeSnippetService;

		public CodeSnippetController(ICodeSnippetService codeSnippetService) => _codeSnippetService = codeSnippetService;

		[HttpPost("createCodeSnippets")]
		public async Task<IActionResult> CreateCodeSnippets(CreateCodeSnippetsDTO codeSnippetsDTO)
		{
			try
			{
				await _codeSnippetService.CreateCodeSnippetsAsync(codeSnippetsDTO);
				return Ok("Successfully created code snippets.");
			}
			catch (Exception)
			{
				return StatusCode(500);
			}
		}
	}
}
