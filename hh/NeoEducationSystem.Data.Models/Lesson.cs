using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeoEducationSystem.Data.Models;

public class Lesson
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string Title { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string Description { get; set; } = null!;

    public string? VideoUrl { get; set; }

    [ForeignKey(nameof(Course))]
    public int CourseId { get; set; }

    [Required]
    public virtual Course Course { get; set; } = null!;

    public ICollection<Paragraph> Paragraphs { get; set; } = new HashSet<Paragraph>();
}