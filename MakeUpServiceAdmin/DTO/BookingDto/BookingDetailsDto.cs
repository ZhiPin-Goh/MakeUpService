namespace MakeUpServiceAdmin.DTO.BookingDto
{
    public class BookingDetailsDto
    {
        public int BookingID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime AppointmentDate { get; set; }
        public TimeSpan AppointmentTime { get; set; }
        public string Area { get; set; }
        public string Address { get; set; }
        public string Service { get; set; }
        public decimal TravelFee { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
    }
}
