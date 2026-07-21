namespace MakeUpServiceAdmin.DTO.BookingDto
{
    public class BookingSummaryDto
    {
        public int BookingID { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Service { get; set; }
        public string? Area { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
    }
}
