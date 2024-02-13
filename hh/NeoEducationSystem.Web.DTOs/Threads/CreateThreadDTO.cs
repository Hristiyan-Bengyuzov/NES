using Microsoft.AspNetCore.Http;

namespace NeoEducationSystem.Web.DTOs.Threads
{
    public class CreateThreadDTO
    {
        public string Content { get; set; }

        public IFormFile? Image { get; set; }

        public string UserId { get; set; }

        public int? ParentId { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
