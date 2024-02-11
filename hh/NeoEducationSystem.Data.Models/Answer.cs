using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeoEducationSystem.Data.Models
{
	public class Answer
	{
		[Key]
        public int Id { get; set; }

		[Required]
		public string Content { get; set; } = null!;

        [ForeignKey(nameof(Question))]
        public int QuestionId { get; set; }

        [Required]
        public virtual Question Question { get; set; } = null!;

        [DefaultValue(false)]
        public bool IsCorrect { get; set; }
    }
}