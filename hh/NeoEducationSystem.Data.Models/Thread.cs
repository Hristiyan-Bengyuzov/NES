using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeoEducationSystem.Data.Models
{
    public class Thread
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Content { get; set; } = null!;

        public string? Image { get; set; }

        [ForeignKey(nameof(Parent))]
        public int? ParentId { get; set; }
        public virtual Thread? Parent { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = null!;
        public ApplicationUser User { get; set; } = null!;

        public DateTime CreatedOn { get; set; }

        public ICollection<Thread> Replies { get; set; } = new HashSet<Thread>();
    }
}
