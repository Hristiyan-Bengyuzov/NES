using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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
                ParentId = threadDTO.ParentId,
                CreatedOn = threadDTO.CreatedOn,
            };

            await _context.Threads.AddAsync(thread);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<MainThreadDTO>> GetMainThreadsAsync()
        {
            var mainThreads = await _context.Threads
                .Where(t => t.ParentId == null)
                .Include(t => t.User)
                .Include(t => t.Replies)
                .Select(t => new MainThreadDTO
                {
                    Id = t.Id,
                    Content = t.Content,
                    Username = t.User.UserName!,
                    Image = t.Image,
                    CreatedOn = t.CreatedOn,
                    ReplyCount = t.Replies.Count()
                })
                .ToListAsync();

            return mainThreads;
        }

        public async Task<ThreadInfoDTO> GetThreadInfoAsync(int threadId)
        {
            var threadInfo = await _context.Threads
                .Where(t => t.Id == threadId)
                .Include(t => t.User)
                .Include(t => t.Replies)
                .Select(t => new ThreadInfoDTO
                {
                    Id = t.Id,
                    Content = t.Content,
                    Username = t.User.UserName!,
                    Image = t.Image,
                    CreatedOn = t.CreatedOn,
                    Replies = t.Replies.Select(r => new ReplyDTO
                    {
                        Id = r.Id,
                        Content = r.Content,
                        Username = r.User.UserName!,
                        Image = r.Image,
                        CreatedOn = r.CreatedOn,
                    })
                })
                .FirstAsync();

            return threadInfo;
        }
    }
}
