using NeoEducationSystem.Web.DTOs.Threads;

namespace NeoEducationSystem.Services.Data.Threads
{
    public interface IThreadService
    {
        Task CreateThreadAsync(CreateThreadDTO threadDTO);
        Task<IEnumerable<MainThreadDTO>> GetMainThreadsAsync();
        Task<ThreadInfoDTO> GetThreadInfoAsync(int threadId);
    }
}
