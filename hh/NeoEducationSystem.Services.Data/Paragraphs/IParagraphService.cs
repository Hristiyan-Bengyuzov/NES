using NeoEducationSystem.Web.DTOs.Paragraphs;

namespace NeoEducationSystem.Services.Data.Paragraphs
{
	public interface IParagraphService
	{
		Task CreateParagraphsAsync(CreateParagraphsDTO createParagraphsDTO);
	}
}
