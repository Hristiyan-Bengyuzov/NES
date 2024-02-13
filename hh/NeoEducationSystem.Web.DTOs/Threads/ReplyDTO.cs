namespace NeoEducationSystem.Web.DTOs.Threads
{
    public class ReplyDTO
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string? Image { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
