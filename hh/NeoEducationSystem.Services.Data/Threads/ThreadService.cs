using Microsoft.AspNetCore.Http;
using NeoEducationSystem.Data;
using NeoEducationSystem.Services.Data.Images;
using NeoEducationSystem.Web.DTOs.Threads;
using Thread = NeoEducationSystem.Data.Models.Thread;

namespace NeoEducationSystem.Services.Data.Threads
{
    public class ThreadService : IThreadService
    {
        private readonly NeoEducationDbContext _context;
        private readonly ICloudinaryService _cloudinaryService;

        public ThreadService(NeoEducationDbContext context, ICloudinaryService cloudinaryService)
        {
            _context = context;
            _cloudinaryService = cloudinaryService;
        }

        public async Task CreateThreadAsync(CreateThreadDTO threadDTO)
        {
            var thread = new Thread
            {
                Content = threadDTO.Content,
                Image = _cloudinaryService.UploadImage(threadDTO.Image),
                UserId = threadDTO.UserId,
                CreatedOn = threadDTO.CreatedOn,
            };

            await _context.Threads.AddAsync(thread);
            await _context.SaveChangesAsync();
        }
    }
}
