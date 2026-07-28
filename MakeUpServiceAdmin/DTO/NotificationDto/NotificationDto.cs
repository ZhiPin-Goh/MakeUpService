namespace MakeUpServiceAdmin.DTO.NotificationDto
{
    public class NotificationDto
    {
        public int NotificationID { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? RelatedAt { get; set; }
        public bool IsRead { get; set; }
    }
}
