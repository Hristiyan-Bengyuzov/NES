using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeoEducationSystem.Data.Models
{
	public class Question
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string Content { get; set; } = null!;

		public virtual ICollection<CodeSnippet>? Codes { get; set; } = new HashSet<CodeSnippet>();

        [ForeignKey(nameof(Test))]
        public int TestId { get; set; }

		[Required]
		public virtual Test Test { get; set; } = null!;

        public virtual ICollection<Answer> Answers { get; set; } = new HashSet<Answer>();
	}
}