namespace MakeUpServiceAdmin.DTO.FeedbackDto
{
    public class FeedbackDetailsDto
    {
        public int FeedbackID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Titel { get; set; }
        public string Description { get; set; }
        public string IsResolved { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
