﻿using Microsoft.EntityFrameworkCore;
using NeoEducationSystem.Data;
using NeoEducationSystem.Web.DTOs.Courses;

namespace NeoEducationSystem.Services.Data.Courses
{
    public class CourseService : ICourseService
    {
        private readonly NeoEducationDbContext _context;

        public CourseService(NeoEducationDbContext context) => _context = context;

        public async Task<IEnumerable<CourseStartMenuDTO>> GetStartMenuCourses()
        {
            var dtos = await _context.Courses
                .Select(c => new CourseStartMenuDTO
                {
                    Id = c.Id,
                    Title = c.Title,
                    ImagePath = c.ImagePath,
                    Styles = c.Styles
                })
                .ToListAsync();

            return dtos;
        }
    }
}