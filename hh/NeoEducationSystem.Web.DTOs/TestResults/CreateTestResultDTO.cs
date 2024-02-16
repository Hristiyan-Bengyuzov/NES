namespace NeoEducationSystem.Web.DTOs.TestResults
{
	public class CreateTestResultDTO
	{
		public string UserId { get; set; } = null!;
		public int TestId { get; set; }
        public int Points { get; set; }
    }
}
