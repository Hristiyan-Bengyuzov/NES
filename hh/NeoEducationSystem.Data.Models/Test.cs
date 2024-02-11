using System.ComponentModel.DataAnnotations;

namespace NeoEducationSystem.Data.Models
{
	public class Test
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string Title { get; set; } = null!;

		public virtual ICollection<Question> Questions { get; set; } = new HashSet<Question>();
    }
}
