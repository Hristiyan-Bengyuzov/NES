using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeoEducationSystem.Data.Models
{
	public class TestResult
	{
        [ForeignKey(nameof(User))]
        [Required]
        public string UserId { get; set; } = null!;

        [Required]
        public virtual ApplicationUser User { get; set; } = null!;

        [ForeignKey(nameof(Test))]
        public int TestId { get; set; }

        [Required]
        public virtual Test Test { get; set; } = null!;

        public int Points { get; set; }
    }
}
