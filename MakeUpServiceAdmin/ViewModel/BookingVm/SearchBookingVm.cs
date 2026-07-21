namespace MakeUpServiceAdmin.ViewModel.BookingVm
{
    public class SearchBookingVm
    {
        public int? BookingID { get; set; }
        public int? ServiceID { get; set; }
        public int? AreaID { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Status { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
