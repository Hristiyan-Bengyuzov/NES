using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeoEducationSystem.Data.Models
{
	public class CodeSnippet
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(30)]
		public string Language { get; set; } = null!;

		// verbalase spent 50k on this!!!
		[Required]
		[MaxLength(50000)]
		public string Code { get; set; } = null!;

		[ForeignKey(nameof(Paragraph))]
		public int? ParagraphId { get; set; }

		public virtual Paragraph? Paragraph { get; set; } = null!;

		[ForeignKey(nameof(Question))]
		public int? QuestionId { get; set; }

		public virtual Question? Question { get; set; }
	}
}
