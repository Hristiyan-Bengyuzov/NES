﻿using System.ComponentModel.DataAnnotations;

namespace NeoEducationSystem.Data.Models;

public class Course
{
    [Key]   
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string Title { get; set; } = null!;

    public ICollection<Lesson> Lessons { get; set; } = new HashSet<Lesson>();

    [MaxLength(50)]
    public string? ImagePath { get; set; } 

    [MaxLength(50)]
    public string? Styles { get; set; } 
}